package com.myapp.app.controller;

import com.myapp.app.dto.CategoryDto;
import com.myapp.app.dto.ProductDto;
import com.myapp.app.model.CategoryModel;
import com.myapp.app.model.ProductModel;
import com.myapp.app.repository.ProductRepository;
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
@RequestMapping("api/manage/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    @GetMapping("/pagination/{offset}/{limit}")
    public ResponseEntity<?> paginate(@PathVariable int offset, @PathVariable int limit) {
        Page<ProductModel> page = productRepository.findAll(PageRequest.of(offset, limit));
        return ResponseEntity.ok(page);
    }
    @GetMapping("{id}")
    public ResponseEntity<?> get(@PathVariable("id") Long id) throws BadRequestException {
        ProductModel model = productRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found"));
        return ResponseEntity.ok().body(model);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody ProductDto dto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (productRepository.findByName(dto.getName()) != null) {
            throw new BadRequestException("product already exists");
        }
        ProductModel model = new ProductModel();
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(productRepository.save(model));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@Valid @RequestBody ProductDto dto, @PathVariable Long id, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        ProductModel model = productRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found object"));
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(productRepository.save(model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws Exception {
        ProductModel model = productRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found"));
        productRepository.delete(model);
        return ResponseEntity.ok("");
    }
}
