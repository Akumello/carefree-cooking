package com.michaelgallahancs.carefree_cooking.service.recipe;
import com.michaelgallahancs.carefree_cooking.entity.data.Ingredient;
import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.repository.IngredientRepository;
import com.michaelgallahancs.carefree_cooking.repository.RecipeRepository;
import com.michaelgallahancs.carefree_cooking.repository.StepRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.provider.HibernateUtils;
import org.springframework.data.jpa.repository.query.Jpa21Utils;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import static javax.persistence.EntityManagerFactory.*;

@Service
public class RecipeDeleteService
{
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private StepRepository stepRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    public void removeAllRecipes()
    {
        List<Recipe> recipes = recipeRepository.findAll();
        recipes.forEach(recipe ->
        {
            recipe.getIngredients().clear();
        });

        recipeRepository.saveAll(recipes);
        stepRepository.deleteAll();
        recipeRepository.deleteAll();
        ingredientRepository.deleteAll();
    }

    public void removeRecipe(Long recipeId)
    {
        // TODO needs transaction code
        Recipe recipe = recipeRepository.getById(recipeId);
        List<Ingredient> ingredientsToRemove = new ArrayList<Ingredient>();

        // Remove recipe from each ingredient, then mark ingredient for removal if it belongs to no other recipes
        recipe.getIngredients().forEach(ingredient ->
        {
            ingredient.removeRecipe(recipe);
            if (ingredient.getRecipes().size() == 0)
                ingredientsToRemove.add(ingredient);
        });

        // Clear recipe_ingredient join table entries, and steps and recipes by id
        recipe.getIngredients().clear();
        recipeRepository.save(recipe);
        stepRepository.deleteAllByRecipe_Id(recipeId);
        recipeRepository.deleteById(recipeId);

        // Remove ingredients with no recipes
        ingredientsToRemove.forEach(ingredient -> {
            ingredientRepository.deleteById(ingredient.getId());
        });
    }
}
