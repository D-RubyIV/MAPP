package com.example.demo.entity.custom;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SanPhamChiTietCustom {
    private int id;
    private String tenMauSac;
    private String tenKichThuoc;
    private String tenSanPham;
}
