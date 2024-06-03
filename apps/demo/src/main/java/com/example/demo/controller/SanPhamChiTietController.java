package com.example.demo.controller;

import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.repository.SanPhamChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("san-pham-chi-tiet")
public class SanPhamChiTietController {
    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;
    @GetMapping("index")
    public String findAll(Model model){
        Pageable pageable = PageRequest.of(5, 10);
        Page<SanPhamChiTiet> list = sanPhamChiTietRepository.findAll(pageable);
        model.addAttribute("data", list.toList());
        return "san_pham_chi_tiet/index";
    }

    @GetMapping("detail/{id}")
    public String findAll(Model model, @PathVariable("id") int id){
        SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepository.findById(id).get();
        model.addAttribute("object", sanPhamChiTiet);
        return "san_pham_chi_tiet/detail";
    }


}
