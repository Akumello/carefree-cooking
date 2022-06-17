package com.michaelgallahancs.carefree_cooking.service.recipe;

import com.michaelgallahancs.carefree_cooking.entity.data.Ingredient;
import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.repository.IngredientRepository;
import com.michaelgallahancs.carefree_cooking.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class RecipeSaveService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    public Recipe save(Recipe recipe)
    {
        return recipeRepository.save(recipe);
    }

    public Recipe saveIngredientToRecipe(Long recipeId, Long ingredientId)
    {
        Recipe recipe = recipeRepository.findById(recipeId).get();
        Ingredient ingredient = ingredientRepository.findById(ingredientId).get();

        recipe.addIngredient(ingredient);
        return recipeRepository.save(recipe);
    }
}
