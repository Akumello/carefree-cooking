package com.michaelgallahancs.carefree_cooking.service.ingredient;

import com.michaelgallahancs.carefree_cooking.entity.data.Ingredient;
import com.michaelgallahancs.carefree_cooking.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IngredientSaveService {

    @Autowired
    private IngredientRepository ingredientRepository;

    public Ingredient save(Ingredient ingredient)
    {
        return ingredientRepository.save(ingredient);
    }
}
