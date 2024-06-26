package com.example.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name="products")
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @NotNull
    private String name;

    @NotBlank
    @NotNull
    private String code;

    @NotNull
    private float price;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String description;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private CategoryModel category;

    @NotNull
    private Boolean suggest;  // Sử dụng Boolean thay vì boolean

    @OneToOne
    @JoinColumn(name = "media_id", referencedColumnName = "id")
    private MediaModel media;

}
