package com.myapp.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tbl_order_detail")
public class OrderDetailModel extends BaseModel{
    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderModel orderModel;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductModel productModel;
    private int quantity;
}
