package com.example.app.repository;

import com.example.app.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<ProductModel, Integer> {
    ProductModel findByName(String name);
    List<ProductModel> findAllBySuggest(boolean suggest);
}
