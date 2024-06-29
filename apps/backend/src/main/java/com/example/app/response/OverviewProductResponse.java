package com.example.app.response;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class OverviewProductResponse {
    @Id
    private int id;
    private String name;
    private float price;
    private String image;
    private double quantity;
    private double totalColor;
    private double totalSize;
}
