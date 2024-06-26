package com.example.app.service;

import com.example.app.model.CartModel;
import com.example.app.model.UserModel;
import com.example.app.repository.CartRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    public CartModel findOrCreateCartByUser(UserModel userModel) {
        Optional<CartModel> cartOptional = cartRepository.findByUser(userModel);
        if (cartOptional.isPresent()) {
            return cartOptional.get();
        } else {
            CartModel newCart = new CartModel();
            newCart.setUser(userModel);
            return cartRepository.save(newCart);
        }

    }
}
