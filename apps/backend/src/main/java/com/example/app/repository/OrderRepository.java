package com.example.app.repository;

import com.example.app.model.OrderModel;
import com.example.app.model.VoucherModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel, Integer> {
}
