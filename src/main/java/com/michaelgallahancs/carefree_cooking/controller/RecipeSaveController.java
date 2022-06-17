package com.michaelgallahancs.carefree_cooking.controller;

import com.michaelgallahancs.carefree_cooking.entity.data.Ingredient;
import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.service.recipe.RecipeSaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recipe")
public class RecipeSaveController {
    @Autowired
    private RecipeSaveService recipeSaveService;

    @PostMapping(value = "/save")
    public Recipe saveRecipe(@RequestBody Recipe recipe)
    {
        return recipeSaveService.save(recipe);
    }

    @PutMapping(value = "/{recipeId}/ingredient/{ingredientId}")
    public Recipe saveIngredientToRecipe(@PathVariable Long recipeId,
                                         @PathVariable Long ingredientId
    ) {
        return recipeSaveService.saveIngredientToRecipe(recipeId, ingredientId);
    }
}
