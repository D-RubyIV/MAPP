package com.myapp.app.dto;

import com.myapp.app.model.CategoryModel;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class LicenseDto {
    @NotNull(message = "Secret is required")
    private String secret;
    @NotNull(message = "FreezeAt is required")
    private Long freezeAt;
    @NotNull(message = "CategoryModel is required")
    private CategoryModel categoryModel;
}
