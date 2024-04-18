package com.myapp.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "tbl_category")
public class CategoryModel extends BaseModel{
    private String code;
    private String name;
}
