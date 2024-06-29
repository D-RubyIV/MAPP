package com.example.app.repository;

import com.example.app.model.ProductModel;
import com.example.app.response.CustomProductResponse;
import com.example.app.response.OverviewProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Integer> {
    ProductModel findByName(String name);
    Page<ProductModel> findBySuggestTrue(Pageable pageable);
    //
    @Query(value = "SELECT new CustomProductResponse(p.id, p.name, p.price, p.category, m.name, COALESCE(SUM(c.star), 0), COALESCE(COUNT(c.id), 0)) FROM ProductModel p LEFT JOIN CommentModel c ON p.id = c.product.id LEFT JOIN MediaModel m ON p.media.id = m.id GROUP BY p.id")
    List<CustomProductResponse> findWithProp(Pageable pageable);
    //
    @Query(value = "SELECT new OverviewProductResponse(p.id, p.name, p.price, m.name, COALESCE(SUM(pd.quantity), 0) , COALESCE(COUNT(s.name), 0), COALESCE(COUNT(c.name), 0)) FROM ProductModel p LEFT JOIN ProductDetailModel pd ON p.id = pd.product.id LEFT JOIN SizeModel s ON s.id = pd.color.id LEFT JOIN MediaModel m ON p.media.id = m.id LEFT JOIN ColorModel c ON pd.color.id = c.id GROUP BY p.id ")
    Page<OverviewProductResponse> findWithPropOverview(Pageable pageable);


}
