package com.example.app.service;

import com.example.app.model.UserModel;
import com.example.app.repository.UserRepository;
import com.example.app.requests.SignUpRequests;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public UserModel register(SignUpRequests signUpRequests){
        UserModel userModel = new UserModel();
        userModel.setEmail(signUpRequests.getEmail());
        userModel.setPassword(signUpRequests.getPassword());
        userModel.setEnabled(true);
        userRepository.save(userModel);
        return userModel;
    }
}
