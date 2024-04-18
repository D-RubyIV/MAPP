package com.myapp.app.dto;

import com.myapp.app.model.CategoryModel;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ProductDto {
    @NotNull(message = "name is required")
    private String name;
    @NotNull(message = "description is required")
    private String description;
    @NotNull(message = "price is required")
    private double price;
    @NotNull(message = "quantity is required")
    private int quantity;
    @NotNull(message = "categoryModel is required")
    private CategoryModel categoryModel;
}
