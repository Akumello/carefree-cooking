package com.michaelgallahancs.carefree_cooking.controller;

import com.michaelgallahancs.carefree_cooking.entity.data.Ingredient;
import com.michaelgallahancs.carefree_cooking.service.ingredient.IngredientListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ingredient/listing")
public class IngredientListingController {

    @Autowired
    private IngredientListingService ingredientListingService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Ingredient> listAllIngredients()
    {
        return ingredientListingService.retrieveAllIngredients();
    }

    @CrossOrigin
    @RequestMapping(value = "/{recipeId}", method = RequestMethod.GET)
    public List<Ingredient> listIngredientsByRecipe(@PathVariable Long recipeId)
    {
        return ingredientListingService.retrieveIngredients(recipeId);
    }
}
