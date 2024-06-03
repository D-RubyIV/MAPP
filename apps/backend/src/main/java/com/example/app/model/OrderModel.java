package com.example.app.model;

import com.example.app.common.Status;
import jakarta.persistence.*;
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
public class OrderModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalDate orderDate;
    private Status status;
    @ManyToOne
    @JoinColumn(name = "voucher_id", referencedColumnName = "id")
    private VoucherModel voucher;
}
