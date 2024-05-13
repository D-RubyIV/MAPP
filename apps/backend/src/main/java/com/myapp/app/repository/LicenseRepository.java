package com.myapp.app.repository;

import com.myapp.app.model.LicenseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LicenseRepository extends JpaRepository<LicenseModel, Long> {
    LicenseModel findBySecret(String secret);
}
