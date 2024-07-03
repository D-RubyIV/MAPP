package com.example.app.controller;

import com.example.app.dto.ProductDto;
import com.example.app.model.MediaEntity;
import com.example.app.model.ProductEntity;
import com.example.app.repository.MediaRepository;
import com.example.app.repository.ProductRepository;
import com.example.app.response.OverviewProductResponse;
import com.example.app.service.CloudService;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin("*")
@RequestMapping("api/manage/products")
@RestController
public class ProductController {
    @Autowired
    private CloudService cloudService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MediaRepository mediaRepository;



    @GetMapping("")
    public ResponseEntity<?> findAll(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset
    ) {
        Pageable pageable = PageRequest.of(offset, limit);
        return ResponseEntity.ok(productRepository.findAll(pageable));
    }

    @GetMapping("custom")
    public ResponseEntity<?> custom(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset
    ) {
        Pageable pageable = PageRequest.of(offset, limit);
        List<Object> list = productRepository.findCustom();
        return ResponseEntity.ok(list);
    }

    @GetMapping("overview")
    public ResponseEntity<Page<OverviewProductResponse>> findAllCustom(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset
    ){
        Pageable pageable = PageRequest.of(offset, limit);
        return ResponseEntity.ok(productRepository.findWithPropOverview(pageable));
    }

    @GetMapping("isSuggest")
    public ResponseEntity<?> findAllSuggest(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset
    ) {
        Pageable pageable = PageRequest.of(offset, limit);
        return ResponseEntity.ok(productRepository.findBySuggestTrue(pageable));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> detail(@PathVariable int id) {
        return ResponseEntity.ok(productRepository.findById(id).orElse(null));
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> add(@Valid @ModelAttribute ProductDto dto, BindingResult bindingResult) throws Exception {

        MediaEntity mediaModel = new MediaEntity();
        ProductEntity entity = new ProductEntity();

        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (productRepository.findByName(dto.getName()) != null) {
            throw new BadRequestException("Product name already exists");
        }
        return uploadAndSaveMedia(dto, mediaModel, entity);
    }

    @PutMapping(value = "{id}", consumes = "multipart/form-data")
    public ResponseEntity<?> update(@Valid @ModelAttribute ProductDto dto, @PathVariable int id, BindingResult bindingResult) throws Exception {
        System.out.println("UPDATE");
        MediaEntity mediaModel = new MediaEntity();

        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        ProductEntity model = productRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));

        return uploadAndSaveMedia(dto, mediaModel, model);
    }

    private ResponseEntity<?> uploadAndSaveMedia(@ModelAttribute @Valid ProductDto dto, MediaEntity mediaModel, ProductEntity model) {
        BeanUtils.copyProperties(dto, model);
        if (dto.getFile() != null){
            String fileName = UUID.randomUUID().toString();
            mediaModel.setName(fileName);
            mediaRepository.save(mediaModel);
            cloudService.uploadFile(dto.getFile(), fileName);
            model.setMedia(mediaModel);
        }
        return ResponseEntity.ok(productRepository.save(model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) throws Exception {
        ProductEntity model = productRepository.findById(id).orElseThrow(() -> new BadRequestException("No entity found"));
        productRepository.delete(model);
        return ResponseEntity.ok("");
    }

}
