package com.example.app.repository;

import com.example.app.model.SizeModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SizeRepository extends JpaRepository<SizeModel, Integer> {
    Optional<SizeModel> findByNameOrCode(String name, String code);
}
