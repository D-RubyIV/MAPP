package com.myapp.app.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SigninUserDto {
    @NotNull(message = "email is required")
    private String email;
    @NotNull(message = "password is required")
    private String password;
}