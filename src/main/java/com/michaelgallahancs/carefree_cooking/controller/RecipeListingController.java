package com.michaelgallahancs.carefree_cooking.controller;
import com.michaelgallahancs.carefree_cooking.entity.data.Ingredient;
import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.service.recipe.RecipeListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/recipe/listing")
public class RecipeListingController {

    @Autowired
    private RecipeListingService recipeListingService;

    @CrossOrigin
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Recipe> listAllRecipe()
    {
        return recipeListingService.retrieveAllRecipes();
    }
}
