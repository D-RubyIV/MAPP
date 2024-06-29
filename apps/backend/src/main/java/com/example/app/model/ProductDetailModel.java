package com.example.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "product_details")
public class ProductDetailModel extends BaseModel{
    private String name;
    private String code;
    private float price;
    private int quantity;
    @OneToOne
    @JoinColumn(name = "media_id", referencedColumnName = "id")
    private MediaModel media;
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
