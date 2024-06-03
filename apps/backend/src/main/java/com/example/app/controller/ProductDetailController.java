package com.example.app.controller;

import com.example.app.dto.ProductDetailDto;
import com.example.app.model.ProductDetailModel;
import com.example.app.model.ProductModel;
import com.example.app.repository.ColorRepository;
import com.example.app.repository.ProductDetailRepository;
import com.example.app.repository.ProductRepository;
import com.example.app.repository.SizeRepository;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequestMapping("api/manage/product-details")
@RestController
public class ProductDetailController {
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private SizeRepository sizeRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset
    ) {
        Pageable pageable = PageRequest.of(offset, limit);
        return ResponseEntity.ok(productDetailRepository.findAll(pageable));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody ProductDetailDto dto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (productDetailRepository.findByCode(dto.getCode()) != null) {
            throw new BadRequestException("Product detail name already exists");
        }
        ProductDetailModel entity = new ProductDetailModel();
        BeanUtils.copyProperties(dto, entity);
        entity.setProduct(productRepository.findById(dto.getProduct()).orElseThrow(() -> new BadRequestException("Product not found")));
        entity.setColor(colorRepository.findById(dto.getColor()).orElseThrow(() -> new BadRequestException("Color not found")));
        entity.setSize(sizeRepository.findById(dto.getSize()).orElseThrow(() -> new BadRequestException("Size not found")));
        return ResponseEntity.ok(productDetailRepository.save(entity));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@Valid @RequestBody ProductDetailModel entity, @PathVariable int id, BindingResult bindingResult) throws Exception {
        System.out.println("UPDATE");
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        ProductDetailModel model = productDetailRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        BeanUtils.copyProperties(entity, model);
        return ResponseEntity.ok(productDetailRepository.save(model));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) throws Exception {
        ProductDetailModel model = productDetailRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        productDetailRepository.delete(model);
        return ResponseEntity.ok("");
    }

}
