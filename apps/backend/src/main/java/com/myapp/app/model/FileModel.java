package com.myapp.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tbl_file")
public class FileModel extends BaseModel{
    private String name;
    private String type;
    @JsonIgnore
    @Lob
    @Column(length = 1000000000)
    private byte[] data;
    private String download;
}
