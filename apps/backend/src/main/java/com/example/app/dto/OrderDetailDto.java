package com.example.app.dto;

import com.example.app.model.OrderModel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDetailDto {
    @NotNull
    private int order;
    @NotNull
    private int productDetail;
    @NotNull
    private int quantity;
}
