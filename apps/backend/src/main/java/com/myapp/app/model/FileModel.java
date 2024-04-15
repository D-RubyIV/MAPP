package com.myapp.app.model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "file")
public class FileModel extends BaseModel{
    private String name;
    private String type;
    @Lob
    @Column(length = 10000000)
    private byte[] data;
}
