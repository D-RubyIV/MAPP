package com.example.app.repository;

import com.example.app.model.ProductEntity;
import com.example.app.response.OverviewProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
    ProductEntity findByName(String name);
    Page<ProductEntity> findBySuggestTrue(Pageable pageable);

    @Query(value = "SELECT new com.example.app.response.OverviewProductResponse(p.id, p.name, p.price, m.name, COALESCE(SUM(pd.quantity), 0) , COALESCE(COUNT(s.name), 0), COALESCE(COUNT(c.name), 0)) FROM ProductEntity p LEFT JOIN ProductDetailEntity pd ON p.id = pd.product.id LEFT JOIN SizeEntity s ON s.id = pd.color.id LEFT JOIN MediaEntity m ON p.media.id = m.id LEFT JOIN ColorEntity c ON pd.color.id = c.id GROUP BY p.id ")
    Page<OverviewProductResponse> findWithPropOverview(Pageable pageable);    //

    @Query(name = "ProductModel.findAllOverViewProduct")
    List<Object> findCustom();


}
