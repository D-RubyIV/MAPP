package com.myapp.app.controller;

import com.myapp.app.dto.RoleDto;
import com.myapp.app.model.RoleModel;
import com.myapp.app.model.UserModel;
import com.myapp.app.repository.RoleRepository;
import com.myapp.app.repository.UserRepository;
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
@RequestMapping("api/manage/roles")
public class RoleController {
    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        List<RoleModel> modelList = roleRepository.findAll();
        return ResponseEntity.ok(modelList);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody RoleDto roleDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (roleRepository.findByCode(roleDto.getCode()) != null){
            throw new BadRequestException("role already exists");
        }
        RoleModel model = new RoleModel();
        BeanUtils.copyProperties(roleDto, model);
        return ResponseEntity.ok(roleRepository.save(model));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@Valid @RequestBody RoleDto roleDto, @PathVariable Long id, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        RoleModel model = roleRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found object"));
        BeanUtils.copyProperties(roleDto, model);
        return ResponseEntity.ok(roleRepository.save(model));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws Exception{
        RoleModel model = roleRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found"));
        roleRepository.delete(model);
        return ResponseEntity.ok("");
    }
}
