package com.example.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "order_details")
public class OrderDetailModel extends BaseModel{
    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private OrderModel order;
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private ProductDetailModel productDetail;
    @NotNull
    private int quantity;
}
