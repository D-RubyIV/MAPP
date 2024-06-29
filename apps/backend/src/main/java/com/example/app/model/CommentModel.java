package com.example.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "comments")
public class CommentModel extends BaseModel{
    private String content;
    private int star;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserModel user;
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private ProductModel product;
    private LocalDateTime time;
    @ManyToOne(optional = true)
    @JoinColumn(name = "parent_comment_id", referencedColumnName = "id")
    private CommentModel commentModel;

}
