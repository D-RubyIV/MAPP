package com.example.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="products")
@EqualsAndHashCode(callSuper = true)
public class ProductModel extends BaseModel{
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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "tag_product",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<TagModel> tagModels = new ArrayList<>();

    @NotNull
    @ManyToOne
    @JoinColumn(name = "collection_id", referencedColumnName = "id")
    private CollectionModel collection;

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
