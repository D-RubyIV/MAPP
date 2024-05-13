package com.myapp.app;

import com.myapp.app.enums.Provider;
import com.myapp.app.model.*;
import com.myapp.app.repository.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class InitDataBase {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private VoucherRepository voucherRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private LicenseRepository licenseRepository;

    @PostConstruct
    public void init() {
        if (roleRepository.findByCode("ADMIN") == null){
            RoleModel roleModel = new RoleModel();
            roleModel.setCode("ADMIN");
            roleModel.setName("ADMIN");
            roleRepository.save(roleModel);
        }
        if (roleRepository.findByCode("USER") == null){
            RoleModel roleModel = new RoleModel();
            roleModel.setCode("USER");
            roleModel.setName("USER");
            roleRepository.save(roleModel);
        }
        if (userRepository.findByUsername("admin") == null){
            UserModel userModel = new UserModel();
            userModel.setUsername("admin");
            userModel.setPassword(new BCryptPasswordEncoder().encode("123"));
            userModel.setEmail("phah04@gmail.com");
            userModel.setPhone("84833486936");
            userModel.setEnabled(true);
            userModel.setBalance(9999999);
            userModel.setRoleModel(roleRepository.findByCode("ADMIN"));
            userModel.setProvider(Provider.LOCAL);
            userRepository.save(userModel);
        }
        if (userRepository.findByUsername("customer") == null){
            UserModel userModel = new UserModel();
            userModel.setUsername("customer");
            userModel.setPassword(new BCryptPasswordEncoder().encode("123"));
            userModel.setEmail("customer@gmail.com");
            userModel.setPhone("84833486936");
            userModel.setEnabled(true);
            userModel.setBalance(9999999);
            userModel.setRoleModel(roleRepository.findByCode("USER"));
            userModel.setProvider(Provider.LOCAL);
            userRepository.save(userModel);
        }
        if (userRepository.findByUsername("abcd") == null){
            UserModel userModel = new UserModel();
            userModel.setUsername("abcd");
            userModel.setPassword(new BCryptPasswordEncoder().encode("123"));
            userModel.setEmail("abcd@gmail.com");
            userModel.setPhone("84833486936");
            userModel.setEnabled(true);
            userModel.setBalance(9999999);
            userModel.setRoleModel(roleRepository.findByCode("USER"));
            userModel.setProvider(Provider.LOCAL);
            userRepository.save(userModel);
        }
        if (categoryRepository.findByCode("SOFTWARE") == null){
            CategoryModel categoryModel = new CategoryModel();
            categoryModel.setCode("SOFTWARE");
            categoryModel.setName("Software");
            categoryRepository.save(categoryModel);
        }
        if (categoryRepository.findByCode("COURSE") == null){
            CategoryModel categoryModel = new CategoryModel();
            categoryModel.setCode("COURSE");
            categoryModel.setName("Course");
            categoryRepository.save(categoryModel);
        }
        if (categoryRepository.findByCode("Technological equipment") == null){
            CategoryModel categoryModel = new CategoryModel();
            categoryModel.setCode("Technological equipment");
            categoryModel.setName("Technological equipment");
            categoryRepository.save(categoryModel);
        }
        if (categoryRepository.findByCode("Account") == null){
            CategoryModel categoryModel = new CategoryModel();
            categoryModel.setCode("Account");
            categoryModel.setName("Account");
            categoryRepository.save(categoryModel);
        }
        if (categoryRepository.findByCode("Source") == null){
            CategoryModel categoryModel = new CategoryModel();
            categoryModel.setCode("Source");
            categoryModel.setName("Source");
            categoryRepository.save(categoryModel);
        }
        if (productRepository.findByName("Facebook Account") == null){
            ProductModel productModel = new ProductModel();
            productModel.setName("Facebook Account");
            productModel.setDescription("clone");
            productModel.setQuantity(200);
            productModel.setPrice(0.25);
            productModel.setCategoryModel(categoryRepository.findByCode("FACEBOOK"));
            productRepository.save(productModel);
        }
        if (productRepository.findByName("Instagram Account") == null){
            ProductModel productModel = new ProductModel();
            productModel.setName("Instagram Account");
            productModel.setDescription("clone");
            productModel.setQuantity(100);
            productModel.setPrice(0.35);
            productModel.setCategoryModel(categoryRepository.findByCode("FACEBOOK"));
            productRepository.save(productModel);
        }
        if (voucherRepository.findByCode("VOUCHER1") == null){
            VoucherModel voucherModel = new VoucherModel();
            voucherModel.setCode("VOUCHER1");
            voucherModel.setName("Demo1");
            voucherModel.setAmount(100000);
            voucherModel.setPercent(20);
            voucherRepository.save(voucherModel);
        }
        if (voucherRepository.findByCode("VOUCHER2") == null){
            VoucherModel voucherModel = new VoucherModel();
            voucherModel.setCode("VOUCHER2");
            voucherModel.setName("Demo2");
            voucherModel.setAmount(100000);
            voucherModel.setPercent(20);
            voucherRepository.save(voucherModel);
        }

        if (orderRepository.findById(1L).isEmpty()){
            OrderModel orderModel = new OrderModel();
            orderModel.setUserModel(userRepository.findByUsername("customer"));
            orderModel.setAmount(100);
            orderModel.setVoucherModel(voucherRepository.findByCode("VOUCHER1"));
            orderRepository.save(orderModel);
        }
        if (orderRepository.findById(2L).isEmpty()){
            OrderModel orderModel = new OrderModel();
            orderModel.setUserModel(userRepository.findByUsername("abcd"));
            orderModel.setAmount(200);
            orderModel.setVoucherModel(voucherRepository.findByCode("VOUCHER2"));
            orderRepository.save(orderModel);
        }
        if (orderDetailRepository.findById(1L).isEmpty()){
            OrderDetailModel orderDetailModel = new OrderDetailModel();
            orderDetailModel.setOrderModel(orderRepository.findById(1L).get());
            orderDetailModel.setProductModel(productRepository.findByName("Instagram Account"));
            orderDetailModel.setQuantity(20);
            orderDetailRepository.save(orderDetailModel);
        }
        if (orderDetailRepository.findById(2L).isEmpty()){
            OrderDetailModel orderDetailModel = new OrderDetailModel();
            orderDetailModel.setOrderModel(orderRepository.findById(2L).get());
            orderDetailModel.setProductModel(productRepository.findByName("Facebook Account"));
            orderDetailModel.setQuantity(20);
            orderDetailRepository.save(orderDetailModel);
        }

        CategoryModel categoryModel = categoryRepository.findByCode("SOFTWARE");
        List<LicenseModel> list = IntStream.range(1, 200)
                .mapToObj(i -> new LicenseModel("License1", 2333L, categoryModel)).collect(Collectors.toList());
        licenseRepository.saveAll(list);
    }
}
