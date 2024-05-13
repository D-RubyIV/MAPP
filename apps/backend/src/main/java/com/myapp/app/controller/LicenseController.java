package com.myapp.app.controller;

import com.myapp.app.dto.LicenseDto;
import com.myapp.app.model.LicenseModel;
import com.myapp.app.repository.LicenseRepository;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@RestController
@RequestMapping("api/manage/licenses")
public class LicenseController {
    @Autowired
    private LicenseRepository licenseRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(licenseRepository.findAll());
    }

    @GetMapping("/pagination/{offset}/{limit}")
    public ResponseEntity<?> paginate(@PathVariable int offset, @PathVariable int limit) {
        Page<LicenseModel> page = licenseRepository.findAll(PageRequest.of(offset, limit));
        return ResponseEntity.ok(page);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody LicenseDto dto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (licenseRepository.findBySecret(dto.getSecret()) != null) {
            throw new BadRequestException("license already exists");
        }
        LicenseModel model = new LicenseModel();
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(licenseRepository.save(model));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@Valid @RequestBody LicenseDto dto, @PathVariable Long id, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        LicenseModel model = licenseRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found object"));
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(licenseRepository.save(model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws Exception {
        LicenseModel model = licenseRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found"));
        licenseRepository.delete(model);
        return ResponseEntity.ok("");
    }
}
