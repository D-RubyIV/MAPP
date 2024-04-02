package com.myapp.app.model;

import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
public class RoleModel extends BaseModel{
    private String code;
    private String name;
}
