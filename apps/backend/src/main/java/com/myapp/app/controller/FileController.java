package com.myapp.app.controller;

import com.myapp.app.dto.FileDto;
import com.myapp.app.model.FileModel;
import com.myapp.app.repository.FileRepository;
import com.myapp.app.service.FileService;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.Resource;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/manage/files")
public class FileController {
    private String uploadDir = "source";
    @Autowired
    private FileService fileService;
    @Autowired
    private FileRepository fileRepository;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        List<FileModel> modelList = fileRepository.findAll();
        return ResponseEntity.ok(modelList);
    }

    @GetMapping("/pagination/{offset}/{limit}")
    public ResponseEntity<?> paginate(@PathVariable int offset, @PathVariable int limit) {
        Page<FileModel> page = fileRepository.findAll(PageRequest.of(offset, limit));
        return ResponseEntity.ok(page);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody FileDto dto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        FileModel model = new FileModel();
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(fileRepository.save(model));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@Valid @RequestBody FileDto dto, @PathVariable Long id, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        FileModel model = fileRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found object"));
        BeanUtils.copyProperties(dto, model);
        return ResponseEntity.ok(fileRepository.save(model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws Exception {
        FileModel model = fileRepository.findById(id).orElseThrow(() -> new BadRequestException("Not found"));
        fileRepository.delete(model);
        return ResponseEntity.ok("");
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) throws Exception {
        String fileName = file.getOriginalFilename();
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            if (Files.exists(filePath)) {
                Files.delete(filePath);
            }
            Files.copy(file.getInputStream(), filePath);

            FileModel fileModel = new FileModel();
            fileModel.setName(fileName);
            fileModel.setType(file.getContentType());
            fileRepository.save(fileModel);
            return ResponseEntity.ok().body(fileModel);
        } catch (Exception e) {
            throw new Exception("File could not be saved: " + e.getMessage());
        }
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> download(@PathVariable("fileId") Long fileId) throws Exception {
        FileModel fileModel = fileRepository.findById(fileId).orElseThrow(() -> new BadRequestException("File not found"));

        Path filePath = Paths.get(uploadDir).resolve(fileModel.getName());
        File file = filePath.toFile();

        if (!file.exists()) {
            throw new IOException("File not found");
        }

        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(filePath));

        String encodedFilename = URLEncoder.encode(fileModel.getName(), StandardCharsets.UTF_8.toString());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(fileModel.getType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encodedFilename)
                .body(resource);
    }


}
