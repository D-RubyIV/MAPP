package com.myapp.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "tbl_role")
public class RoleModel extends BaseModel{
    private String code;
    private String name;
}
