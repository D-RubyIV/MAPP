package com.myapp.app.repository;

import com.myapp.app.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Long> {
    public ProductModel findByName(String name);
}
