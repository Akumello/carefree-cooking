package com.michaelgallahancs.carefree_cooking.service.recipe;

import com.michaelgallahancs.carefree_cooking.dto.RecipeDTO;
import com.michaelgallahancs.carefree_cooking.entity.data.Ingredient;
import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.entity.data.Step;
import com.michaelgallahancs.carefree_cooking.repository.RecipeRepository;
import com.michaelgallahancs.carefree_cooking.service.ingredient.IngredientListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class RecipeListingService
{
    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> retrieveAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe retrieveRecipe(Long recipeId) {
        return recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException(recipeId.toString()));
    }
}
