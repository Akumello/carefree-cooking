package com.michaelgallahancs.carefree_cooking.controller;
import com.michaelgallahancs.carefree_cooking.service.recipe.RecipeDeleteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recipe/delete")
public class RecipeDeleteController
{
    @Autowired
    private RecipeDeleteService recipeDeleteService;

    @CrossOrigin
    @RequestMapping(value = "/all", method = RequestMethod.DELETE)
    public void deleteAllRecipes()
    {
        recipeDeleteService.removeAllRecipes();
    }

    @CrossOrigin
    @RequestMapping(value = "/{recipeId}", method = RequestMethod.DELETE)
    public void deleteRecipe(@PathVariable Long recipeId)
    {
        recipeDeleteService.removeRecipe(recipeId);
    }
}
