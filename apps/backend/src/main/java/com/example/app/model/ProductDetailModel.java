package com.example.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "product_detail")
public class ProductDetailModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String code;
    private float price;
    private int quantity;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductModel product;
    @ManyToOne
    @JoinColumn(name = "color_id")
    private ColorModel color;
    @ManyToOne
    @JoinColumn(name = "size_id")
    private SizeModel size;
}
