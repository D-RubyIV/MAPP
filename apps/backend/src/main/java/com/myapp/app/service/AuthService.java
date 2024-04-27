package com.myapp.app.service;

import com.myapp.app.dto.SignupUserDto;
import com.myapp.app.model.UserModel;
import com.myapp.app.repository.RoleRepository;
import com.myapp.app.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Properties;
import java.util.Set;
import java.util.UUID;

@Service
public class AuthService {
    @Value("${spring.domain.baseUrl}")
    private String baseUrl;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;

    public void sendEMail(String activeCode, UserModel userModel) {
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
        String link = String.format("%s/api/auth/active/%s", baseUrl, activeCode);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(userModel.getEmail());
        message.setSubject("Active Link of ItemJunction");
        message.setText("Hello guys! Click this link to active your account\nLink: " + link);

        mailSender.send(message);
    }

    public UserModel register(SignupUserDto signupUserDto) {
        UUID uuid = UUID.randomUUID();
        UserModel userModel = new UserModel();
        BeanUtils.copyProperties(signupUserDto, userModel);
        userModel.setPassword(new BCryptPasswordEncoder().encode(signupUserDto.getPassword()));
        userModel.setBalance(0);
        userModel.setEnabled(false);
        userModel.setVerificationCode(uuid.toString());
        userModel.setRoleModel(roleRepository.findByCode("USER"));
        this.sendEMail(uuid.toString(), userModel);
        return userRepository.save(userModel);
    }
}
