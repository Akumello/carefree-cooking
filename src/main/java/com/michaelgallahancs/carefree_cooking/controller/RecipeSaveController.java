package com.michaelgallahancs.carefree_cooking.controller;

import com.michaelgallahancs.carefree_cooking.data.RecipeWrapper;
import com.michaelgallahancs.carefree_cooking.entity.data.Ingredient;
import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.entity.data.Step;
import com.michaelgallahancs.carefree_cooking.repository.RecipeRepository;
import com.michaelgallahancs.carefree_cooking.repository.StepRepository;
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
    public Recipe saveRecipe(@RequestBody RecipeWrapper recipe)
    {
        // TODO Make comments and only save ingredients that are not duplicate
        // GetRecipe returns a ready to commit recipe without steps
        Recipe unwrappedRecipe = recipe.getRecipe();
        List<Step> steps;

        recipeSaveService.save(unwrappedRecipe);
        steps = recipe.getInstructions(unwrappedRecipe);
        steps.forEach(step -> { stepSaveService.save(step); });

        return unwrappedRecipe;
    }

    @CrossOrigin
    @PostMapping(value = "/saveAll/{recipeId}")
    public Recipe saveRecipe(@RequestBody RecipeWrapper recipeToSave, @PathVariable Long recipeId)
    {
        // TODO Make comments and only save ingredients that are not duplicate
        // GetRecipe returns a ready to commit recipe without steps
        Recipe recipe = recipeRepository.getById(recipeId);
        recipe.setName(recipeToSave.getName());
        recipe.setVersion(recipeToSave.getVersion());
        recipe.setCategory(recipeToSave.getCategory());
        recipe.setIngredients(recipeToSave.getIngredients());
        recipeSaveService.save(recipe);

        stepRepository.deleteAllByRecipe_Id(recipeId);
        List<Step> steps = recipeToSave.getInstructions(recipe);
        steps.forEach(step -> { stepSaveService.save(step); });

        return recipe;
    }

    @PutMapping(value = "/{recipeId}/ingredient/{ingredientId}/amount/{amount}")
    public Recipe saveIngredientToRecipe(@PathVariable Long recipeId,
                                         @PathVariable Long ingredientId,
                                         @PathVariable Long amount
    ) {
        return recipeSaveService.saveIngredientToRecipe(recipeId, ingredientId);
    }
}
