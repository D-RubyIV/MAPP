package com.example.app.repository;

import com.example.app.model.CollectionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CollectionRepository extends JpaRepository<CollectionModel, Integer> {
    Optional<CollectionModel> findByCode(String code);
}
