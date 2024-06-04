package com.example.app.repository;

import com.example.app.model.OrderDetailModel;
import com.example.app.model.OrderModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetailModel, Integer> {
    List<OrderDetailModel> findByOrder(OrderModel orderModel);
}
