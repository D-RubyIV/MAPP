package com.example.app.repository;

import com.example.app.model.OrderDetailModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetailModel, Integer> {
}
