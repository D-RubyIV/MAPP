package com.example.app.repository;

import com.example.app.model.SizeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface SizeRepository extends JpaRepository<SizeModel, Integer> {
    Optional<SizeModel> findByNameOrCode(String name, String code);
    Optional<SizeModel> findByCode(String name);
}
