package com.myapp.app.controller;

import com.myapp.app.dto.VoucherDto;
import com.myapp.app.model.VoucherModel;
import com.myapp.app.repository.VoucherRepository;
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
@RequestMapping("api/manage/vouchers")
public class VoucherController {
    @Autowired
    private VoucherRepository voucherRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(voucherRepository.findAll());
    }

    @GetMapping("/pagination/{offset}/{limit}")
    public ResponseEntity<?> paginate(@PathVariable int offset, @PathVariable int limit) {
        Page<VoucherModel> page = voucherRepository.findAll(PageRequest.of(offset, limit));
        return ResponseEntity.ok(page);
    }
    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody VoucherDto dto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (voucherRepository.findByCode(dto.getCode()) != null) {
            throw new BadRequestException("voucher already exists");
        }
        VoucherModel model = new VoucherModel();
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(voucherRepository.save(model));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@Valid @RequestBody VoucherDto dto, @PathVariable Long id, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        VoucherModel model = voucherRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found object"));
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(voucherRepository.save(model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws Exception {
        VoucherModel model = voucherRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found"));
        voucherRepository.delete(model);
        return ResponseEntity.ok("");
    }
}
