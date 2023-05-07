package com.michaelgallahancs.carefree_cooking.controller;

import com.michaelgallahancs.carefree_cooking.data.RecipeWrapper;
import com.michaelgallahancs.carefree_cooking.entity.data.Ingredient;
import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.entity.data.Step;
import com.michaelgallahancs.carefree_cooking.service.recipe.RecipeSaveService;
import com.michaelgallahancs.carefree_cooking.service.step.StepSaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/recipe")
public class RecipeSaveController {
    @Autowired
    private RecipeSaveService recipeSaveService;
    @Autowired
    private StepSaveService stepSaveService;

    @PostMapping(value = "/save")
    public Recipe saveRecipe(@RequestBody Recipe recipe)
    {
        return recipeSaveService.save(recipe);
    }

    @CrossOrigin
    @PostMapping(value = "/saveAll")
    public Recipe saveRecipe(@RequestBody RecipeWrapper recipe)
    {
        // GetRecipe returns a ready to commit recipe without steps
        Recipe unwrappedRecipe = recipe.getRecipe();
        List<Step> steps;



        recipeSaveService.save(unwrappedRecipe);
        steps = recipe.getInstructions(unwrappedRecipe);
        steps.forEach(step -> { stepSaveService.save(step); });

        return unwrappedRecipe;
    }

    @PutMapping(value = "/{recipeId}/ingredient/{ingredientId}/amount/{amount}")
    public Recipe saveIngredientToRecipe(@PathVariable Long recipeId,
                                         @PathVariable Long ingredientId,
                                         @PathVariable Long amount
    ) {
        return recipeSaveService.saveIngredientToRecipe(recipeId, ingredientId);
    }
}
