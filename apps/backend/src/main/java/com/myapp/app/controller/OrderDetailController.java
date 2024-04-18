package com.myapp.app.controller;

import com.myapp.app.dto.OrderDetailDto;
import com.myapp.app.model.OrderDetailModel;
import com.myapp.app.repository.OrderDetailRepository;
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
@RequestMapping("api/manage/order-details")
public class OrderDetailController {
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(orderDetailRepository.findAll());
    }

    @GetMapping("/pagination/{offset}/{limit}")
    public ResponseEntity<?> paginate(@PathVariable int offset, @PathVariable int limit) {
        Page<OrderDetailModel> page = orderDetailRepository.findAll(PageRequest.of(offset, limit));
        return ResponseEntity.ok(page);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody OrderDetailDto dto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }

        OrderDetailModel model = new OrderDetailModel();
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(orderDetailRepository.save(model));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@Valid @RequestBody OrderDetailDto dto, @PathVariable Long id, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        OrderDetailModel model = orderDetailRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found object"));
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(orderDetailRepository.save(model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws Exception {
        OrderDetailModel model = orderDetailRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found"));
        orderDetailRepository.delete(model);
        return ResponseEntity.ok("");
    }
}
