package com.myapp.app.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VoucherDto {
    @NotNull(message = "name is required")
    private String name;
    @NotNull(message = "code is required")
    private String code;
    @NotNull(message = "percent is required")
    private int percent;
    @NotNull(message = "amount is required")
    private int amount;
}
