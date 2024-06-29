package com.example.app.repository;

import com.example.app.model.ColorModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ColorRepository extends JpaRepository<ColorModel, Integer> {
    Optional<ColorModel> findByName(String name);
    Optional<ColorModel> findByCode(String code);
    Optional<ColorModel> findByNameOrCode(String name, String code);

}
