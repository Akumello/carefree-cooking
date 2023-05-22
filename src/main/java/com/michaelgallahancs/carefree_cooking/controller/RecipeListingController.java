package com.michaelgallahancs.carefree_cooking.controller;
import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.service.recipe.RecipeListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/recipe/listing")
public class RecipeListingController
{
    @Autowired
    private RecipeListingService recipeListingService;

    @CrossOrigin
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Recipe> listAllRecipe()
    {
        return recipeListingService.retrieveAllRecipes();
    }

    @CrossOrigin
    @RequestMapping(value = "/{recipeId}", method = RequestMethod.GET)
    public Recipe listRecipeById(@PathVariable Long recipeId)
    {
        return recipeListingService.retrieveRecipe(recipeId);
    }
}
