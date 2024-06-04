package com.example.app.dto;

import com.example.app.common.Status;
import com.example.app.model.UserModel;
import com.example.app.util.EnumPattern;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDto {
    @NotNull
    private LocalDate orderDate;
    @NotNull
    private int user;
    @NotNull
    private int voucher;
    @NotNull
    private Status status;
}
