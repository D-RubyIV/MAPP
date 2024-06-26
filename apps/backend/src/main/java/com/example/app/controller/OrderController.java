package com.example.app.controller;

import com.example.app.common.Status;
import com.example.app.dto.OrderDto;
import com.example.app.model.OrderDetailModel;
import com.example.app.model.OrderModel;
import com.example.app.model.UserModel;
import com.example.app.repository.OrderDetailRepository;
import com.example.app.repository.OrderRepository;
import com.example.app.repository.UserRepository;
import com.example.app.repository.VoucherRepository;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@Controller
@RequestMapping("/api/manage/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VoucherRepository voucherRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset
    ) {
        Pageable pageable = PageRequest.of(offset, limit);
        return ResponseEntity.ok(orderRepository.findAll(pageable));
    }




    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody OrderDto dto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        OrderModel entity = new OrderModel();
        BeanUtils.copyProperties(dto, entity);
        System.out.println(entity);
        entity.setUser(userRepository.findById(dto.getUser()).orElse(null));
        entity.setVoucher(voucherRepository.findById(dto.getVoucher()).orElse(null));
        return ResponseEntity.ok(orderRepository.save(entity));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@Valid @RequestBody OrderModel entity, @PathVariable int id, BindingResult bindingResult) throws Exception {
        System.out.println("UPDATE");
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        OrderModel model = orderRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        BeanUtils.copyProperties(entity, model);
        return ResponseEntity.ok(orderRepository.save(model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) throws Exception {
        OrderModel model = orderRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        orderRepository.delete(model);
        return ResponseEntity.ok("");
    }
}
