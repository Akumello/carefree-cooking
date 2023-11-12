package com.michaelgallahancs.carefree_cooking.service.recipe;

import com.michaelgallahancs.carefree_cooking.dto.RecipeDTO;
import com.michaelgallahancs.carefree_cooking.entity.data.Ingredient;
import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.repository.IngredientRepository;
import com.michaelgallahancs.carefree_cooking.repository.RecipeRepository;
import com.michaelgallahancs.carefree_cooking.service.ingredient.IngredientListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecipeSaveService {
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private IngredientListingService ingredientListingService;

    public Recipe save(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public Recipe update(Long recipeId, RecipeDTO updatedRecipe) {
        // Retrieve the original recipe and modify its attributes to match the updated recipe
        Recipe recipe = recipeRepository.getById(recipeId);
        recipe.setName(updatedRecipe.getName());
        recipe.setVersion(updatedRecipe.getVersion());
        recipe.setCategory(updatedRecipe.getCategory());

        // Find any ing id(s) from the og recipe that do not exist in the updated recipe
        // Then remove these ids after the recipe has been saved to avoid integrity violation
        ArrayList<Long> ingsToRemoveById = new ArrayList<>();
        recipe.getIngredients().forEach(ingredient -> {
            ingsToRemoveById.add(ingredient.getId());
        });
        updatedRecipe.getIngredients().forEach(ingredient -> {
            if(ingsToRemoveById.contains(ingredient.getId()))
                ingsToRemoveById.remove(ingredient.getId());
        });

        recipe.setIngredients(updatedRecipe.getIngredients());
        Recipe saved = recipeRepository.save(recipe);

        // Remove necessary ingredients now that recipe has been saved
        try {
            ingsToRemoveById.forEach(id -> {
                Ingredient remIngredient = ingredientRepository.findById(id).orElseThrow();
                ingredientRepository.delete(remIngredient);
            });
        } catch (DataIntegrityViolationException e) {
            // Do nothing; If integrity is violated then it means the ingredient has another recipe.
        }

        return saved;
    }

    public Recipe saveIngredientToRecipe(Long recipeId, Long ingredientId) {
        Recipe recipe = recipeRepository.findById(recipeId).get();
        Ingredient ingredient = ingredientRepository.findById(ingredientId).get();

        recipe.addIngredient(ingredient);
        return recipeRepository.save(recipe);
    }

    public Recipe saveIngredientsToRecipe(Long recipeId, List<Ingredient> ingredients) {
        ingredients.forEach( (ingredient) -> {
                long ingredientId = ingredientRepository.findByName(ingredient.getName()).getId();
                saveIngredientToRecipe(recipeId, ingredientId);
            }
        );
        return null;
    }

    public Recipe save(RecipeDTO recipeDTO) {
        Recipe recipe = new Recipe();
        recipe.setName(recipeDTO.getName());
        recipe.setCategory(recipeDTO.getCategory());
        recipe.setVersion(recipeDTO.getVersion());
        Recipe finalRecipe = save(recipe);

        // Add ingredients to the recipe
        recipeDTO.getIngredients().forEach(newIngredient -> {
            Ingredient ingredientFromDb = ingredientListingService.retrieveIngredientByName(newIngredient.getName());
            if (ingredientFromDb != null)
                finalRecipe.addIngredient(ingredientFromDb);
            else
                finalRecipe.addIngredient(newIngredient);
        });

        System.out.println("\n\n" + recipe.toString());
        //Was adding recipe to each instruction, but that needs to be done after the recipe is saved and assigned an id.
        return recipe;
    }
}
