package com.myapp.app.model;

import jakarta.persistence.Entity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class CategoryModel extends BaseModel{
    private String code;
    private String name;

}
