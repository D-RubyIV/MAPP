package com.example.app;


import com.example.app.common.Provider;
import com.example.app.common.Role;
import com.example.app.common.Status;
import com.example.app.model.*;
import com.example.app.repository.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
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
    @Autowired
    private VoucherRepository voucherRepository;
    @Autowired
    private CommentRepository commentRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;

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
        if (userRepository.findByEmailAndProvider("moderator@gmail.com", Provider.Local) == null) {
            UserModel userModel = new UserModel();
            userModel.setPassword(bCryptPasswordEncoder.encode("123"));
            userModel.setEmail("moderator@gmail.com");
            userModel.setName("Quản trị viên");
            userModel.setPhone("84833486936");
            userModel.setEnabled(true);
            userModel.setRole(Role.Moderator);
            userModel.setProvider(Provider.Local);
            userRepository.save(userModel);
        }
        if (userRepository.findByEmailAndProvider("user1@gmail.com", Provider.Local) == null) {
            UserModel userModel = new UserModel();
            userModel.setPassword(bCryptPasswordEncoder.encode("123"));
            userModel.setEmail("user1@gmail.com");
            userModel.setPhone("84833486936");
            userModel.setName("Khách hàng 1");
            userModel.setEnabled(true);
            userModel.setRole(Role.User);
            userModel.setProvider(Provider.Local);
            userRepository.save(userModel);
        }
        if (userRepository.findByEmailAndProvider("user2@gmail.com", Provider.Local) == null) {
            UserModel userModel = new UserModel();
            userModel.setPassword(bCryptPasswordEncoder.encode("123"));
            userModel.setEmail("user2@gmail.com");
            userModel.setPhone("84833486936");
            userModel.setName("Khách hàng 2");
            userModel.setEnabled(true);
            userModel.setRole(Role.User);
            userModel.setProvider(Provider.Local);
            userRepository.save(userModel);
        }
        if (userRepository.findByEmailAndProvider("user3@gmail.com", Provider.Local) == null) {
            UserModel userModel = new UserModel();
            userModel.setPassword(bCryptPasswordEncoder.encode("123"));
            userModel.setEmail("use3r@gmail.com");
            userModel.setPhone("84833486936");
            userModel.setName("Khách hàng 3");
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
            categoryModel.setName("Vòng gỗ");
            categoryModel.setCode("CT01");
            categoryRepository.save(categoryModel);
        }
        if (categoryRepository.findById(2).isEmpty()){
            CategoryModel categoryModel = new CategoryModel();
            categoryModel.setName("Hương sạch");
            categoryModel.setCode("CT02");
            categoryRepository.save(categoryModel);
        }
        if (categoryRepository.findById(3).isEmpty()){
            CategoryModel categoryModel = new CategoryModel();
            categoryModel.setName("Trầm nụ");
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
            productModel.setName("Trầm nụ ngắn");
            productModel.setCode("tram-nu-001");
            productModel.setPrice(25000);
            productModel.setCategory(categoryRepository.findById(3).orElse(null));
            productModel.setSuggest(true);
            productModel.setDescription("""
                    <!DOCTYPE html>
                    <html>
                    <body>
                                        
                    <h1>My First Heading</h1>
                    <p>My first paragraph.</p>
                                        
                    </body>
                    </html>
                    """);
            productRepository.save(productModel);
        }
        if (productRepository.findById(2).isEmpty()){
            ProductModel productModel = new ProductModel();
            productModel.setName("Bách cố hương");
            productModel.setCode("bach-co-huong");
            productModel.setPrice(45000);
            productModel.setCategory(categoryRepository.findById(2).orElse(null));
            productModel.setSuggest(true);
            productModel.setDescription("""
                    <!DOCTYPE html>
                    <html>
                    <body>
                                        
                    <h1>My First Heading</h1>
                    <p>My first paragraph.</p>
                                        
                    </body>
                    </html>
                    """);
            productRepository.save(productModel);
        }
        if (productRepository.findById(3).isEmpty()){
            ProductModel productModel = new ProductModel();
            productModel.setName("Trầm nụ dài");
            productModel.setCode("tram-nu-dai");
            productModel.setPrice(35000);
            productModel.setCategory(categoryRepository.findById(3).orElse(null));
            productModel.setSuggest(true);
            productRepository.save(productModel);
        }
        if (productRepository.findById(4).isEmpty()){
            ProductModel productModel = new ProductModel();
            productModel.setName("Khúc cố hương");
            productModel.setCode("khuc-co-huong");
            productModel.setPrice(25000);
            productModel.setCategory(categoryRepository.findById(2).orElse(null));
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
        // PRODUCT DETAIL
        if (productDetailRepository.findByCode("PDT01") == null){
            ProductDetailModel productDetailModel = new ProductDetailModel();
            productDetailModel.setCode("PDT01");
            productDetailModel.setQuantity(40);
            productDetailModel.setPrice(1000);
            productDetailModel.setColor(colorRepository.findByCode("COL01"));
            productDetailModel.setProduct(productRepository.findById(1).orElse(null));
            productDetailModel.setSize(sizeRepository.findById(1).orElse(null));
            productDetailRepository.save(productDetailModel);
        }
        if (productDetailRepository.findByCode("PDT02") == null){
            ProductDetailModel productDetailModel = new ProductDetailModel();
            productDetailModel.setCode("PDT02");
            productDetailModel.setQuantity(20);
            productDetailModel.setPrice(20000);
            productDetailModel.setColor(colorRepository.findByCode("COL02"));
            productDetailModel.setProduct(productRepository.findById(2).orElse(null));
            productDetailModel.setSize(sizeRepository.findById(2).orElse(null));
            productDetailRepository.save(productDetailModel);
        }
        if (productDetailRepository.findByCode("PDT03") == null){
            ProductDetailModel productDetailModel = new ProductDetailModel();
            productDetailModel.setCode("PDT03");
            productDetailModel.setQuantity(25);
            productDetailModel.setPrice(20000);
            productDetailModel.setColor(colorRepository.findByCode("COL02"));
            productDetailModel.setProduct(productRepository.findById(1).orElse(null));
            productDetailModel.setSize(sizeRepository.findById(2).orElse(null));
            productDetailRepository.save(productDetailModel);
        }
        if (productDetailRepository.findByCode("PDT04") == null){
            ProductDetailModel productDetailModel = new ProductDetailModel();
            productDetailModel.setCode("PDT04");
            productDetailModel.setQuantity(60);
            productDetailModel.setPrice(20000);
            productDetailModel.setColor(colorRepository.findByCode("COL02"));
            productDetailModel.setProduct(productRepository.findById(2).orElse(null));
            productDetailModel.setSize(sizeRepository.findById(2).orElse(null));
            productDetailRepository.save(productDetailModel);
        }
        if (productDetailRepository.findByCode("PDT05") == null){
            ProductDetailModel productDetailModel = new ProductDetailModel();
            productDetailModel.setCode("PDT05");
            productDetailModel.setQuantity(25);
            productDetailModel.setPrice(40000);
            productDetailModel.setColor(colorRepository.findByCode("COL02"));
            productDetailModel.setProduct(productRepository.findById(3).orElse(null));
            productDetailModel.setSize(sizeRepository.findById(2).orElse(null));
            productDetailRepository.save(productDetailModel);
        }
        if (productDetailRepository.findByCode("PDT06") == null){
            ProductDetailModel productDetailModel = new ProductDetailModel();
            productDetailModel.setCode("PDT06");
            productDetailModel.setQuantity(25);
            productDetailModel.setPrice(25000);
            productDetailModel.setColor(colorRepository.findByCode("COL02"));
            productDetailModel.setProduct(productRepository.findById(4).orElse(null));
            productDetailModel.setSize(sizeRepository.findById(2).orElse(null));
            productDetailRepository.save(productDetailModel);
        }
        // VOUCHER
        if (voucherRepository.findById(1).isEmpty()){
            VoucherModel voucherModel = new VoucherModel();
            voucherModel.setName("Sale 05");
            voucherModel.setCode("VCH01");
            voucherModel.setPercent(20);
            voucherModel.setMinimize(50);
            voucherModel.setStartDate(LocalDate.now());
            voucherModel.setEndDate(LocalDate.now().plusDays(5));
            voucherRepository.save(voucherModel);
        }
        if (voucherRepository.findById(2).isEmpty()){
            VoucherModel voucherModel = new VoucherModel();
            voucherModel.setName("Sale 10");
            voucherModel.setCode("VCH02");
            voucherModel.setPercent(25);
            voucherModel.setMinimize(20);
            voucherModel.setStartDate(LocalDate.now());
            voucherModel.setEndDate(LocalDate.now().plusDays(2));
            voucherRepository.save(voucherModel);
        }
        if (voucherRepository.findById(3).isEmpty()){
            VoucherModel voucherModel = new VoucherModel();
            voucherModel.setName("Flash Sale");
            voucherModel.setCode("VCH03");
            voucherModel.setPercent(15);
            voucherModel.setMinimize(50);
            voucherModel.setStartDate(LocalDate.now());
            voucherModel.setEndDate(LocalDate.now().plusDays(8));
            voucherRepository.save(voucherModel);
        }
        // ORDER
        if (orderRepository.findById(1).isEmpty()){
            OrderModel orderModel = new OrderModel();
            orderModel.setOrderDate(LocalDate.now());
            orderModel.setStatus(Status.Pending);
            orderModel.setUser(userRepository.findById(1).orElse(null));
            orderModel.setVoucher(voucherRepository.findById(1).orElse(null));
            orderRepository.save(orderModel);
        }
        if (orderRepository.findById(2).isEmpty()){
            OrderModel orderModel = new OrderModel();
            orderModel.setOrderDate(LocalDate.now());
            orderModel.setStatus(Status.Pending);
            orderModel.setUser(userRepository.findById(2).orElse(null));
            orderModel.setVoucher(voucherRepository.findById(2).orElse(null));
            orderRepository.save(orderModel);
        }
        if (orderRepository.findById(3).isEmpty()){
            OrderModel orderModel = new OrderModel();
            orderModel.setOrderDate(LocalDate.now());
            orderModel.setStatus(Status.Success);
            orderModel.setUser(userRepository.findById(3).orElse(null));
            orderModel.setVoucher(voucherRepository.findById(3).orElse(null));
            orderRepository.save(orderModel);
        }

        if (orderRepository.findById(4).isEmpty()){
            OrderModel orderModel = new OrderModel();
            orderModel.setOrderDate(LocalDate.now());
            orderModel.setStatus(Status.Success);
            orderModel.setUser(userRepository.findById(1).orElse(null));
            orderModel.setVoucher(voucherRepository.findById(1).orElse(null));
            orderRepository.save(orderModel);
        }
        // ORDER DETAIL
        if (orderDetailRepository.findById(1).isEmpty()){
            OrderDetailModel orderDetailModel = new OrderDetailModel();
            orderDetailModel.setProductDetail(productDetailRepository.findById(1).orElse(null));
            orderDetailModel.setQuantity(5);
            orderDetailModel.setOrder(orderRepository.findById(2).orElse(null));
            orderDetailRepository.save(orderDetailModel);
        }
        if (orderDetailRepository.findById(2).isEmpty()){
            OrderDetailModel orderDetailModel = new OrderDetailModel();
            orderDetailModel.setProductDetail(productDetailRepository.findById(2).orElse(null));
            orderDetailModel.setQuantity(10);
            orderDetailModel.setOrder(orderRepository.findById(1).orElse(null));
            orderDetailRepository.save(orderDetailModel);
        }
        // COMMENT
        if(commentRepository.findById(1).isEmpty()){
            CommentModel commentModel = new CommentModel();
            commentModel.setUser(userRepository.findById(3).orElse(null));
            commentModel.setTime(LocalDateTime.now());
            commentModel.setProduct(productRepository.findById(2).orElse(null));
            commentModel.setStar(4);
            commentModel.setContent("Hàng đẹp quá shop");
            commentRepository.save(commentModel);
        }

        if(commentRepository.findById(2).isEmpty()){
            CommentModel commentModel = new CommentModel();
            commentModel.setUser(userRepository.findById(2).orElse(null));
            commentModel.setTime(LocalDateTime.now());
            commentModel.setProduct(productRepository.findById(2).orElse(null));
            commentModel.setStar(4);
            commentModel.setContent("Cảm ơn quý khách");
            commentModel.setCommentModel(commentRepository.findById(1).orElse(null));
            commentRepository.save(commentModel);
        }
        if(commentRepository.findById(3).isEmpty()){
            CommentModel commentModel = new CommentModel();
            commentModel.setUser(userRepository.findById(3).orElse(null));
            commentModel.setTime(LocalDateTime.now());
            commentModel.setProduct(productRepository.findById(2).orElse(null));
            commentModel.setStar(4);
            commentModel.setContent("Shop bọc hàng kí quá");
            commentRepository.save(commentModel);
        }
        if(commentRepository.findById(4).isEmpty()){
            CommentModel commentModel = new CommentModel();
            commentModel.setUser(userRepository.findById(3).orElse(null));
            commentModel.setTime(LocalDateTime.now());
            commentModel.setProduct(productRepository.findById(2).orElse(null));
            commentModel.setStar(3);
            commentModel.setContent("Tư vấn nhiệt tình");
            commentRepository.save(commentModel);
        }



    }
}