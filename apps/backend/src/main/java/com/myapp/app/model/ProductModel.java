package com.myapp.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tbl_product")
public class ProductModel extends BaseModel{
    private String name;
    private String description;
    private double price;
    private int quantity;
    @Lob
    private String image;
    @ManyToOne
    @JoinColumn(name="category_id")
    private CategoryModel categoryModel;
}
