package com.myapp.app.repository;

import com.myapp.app.model.VoucherModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoucherRepository extends JpaRepository<VoucherModel, Long> {
    public VoucherModel findByCode(String code);
}
