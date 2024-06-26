package com.example.app.controller;

import com.example.app.model.CartModel;
import com.example.app.model.UserModel;
import com.example.app.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@CrossOrigin("*")
@RequestMapping("api/manage/carts")
@RestController
public class CartController {
    @Autowired
    private CartRepository cartRepository;

    @GetMapping("me")
    public ResponseEntity<CartModel> handleCart(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication);

        if (authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)){
            UserModel currentUser = (UserModel) authentication.getPrincipal();
            return ResponseEntity.ok(cartRepository.findByUser(currentUser).orElse(null));
        } else {
            return ResponseEntity.ok(null);
        }
    }

}
