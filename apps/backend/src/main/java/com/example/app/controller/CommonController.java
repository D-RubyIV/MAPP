package com.example.app.controller;

import com.example.app.common.GlobalVariable;
import com.example.app.common.Status;
import com.example.app.model.*;
import com.example.app.repository.CartDetailRepository;
import com.example.app.repository.CartRepository;
import com.example.app.repository.OrderDetailRepository;
import com.example.app.repository.OrderRepository;
import com.example.app.service.CartService;
import com.example.app.service.CommonService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("api/common")
public class CommonController {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private CommonService commonService;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;
    @Autowired
    private CartService cartService;


    @GetMapping("me/cart/items")
    public ResponseEntity<List<CartDetailModel>> inShoppingCart() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)){
            UserModel currentUser = (UserModel) authentication.getPrincipal();
            CartModel myCartModel = cartService.findOrCreateCartByUser(currentUser);
            List<CartDetailModel> cartDetailModelList = cartDetailRepository.findAllByCart(myCartModel);
            return ResponseEntity.ok(cartDetailModelList);
        } else {
            return ResponseEntity.ok(new ArrayList<>());
        }
    }
}
