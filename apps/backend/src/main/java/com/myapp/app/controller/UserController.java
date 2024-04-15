package com.myapp.app.controller;

import com.myapp.app.dto.RoleDto;
import com.myapp.app.dto.UserDto;
import com.myapp.app.model.LicenseModel;
import com.myapp.app.model.RoleModel;
import com.myapp.app.model.UserModel;
import com.myapp.app.repository.UserRepository;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/manage/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @GetMapping("")
    public ResponseEntity<?> findAll(){
        List<UserModel> modelList = userRepository.findAll();
        return ResponseEntity.ok(modelList);
    }
    @GetMapping("/pagination/{offset}/{limit}")
    public ResponseEntity<?> paginate(@PathVariable int offset, @PathVariable int limit){
        Page<UserModel> page = userRepository.findAll(PageRequest.of(offset, limit));
        return ResponseEntity.ok(page);
    }
    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody UserDto dto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (userRepository.findByUsername(dto.getUsername()) != null || userRepository.findByEmail(dto.getEmail()) != null) {
            throw new BadRequestException("user already exists");
        }
        UserModel model = new UserModel();
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(userRepository.save(model));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@Valid @RequestBody UserDto dto, @PathVariable Long id, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        UserModel model = userRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found object"));
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(userRepository.save(model));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws Exception{
        UserModel model = userRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found"));
        userRepository.delete(model);
        return ResponseEntity.ok("");
    }
}
