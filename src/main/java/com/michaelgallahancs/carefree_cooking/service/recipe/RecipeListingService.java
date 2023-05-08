package com.michaelgallahancs.carefree_cooking.service.recipe;

import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Service
public class RecipeListingService {

    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> retrieveAllRecipes()
    {
        return recipeRepository.findAll();
    }
}
