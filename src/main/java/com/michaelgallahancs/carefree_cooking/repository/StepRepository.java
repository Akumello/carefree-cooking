package com.michaelgallahancs.carefree_cooking.repository;

import com.michaelgallahancs.carefree_cooking.entity.data.Ingredient;
import com.michaelgallahancs.carefree_cooking.entity.data.Step;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface StepRepository extends JpaRepository<Step, Long> {
    List<Step> findAllByRecipe_Id(Long recipeId);

    @Transactional
    void deleteAllByRecipe_Id(Long recipeId);
}
