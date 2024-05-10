package com.myapp.app.service;

import com.myapp.app.dto.SignupUserDto;
import com.myapp.app.model.UserModel;
import com.myapp.app.repository.RoleRepository;
import com.myapp.app.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class AuthService {
    @Value("${spring.domain.baseUrl}")
    private String baseUrl;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;

    @Async
    public void sendEMail(String activeCode, UserModel userModel){
        String context = String.format("Hello guys! Click this link to active your account\nLink: %s/api/auth/active/%s", baseUrl, activeCode);
        EmailService emailService = new EmailService(context, userModel.getEmail());
        Thread t = new Thread(emailService);
        t.start();
    }

    public UserModel register(SignupUserDto signupUserDto){
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
