package com.example.app.model;

import com.example.app.common.Status;
import com.example.app.util.EnumPattern;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "orders")
public class OrderModel extends BaseModel{
    @NotNull
    private LocalDate orderDate;
    @EnumPattern(name = "status", regexp = "Pending|Success")
    private Status status;
    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private UserModel user;
    @ManyToOne
    @JoinColumn(name = "voucher_id", referencedColumnName = "id")
    private VoucherModel voucher;
}
