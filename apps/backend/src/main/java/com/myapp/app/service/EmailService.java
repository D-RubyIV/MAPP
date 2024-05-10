package com.myapp.app.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

public class EmailService implements Runnable{
    private String message;
    private String email;

    public EmailService(String message, String email) {
        this.message = message;
        this.email = email;
    }

    @Override
    public void run(){
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("phah04@gmail.com");
        mailSender.setPassword("aeku khmm bexh cszw");

        Properties properties = new Properties();
        properties.setProperty("mail.smtp.auth", "true");
        properties.setProperty("mail.smtp.starttls.enable", "true");

        mailSender.setJavaMailProperties(properties);

        String from = "sender@gmail.com";
        SimpleMailMessage context = new SimpleMailMessage();
        context.setFrom(from);
        context.setTo(email);
        context.setSubject("Active Link of ItemJunction");
        context.setText(message);

        mailSender.send(context);
        System.out.println("SEND EMAIL SUCCESS");
    }
}
