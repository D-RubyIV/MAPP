package com.example.app.controller;

import com.example.app.model.CollectionModel;
import com.example.app.model.SizeModel;
import com.example.app.repository.CollectionRepository;
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
@RequestMapping("api/manage/collections")
@RestController
public class CollectionController {
    @Autowired
    private CollectionRepository collectionRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset
    ) {
        Pageable pageable = PageRequest.of(offset, limit);
        return ResponseEntity.ok(collectionRepository.findAll(pageable));
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody CollectionModel entity, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (collectionRepository.findByCode(entity.getCode()).isPresent()) {
            throw new BadRequestException("Size entity already exists");
        }
        return ResponseEntity.ok(collectionRepository.save(entity));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> update(@Valid @RequestBody SizeModel entity, @PathVariable int id, BindingResult bindingResult) throws Exception {
        System.out.println("UPDATE");
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        CollectionModel model = collectionRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        BeanUtils.copyProperties(entity, model);
        return ResponseEntity.ok(collectionRepository.save(model));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) throws Exception {
        CollectionModel model = collectionRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        collectionRepository.delete(model);
        return ResponseEntity.ok("");
    }
}
