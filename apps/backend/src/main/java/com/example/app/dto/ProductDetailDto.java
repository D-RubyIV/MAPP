package com.example.app.dto;

import com.example.app.model.ColorModel;
import com.example.app.model.ProductModel;
import com.example.app.model.SizeModel;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDetailDto {
    @NotNull
    @NotBlank
    private String code;
    @NotNull
    private float price;
    @NotNull
    private int quantity;
    @NotNull
    private int product;
    @NotNull
    private int color;
    @NotNull
    private int size;
}

