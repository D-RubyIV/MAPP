package com.example.app.repository;

import com.example.app.model.ProductDetailModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDetailRepository extends JpaRepository<ProductDetailModel, Integer> {
    ProductDetailModel findByCode(String code);
}
