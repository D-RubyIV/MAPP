package com.example.app.service;

import com.example.app.common.Status;
import com.example.app.model.OrderDetailModel;
import com.example.app.model.OrderModel;
import com.example.app.model.UserModel;
import com.example.app.repository.OrderDetailRepository;
import com.example.app.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommonService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public List<OrderDetailModel> getNearestPendingOrderDetails(UserModel userModel){
        List<OrderDetailModel> listPendingOrderDetails = new ArrayList<>();
        Optional<OrderModel> currentOrderOptional = orderRepository.findTopByUserAndStatusOrderByIdDesc(userModel, Status.Pending);
        // IF EXIST PENDING ORDER
        if (currentOrderOptional.isPresent()){
            OrderModel currentOrder = currentOrderOptional.get();
            listPendingOrderDetails = orderDetailRepository.findByOrder(currentOrder);
        }
        // CREATE NEW ORDER IF NOT EXIST PENDING ORDER
        else{
            OrderModel currentOrderCreated = new OrderModel();
            currentOrderCreated.setUser(userModel);
            currentOrderCreated.setStatus(Status.Pending);
            orderRepository.save(currentOrderCreated);
            listPendingOrderDetails = orderDetailRepository.findByOrder(currentOrderCreated);
        }
        return listPendingOrderDetails;

    }

}
