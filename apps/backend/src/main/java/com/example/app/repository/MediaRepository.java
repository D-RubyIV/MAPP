package com.example.app.repository;

import com.example.app.model.MediaModel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MediaRepository extends JpaRepository<MediaModel, Integer> {
    Optional<MediaModel> findByName(String name);

}
