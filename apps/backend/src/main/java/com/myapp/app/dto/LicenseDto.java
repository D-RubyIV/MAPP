package com.myapp.app.dto;

import com.myapp.app.model.CategoryModel;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LicenseDto {
    @NotNull(message = "secret is required")
    private String secret;
    @NotNull(message = "freezeAt is required")
    private Long freezeAt;
    @NotNull(message = "categoryModel is required")
    private CategoryModel categoryModel;
}
