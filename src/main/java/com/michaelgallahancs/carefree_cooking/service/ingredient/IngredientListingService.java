package com.michaelgallahancs.carefree_cooking.service.ingredient;

import com.michaelgallahancs.carefree_cooking.entity.data.Ingredient;
import com.michaelgallahancs.carefree_cooking.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientListingService {

    @Autowired
    private IngredientRepository ingredientRepository;

    public List<Ingredient> retrieveAllIngredients()
    {
        return ingredientRepository.findAll();
    }
}
