package com.myapp.app.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;
@Configuration
public class ProjectConfig {
    @Bean
    public Cloudinary cloudinaryConfig() {
        Cloudinary cloudinary = null;
        Map config = new HashMap();
        config.put("cloud_name", "dngt2bqjv");
        config.put("api_key", "356613833115456");
        config.put("api_secret", "a3iBaTy0pzrFusGHlhqxMNiwlfs");
        cloudinary = new Cloudinary(config);
        return cloudinary;
    }
}
