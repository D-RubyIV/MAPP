package com.example.app.controller;

import com.example.app.common.GlobalVariable;
import com.example.app.dto.CartDetailDto;
import com.example.app.model.CartDetailModel;
import com.example.app.model.CartModel;
import com.example.app.model.ProductDetailModel;
import com.example.app.repository.CartDetailRepository;
import com.example.app.repository.CartRepository;
import com.example.app.repository.ProductDetailRepository;
import jakarta.servlet.http.Cookie;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin("*")
@RequestMapping("api/manage/cart-details")
@RestController
public class CartDetailController {
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;

    @PostMapping("")
    public ResponseEntity<?> create(
            @Valid @RequestBody CartDetailDto dto, BindingResult bindingResult
    ) throws BindException, BadRequestException {
        // Validate
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        ProductDetailModel productDetail = productDetailRepository.findById(dto.getProductDetail())
                .orElseThrow(() -> new BadRequestException("Product detail not found"));
        CartModel cart = cartRepository.findById(dto.getCart())
                .orElseThrow(() -> new BadRequestException("Cart not found"));

        CartDetailModel cartDetail = cartDetailRepository.findByCartAndProductDetail(cart, productDetail)
                .map(existingCartDetail -> {
                    existingCartDetail.setQuantity(existingCartDetail.getQuantity() + dto.getQuantity());
                    return existingCartDetail;
                })
                .orElseGet(() -> {
                    CartDetailModel newCartDetail = new CartDetailModel();
                    newCartDetail.setQuantity(dto.getQuantity());
                    newCartDetail.setProductDetail(productDetail);
                    newCartDetail.setCart(cart);
                    return newCartDetail;
                });

        CartDetailModel savedCartDetail = cartDetailRepository.save(cartDetail);
        return ResponseEntity.ok(savedCartDetail);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        cartDetailRepository.deleteById(id);
        return ResponseEntity.status(200).build();
    }

}
