package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table
@Entity
public class SanPhamChiTiet {
    @Id
    private Integer id;
    private int idMauSac;
    private int idKichThuoc;
    @ManyToOne
    @JoinColumn(
            name = "idSanPham",
            referencedColumnName = "id"
    )
    private SanPham sanPham;
    private String maSPCT;
    private int soLuong;
    private int donGia;
    private boolean trangThai;
}
