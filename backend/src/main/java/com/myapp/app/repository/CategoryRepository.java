package com.myapp.app.repository;

import com.myapp.app.model.CategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryModel, Long> {
    CategoryModel findByCode(String code);
}
