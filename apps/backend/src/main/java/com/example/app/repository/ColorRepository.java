package com.example.app.repository;

import com.example.app.model.ColorModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<ColorModel, Integer> {
    ColorModel findByName(String name);
    ColorModel findByCode(String code);
    ColorModel findByNameOrCode(String name, String code);

}
