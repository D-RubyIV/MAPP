package com.myapp.app;

import com.myapp.app.model.CategoryModel;
import com.myapp.app.model.LicenseModel;
import com.myapp.app.model.RoleModel;
import com.myapp.app.model.UserModel;
import com.myapp.app.repository.CategoryRepository;
import com.myapp.app.repository.LicenseRepository;
import com.myapp.app.repository.RoleRepository;
import com.myapp.app.repository.UserRepository;
import com.myapp.app.util.TimeUtil;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.Set;

@Component
public class InitDataBase {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LicenseRepository licenseRepository;
    @Autowired
    private CategoryRepository categoryRepository;

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
            userRepository.save(userModel);
        }
        if (userRepository.findByUsername("abc") == null){
            UserModel userModel = new UserModel();
            userModel.setUsername("abc");
            userModel.setPassword(new BCryptPasswordEncoder().encode("123"));
            userModel.setEmail("abc@gmail.com");
            userModel.setPhone("84833486936");
            userModel.setEnabled(true);
            userModel.setBalance(9999999);
            userModel.setRoleModel(roleRepository.findByCode("USER"));
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
            userRepository.save(userModel);
        }
        if (categoryRepository.findByCode("HYPERTELE") == null){
            CategoryModel categoryModel = new CategoryModel();
            categoryModel.setCode("HYPERTELE");
            categoryModel.setName("CLASS 1");
            categoryRepository.save(categoryModel);
        }
        if (categoryRepository.findByCode("CYPERSOFT") == null){
            CategoryModel categoryModel = new CategoryModel();
            categoryModel.setCode("CYPERSOFT");
            categoryModel.setName("CLASS 2");
            categoryRepository.save(categoryModel);
        }
        if (licenseRepository.findBySecret("ABCD") == null){
            LicenseModel licenseModel = new LicenseModel();
            licenseModel.setSecret("ABCD");
            licenseModel.setFreezeAt(new TimeUtil().getIsoTime());
            licenseModel.setCategoryModel(categoryRepository.findByCode("HYPERTELE"));
            licenseRepository.save(licenseModel);
        }
    }
}
