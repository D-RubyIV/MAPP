package com.example.app.repository;

import com.example.app.model.CollectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CollectionRepository extends JpaRepository<CollectionEntity, Integer> {
    Optional<CollectionEntity> findByCode(String code);
}
