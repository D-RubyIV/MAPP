package com.myapp.app.controller;

import com.myapp.app.dto.CategoryDto;
import com.myapp.app.model.CategoryModel;
import com.myapp.app.repository.CategoryRepository;
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
@RequestMapping("api/manage/categories")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @GetMapping("/pagination/{offset}/{limit}")
    public ResponseEntity<?> paginate(@PathVariable int offset, @PathVariable int limit) {
        Page<CategoryModel> page = categoryRepository.findAll(PageRequest.of(offset, limit));
        return ResponseEntity.ok(page);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody CategoryDto dto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (categoryRepository.findByCode(dto.getCode()) != null) {
            throw new BadRequestException("license already exists");
        }
        CategoryModel model = new CategoryModel();
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(categoryRepository.save(model));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@Valid @RequestBody CategoryDto dto, @PathVariable Long id, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        CategoryModel model = categoryRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found object"));
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(categoryRepository.save(model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws Exception {
        CategoryModel model = categoryRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found"));
        categoryRepository.delete(model);
        return ResponseEntity.ok("");
    }
}
