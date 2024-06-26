package com.example.app.repository;

import com.example.app.model.ProductDetailModel;
import com.example.app.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductDetailRepository extends JpaRepository<ProductDetailModel, Integer> {
    ProductDetailModel findByCode(String code);
    List<ProductDetailModel> findAllByProduct(ProductModel productModel);
}
