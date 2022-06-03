package com.michaelgallahancs.carefree_cooking.service.recipe;

import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeSaveService {

    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe save(Recipe recipe)
    {
        return recipeRepository.save(recipe);
    }
}
