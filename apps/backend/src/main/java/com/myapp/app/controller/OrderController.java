package com.myapp.app.controller;

import com.myapp.app.dto.OrderDto;
import com.myapp.app.model.OrderModel;
import com.myapp.app.repository.OrderRepository;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/manage/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @GetMapping("/pagination/{offset}/{limit}")
    public ResponseEntity<?> paginate(@PathVariable int offset, @PathVariable int limit) {
        Page<OrderModel> page = orderRepository.findAll(PageRequest.of(offset, limit));
        return ResponseEntity.ok(page);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody OrderDto dto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }

        OrderModel model = new OrderModel();
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(orderRepository.save(model));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@Valid @RequestBody OrderDto dto, @PathVariable Long id, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        OrderModel model = orderRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found object"));
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(orderRepository.save(model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws Exception {
        OrderModel model = orderRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found"));
        orderRepository.delete(model);
        return ResponseEntity.ok("");
    }

}
