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

    public FileModel saveFile(MultipartFile file) throws Exception {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if (fileName.contains("..")) {
                throw new Exception("The file name is invalid" + fileName);
            }
            FileModel fileUpload = new FileModel();
            fileUpload.setName(fileName);
            fileUpload.setType(file.getContentType());
            fileUpload.setData(file.getBytes());
            return fileRepository.save(fileUpload);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("File could not be save");
        }
    }

    public FileModel downloadFile(Long fileId) throws Exception {
        return fileRepository.findById(fileId)
                .orElseThrow(() -> new Exception("A file with Id : " + fileId + " could not be found"));
    }
}
