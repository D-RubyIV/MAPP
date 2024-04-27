package com.myapp.app.util;

import com.myapp.app.model.UserModel;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender; // Thêm import này
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;

public class SendEmail {

    public void sendVerificationEmail(UserModel user, String siteURL)
            throws MessagingException, UnsupportedEncodingException {

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("your_email");
        mailSender.setPassword("your_password");


        String toAddress = user.getEmail();
        String fromAddress = "your.email@example.com"; // Địa chỉ email của bạn
        String senderName = "Your company name";
        String subject = "Please verify your registration";
        String content = "Dear " + user.getFullName() + ",<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"" + siteURL + "/verify?code=" + user.getVerificationCode() + "\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Your company name.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        helper.setText(content, true);

        mailSender.send(message);
    }


}
