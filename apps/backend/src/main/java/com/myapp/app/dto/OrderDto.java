package com.myapp.app.dto;

import com.myapp.app.model.UserModel;
import com.myapp.app.model.VoucherModel;
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
public class OrderDto {
    @NotNull(message = "userModel is required")
    private UserModel userModel;
    @NotNull(message = "voucherModel is required")
    private VoucherModel voucherModel;
    @NotNull(message = "amount is required")
    private double amount;
}
