package com.michaelgallahancs.carefree_cooking.repository;

import com.michaelgallahancs.carefree_cooking.entity.data.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    Ingredient findByName(String name);

    List<Ingredient> findByRecipes_Id(Long recipeId);

    @Transactional
    void deleteById(Long id);
}
