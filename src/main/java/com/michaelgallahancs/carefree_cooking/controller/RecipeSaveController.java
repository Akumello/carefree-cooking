package com.michaelgallahancs.carefree_cooking.controller;

import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.service.recipe.RecipeSaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recipe")
public class RecipeSaveController {
    @Autowired
    private RecipeSaveService recipeSaveService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Recipe saveRecipe(@RequestBody Recipe recipe)
    {
        return recipeSaveService.save(recipe);
    }
}
