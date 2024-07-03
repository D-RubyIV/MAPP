package com.example.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table
public class CollectionEntity extends BaseEntity {
    @NotBlank
    @NotNull
    private String name;
    @NotNull
    @NotBlank
    private String code;
}
