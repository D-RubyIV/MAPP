package com.myapp.app.controller;

import com.myapp.app.dto.LicenseDto;
import com.myapp.app.dto.RoleDto;
import com.myapp.app.model.CategoryModel;
import com.myapp.app.model.LicenseModel;
import com.myapp.app.model.RoleModel;
import com.myapp.app.repository.CategoryRepository;
import com.myapp.app.repository.LicenseRepository;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/manage/licenses")
public class LicenseController {
    @Autowired
    private LicenseRepository licenseRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        List<LicenseModel> modelList = licenseRepository.findAll();
        return ResponseEntity.ok(modelList);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody LicenseDto dto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (licenseRepository.findBySecret(dto.getSecret()).isPresent()) {
            throw new BadRequestException("license already exists");
        }
        CategoryModel categoryModel = categoryRepository.findById(dto.getCategoryModel().getId()).orElseThrow(() -> new BadRequestException("category not exists"));
        LicenseModel model = new LicenseModel();
        BeanUtils.copyProperties(dto, model);
        model.setCategoryModel(categoryModel);
        return ResponseEntity.ok(licenseRepository.save(model));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@Valid @RequestBody LicenseDto dto, @PathVariable Long id, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        LicenseModel model = licenseRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found object"));
        CategoryModel categoryModel = categoryRepository.findById(dto.getCategoryModel().getId()).orElseThrow(() -> new BadRequestException("category not exists"));
        BeanUtils.copyProperties(dto, model);
        model.setCategoryModel(categoryModel);
        return ResponseEntity.ok(licenseRepository.save(model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws Exception {
        LicenseModel model = licenseRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found"));
        licenseRepository.delete(model);
        return ResponseEntity.ok("");
    }
}
