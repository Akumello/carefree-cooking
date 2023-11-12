package com.michaelgallahancs.carefree_cooking.controller;

import com.michaelgallahancs.carefree_cooking.dto.RecipeDTO;
import com.michaelgallahancs.carefree_cooking.entity.data.Ingredient;
import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.entity.data.Step;
import com.michaelgallahancs.carefree_cooking.repository.RecipeRepository;
import com.michaelgallahancs.carefree_cooking.repository.StepRepository;
import com.michaelgallahancs.carefree_cooking.service.ingredient.IngredientListingService;
import com.michaelgallahancs.carefree_cooking.service.ingredient.IngredientSaveService;
import com.michaelgallahancs.carefree_cooking.service.recipe.RecipeListingService;
import com.michaelgallahancs.carefree_cooking.service.recipe.RecipeSaveService;
import com.michaelgallahancs.carefree_cooking.service.step.StepListingService;
import com.michaelgallahancs.carefree_cooking.service.step.StepSaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipe")
public class RecipeSaveController {
    @Autowired
    private RecipeSaveService recipeSaveService;
    @Autowired
    private RecipeListingService recipeListingService;
    @Autowired
    private StepSaveService stepSaveService;
    @Autowired
    private StepListingService stepListingService;

    @Autowired
    private IngredientSaveService ingredientSaveService;
    @Autowired
    private IngredientListingService ingredientListingService;

    @Autowired
    private RecipeRepository recipeRepository;
    @Autowired
    private StepRepository stepRepository;

    @PostMapping(value = "/save")
    public Recipe saveRecipe(@RequestBody Recipe recipe)
    {
        return recipeSaveService.save(recipe);
    }

    @CrossOrigin
    @PostMapping(value = "/saveAll")
    public Recipe saveNewRecipe(@RequestBody RecipeDTO recipeToSave) {
        // TODO Make comments and only save ingredients that are not duplicate
        Recipe recipe = recipeSaveService.save(recipeToSave);
        recipeSaveService.save(recipe);
        stepSaveService.saveAll(recipe, recipeToSave.getInstructions());
        return recipe;
    }

    @CrossOrigin
    @PostMapping(value = "/saveAll/{recipeId}")
    public Recipe updateRecipe(@RequestBody RecipeDTO recipeToSave, @PathVariable Long recipeId) {
        // TODO Make comments and only save ingredients that are not duplicate
        Recipe recipe = recipeSaveService.update(recipeId, recipeToSave);
        stepSaveService.saveAll(recipe, recipeToSave.getInstructions());
        return recipe;
    }

    @PutMapping(value = "/{recipeId}/ingredient/{ingredientId}/amount/{amount}")
    public Recipe saveIngredientToRecipe(@PathVariable Long recipeId,
                                         @PathVariable Long ingredientId,
                                         @PathVariable Long amount) {
        return recipeSaveService.saveIngredientToRecipe(recipeId, ingredientId);
    }
}
