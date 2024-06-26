package com.example.app.repository;

import com.example.app.common.Provider;
import com.example.app.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Integer> {
    UserModel findByEmailAndProvider(String email, Provider provider);
    Optional<UserModel> findByEmail(String username);
}
