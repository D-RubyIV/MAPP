package com.example.app.repository;

import com.example.app.model.CartModel;
import com.example.app.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface CartRepository extends JpaRepository<CartModel, Integer> {
    Optional<CartModel> findByUser(UserModel userModel);
}
