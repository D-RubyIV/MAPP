package com.example.app.service;

import com.example.app.model.CartDetailEntity;
import com.example.app.repository.CartDetailRepository;
import com.example.app.repository.OrderRepository;
import com.example.app.response.OverviewBillResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;

    public OverviewBillResponse checkout(
            List<Integer> idCartDetails
    ) {
        double total = 0;
        List<CartDetailEntity> cartDetailEntityList = cartDetailRepository.findAllById(idCartDetails);
        for (CartDetailEntity s : cartDetailEntityList) {
            total += s.getProductDetail().getPrice() * s.getQuantity();
        }
        return OverviewBillResponse.builder().total(total).build();
    }


}
