package com.example.app.repository;

import com.example.app.model.CommentModel;
import com.example.app.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentModel, Integer> {
    List<CommentModel> findAllByProduct(ProductModel productModel);
}
