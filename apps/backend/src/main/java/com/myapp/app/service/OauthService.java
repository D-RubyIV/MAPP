package com.myapp.app.service;

import com.myapp.app.enums.Provider;
import com.myapp.app.model.UserModel;
import com.myapp.app.repository.RoleRepository;
import com.myapp.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class OauthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    public UserModel authenticate(String uuid, Provider provider) {
        if (provider == Provider.GOOGLE) {
            // WITH GOOGLE UUID IS EMAIL
            UserModel userModelFound = userRepository.findByEmailAndProvider(uuid, Provider.GOOGLE);
            if (userModelFound == null) {
                UserModel userModel = new UserModel();
                userModel.setEmail(uuid);
                userModel.setEnabled(true);
                userModel.setBalance(0);
                userModel.setRoleModel(roleRepository.findByCode("USER"));
                userModel.setPassword(new BCryptPasswordEncoder().encode("123"));
                userModel.setFingerprint(UUID.randomUUID().toString());
                userModel.setProvider(Provider.GOOGLE);
                userRepository.save(userModel);
                return userModel;
            } else {
                return userModelFound;
            }
        } else if (provider == Provider.GITHUB) {
            // WITH GITHUB UUID IS EMAIL
            UserModel userModelFound = userRepository.findByEmailAndProvider(uuid, Provider.GITHUB);
            if (userModelFound == null) {
                UserModel userModel = new UserModel();
                userModel.setEmail(uuid);
                userModel.setEnabled(true);
                userModel.setBalance(0);
                userModel.setRoleModel(roleRepository.findByCode("USER"));
                userModel.setFingerprint(UUID.randomUUID().toString());
                userModel.setProvider(Provider.GITHUB);
                userRepository.save(userModel);
                return userModel;
            } else {
                return userModelFound;
            }
        } else if (provider == Provider.FACEBOOK) {
            // WITH FACEBOOK UUID IS EMAIL
            UserModel userModelFound = userRepository.findByEmailAndProvider(uuid, Provider.FACEBOOK);
            if (userModelFound == null) {
                UserModel userModel = new UserModel();
                userModel.setEmail(uuid);
                userModel.setEnabled(true);
                userModel.setBalance(0);
                userModel.setRoleModel(roleRepository.findByCode("USER"));
                userModel.setFingerprint(UUID.randomUUID().toString());
                userModel.setProvider(Provider.FACEBOOK);
                userRepository.save(userModel);
                return userModel;
            } else {
                return userModelFound;
            }
        }
        return null;
    }
}
