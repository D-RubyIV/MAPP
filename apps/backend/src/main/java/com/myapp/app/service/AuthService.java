package com.myapp.app.service;

import com.myapp.app.dto.SignupUserDto;
import com.myapp.app.model.UserModel;
import com.myapp.app.repository.RoleRepository;
import com.myapp.app.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthService {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;
    public UserModel register(SignupUserDto signupUserDto){
        UserModel userModel = new UserModel();
        BeanUtils.copyProperties(signupUserDto, userModel);
        userModel.setPassword(new BCryptPasswordEncoder().encode(signupUserDto.getPassword()));
        userModel.setBalance(0);
        userModel.setEnabled(true);
        userModel.setRoleModel(roleRepository.findByCode("USER"));
        return userRepository.save(userModel);
    }
}
