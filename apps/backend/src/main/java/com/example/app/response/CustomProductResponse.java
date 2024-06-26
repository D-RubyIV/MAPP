package com.example.app.response;

import com.example.app.model.CategoryModel;
import com.example.app.model.MediaModel;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class CustomProductResponse {
    @Id
    private int id;
    private String name;
    private float price;
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private CategoryModel category;
    private String image;
    private double totalStar;
    private double totalComment;
}
