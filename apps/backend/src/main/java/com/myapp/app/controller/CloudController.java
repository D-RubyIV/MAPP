package com.myapp.app.controller;

import com.myapp.app.service.CloudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
@CrossOrigin("*")
@RestController
@RequestMapping("api/cloud")
public class CloudController {
    @Autowired
    private CloudService cloudService;

    @PostMapping("/gifs")
    public ResponseEntity<?> uploadGif(
            @RequestParam("gifFile") MultipartFile gifFile,
            Authentication authentication,
            @RequestParam("title") String title
    ) throws IOException {
        String url = cloudService.uploadFile(gifFile);

        Map<String, String> map = new HashMap<>();
        map.put("created", url);
        return ResponseEntity.ok().body(map);
    }
}
