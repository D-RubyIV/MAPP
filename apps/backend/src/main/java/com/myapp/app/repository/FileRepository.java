package com.myapp.app.repository;

import com.myapp.app.model.FileModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileRepository extends JpaRepository<FileModel, Long> {
    Optional<FileModel> findByName(String name);
    Optional<FileModel> findByUuid(String uuid);
}
