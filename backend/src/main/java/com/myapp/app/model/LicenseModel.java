package com.myapp.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class LicenseModel extends BaseModel{
    private String secret;
    private Long freezeAt;
    @ManyToOne
    @JoinColumn(name="class_id", nullable=false)
    private CategoryModel categoryModel;
}
