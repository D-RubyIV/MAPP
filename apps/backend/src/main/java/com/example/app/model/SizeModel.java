package com.example.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "sizes")
public class SizeModel extends BaseModel{
    private String name;
    private String code;
}
