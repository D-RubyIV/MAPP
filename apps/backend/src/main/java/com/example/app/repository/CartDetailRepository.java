package com.example.app.repository;

import com.example.app.model.CartDetailModel;
import com.example.app.model.CartModel;
import com.example.app.model.ProductDetailModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetailModel, Integer> {
    List<CartDetailModel> findAllByCart(CartModel cartModel);
    Optional<CartDetailModel> findByCartAndProductDetail(CartModel cartModel, ProductDetailModel productDetailModel);
}
