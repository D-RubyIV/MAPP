package com.example.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "sizes")
public class SizeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String code;
}
