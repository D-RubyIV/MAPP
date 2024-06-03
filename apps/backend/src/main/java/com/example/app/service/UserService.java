package com.example.app.service;

import com.example.app.model.UserModel;
import com.example.app.repository.UserRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserModel save(UserModel entity) throws BadRequestException {
        entity.setEnabled(true);
        userRepository.save(entity);
        return entity;
    }

    public UserModel update(Long id, UserModel entity) throws BadRequestException {
        userRepository.save(entity);
        return entity;
    }

}
