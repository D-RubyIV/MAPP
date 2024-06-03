package com.example.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "product_details")
public class ProductDetailModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String code;
    private float price;
    private int quantity;
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private ProductModel product;
    @ManyToOne
    @JoinColumn(name = "color_id", referencedColumnName = "id")
    private ColorModel color;
    @ManyToOne
    @JoinColumn(name = "size_id", referencedColumnName = "id")
    private SizeModel size;
}
