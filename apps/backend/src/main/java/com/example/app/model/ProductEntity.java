package com.example.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.util.Set;

@NamedQuery(name = "ProductModel.findCustom",
        query = "select p from ProductEntity p join p.collections c")

@NamedQuery(name = "ProductModel.findAllOverViewProducts",
        query = "select new com.example.app.response.OverviewProductResponseV2 (p.name, p.code) from ProductEntity p")

@NamedQuery(name = "ProductModel.findAllOverViewProduct",
        query = "select p.name, p.code from ProductEntity p")

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Builder
@Table(name="products")
@EqualsAndHashCode(callSuper = true)
public class ProductEntity extends BaseEntity {

    @NotBlank
    @NotNull
    private String name;

    @NotBlank
    @NotNull
    @Column(unique = true)
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
    private Set<TagEntity> tags;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "collection_product",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "collection_id")
    )
    private Set<CollectionEntity> collections;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private CategoryEntity category;

    @NotNull
    private Boolean suggest;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "media_id", referencedColumnName = "id")
    private MediaEntity media;

}