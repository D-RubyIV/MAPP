package com.example.app;


import com.example.app.common.Provider;
import com.example.app.common.Role;
import com.example.app.model.*;
import com.example.app.repository.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class InitDataBase {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Autowired
    private SizeRepository sizeRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @PostConstruct
    public void init() {
        if (userRepository.findByEmailAndProvider("phah04@gmail.com", Provider.Local) == null) {
            UserModel userModel = new UserModel();
            userModel.setPassword(bCryptPasswordEncoder.encode("123"));
            userModel.setEmail("phah04@gmail.com");
            userModel.setPhone("84833486936");
            userModel.setEnabled(true);
            userModel.setRole(Role.Admin);
            userModel.setProvider(Provider.Local);
            userRepository.save(userModel);
        }
        if (userRepository.findByEmailAndProvider("user@gmail.com", Provider.Local) == null) {
            UserModel userModel = new UserModel();
            userModel.setPassword(bCryptPasswordEncoder.encode("123"));
            userModel.setEmail("user@gmail.com");
            userModel.setPhone("84833486936");
            userModel.setEnabled(true);
            userModel.setRole(Role.User);
            userModel.setProvider(Provider.Local);
            userRepository.save(userModel);
        }
        for (int i = 0; i < 100; i++) {
            String email = "user" + i + "@example.com";
            if (userRepository.findByEmailAndProvider(email, Provider.Local) == null) {
                UserModel userModel = new UserModel();
                userModel.setPassword(bCryptPasswordEncoder.encode("123"));
                userModel.setEmail(email);
                userModel.setPhone("84833486936");
                userModel.setEnabled(true);
                userModel.setRole(Role.User);
                userModel.setProvider(Provider.Local);
                userRepository.save(userModel);
            }
        }
        // CATEGORY
        if (categoryRepository.findById(1).isEmpty()){
            CategoryModel categoryModel = new CategoryModel();
            categoryModel.setName("Shoes");
            categoryModel.setCode("CT01");
            categoryRepository.save(categoryModel);
        }
        if (categoryRepository.findById(2).isEmpty()){
            CategoryModel categoryModel = new CategoryModel();
            categoryModel.setName("T-Shirt");
            categoryModel.setCode("CT02");
            categoryRepository.save(categoryModel);
        }
        // SIZE
        if (sizeRepository.findById(1).isEmpty()){
            SizeModel sizeModel = new SizeModel();
            sizeModel.setName("L");
            sizeModel.setCode("SZO1");
            sizeRepository.save(sizeModel);
        }
        if (sizeRepository.findById(2).isEmpty()){
            SizeModel sizeModel = new SizeModel();
            sizeModel.setName("XL");
            sizeModel.setCode("SZO2");
            sizeRepository.save(sizeModel);
        }
        // PRODUCT
        if (productRepository.findById(1).isEmpty()){
            ProductModel productModel = new ProductModel();
            productModel.setName("Air Jordan 1");
            productModel.setCode("air-jordan-1");
            productModel.setSuggest(true);
            productRepository.save(productModel);
        }
        if (productRepository.findById(2).isEmpty()){
            ProductModel productModel = new ProductModel();
            productModel.setName("Dunk");
            productModel.setCode("dunk");
            productModel.setSuggest(true);
            productRepository.save(productModel);
        }
        if (productRepository.findById(3).isEmpty()){
            ProductModel productModel = new ProductModel();
            productModel.setName("Air Force 1");
            productModel.setCode("air-force-1");
            productModel.setSuggest(true);
            productRepository.save(productModel);
        }
        if (productRepository.findById(4).isEmpty()){
            ProductModel productModel = new ProductModel();
            productModel.setName("Air Max");
            productModel.setCode("air-max");
            productModel.setSuggest(true);
            productRepository.save(productModel);
        }
        // COLOR
        if (colorRepository.findByName("Red") == null){
            ColorModel colorModel = new ColorModel();
            colorModel.setName("Red");
            colorModel.setCode("COL01");
            colorRepository.save(colorModel);
        }
        if (colorRepository.findByName("Yellow") == null){
            ColorModel colorModel = new ColorModel();
            colorModel.setName("Yellow");
            colorModel.setCode("COL02");
            colorRepository.save(colorModel);
        }
        //
        if (productDetailRepository.findByCode("PDT01") == null){
            ProductDetailModel productDetailModel = new ProductDetailModel();
            productDetailModel.setCode("PDT01");
            productDetailModel.setQuantity(20);
            productDetailModel.setColor(colorRepository.findByCode("COL01"));
            productDetailModel.setProduct(productRepository.findById(1).orElse(null));
            productDetailModel.setSize(sizeRepository.findById(1).orElse(null));
            productDetailRepository.save(productDetailModel);
        }
        if (productDetailRepository.findByCode("PDT02") == null){
            ProductDetailModel productDetailModel = new ProductDetailModel();
            productDetailModel.setCode("PDT02");
            productDetailModel.setQuantity(20);
            productDetailModel.setColor(colorRepository.findByCode("COL02"));
            productDetailModel.setProduct(productRepository.findById(2).orElse(null));
            productDetailModel.setSize(sizeRepository.findById(2).orElse(null));
            productDetailRepository.save(productDetailModel);
        }



    }
}