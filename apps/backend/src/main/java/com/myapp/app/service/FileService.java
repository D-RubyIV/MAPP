package com.myapp.app.service;

import com.myapp.app.model.FileModel;
import com.myapp.app.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {
    @Autowired
    private FileRepository fileRepository;

    private String newUUID() {
        return java.util.UUID.randomUUID().toString();
    }


}
