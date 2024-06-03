package com.example.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "order_details")
public class OrderDetailModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private OrderModel order;
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private ProductDetailModel productDetail;
    private int quantity;
}