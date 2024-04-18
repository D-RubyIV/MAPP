package com.myapp.app.dto;

import com.myapp.app.model.OrderModel;
import com.myapp.app.model.ProductModel;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDetailDto {
    @NotNull(message = "orderModel is required")
    private OrderModel orderModel;
    @NotNull(message = "productModel is required")
    private ProductModel productModel;
    @NotNull(message = "quantity is required")
    private int quantity;
}
