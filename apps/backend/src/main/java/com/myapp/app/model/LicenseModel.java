package com.myapp.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "license")
public class LicenseModel extends BaseModel{
    private String secret;
    private Long freezeAt;
    @ManyToOne
    @JoinColumn(name="class_id", nullable=false)
    private CategoryModel categoryModel;
}
