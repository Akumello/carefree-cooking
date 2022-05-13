package com.michaelgallahancs.carefree_cooking.repository;

import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {


}
