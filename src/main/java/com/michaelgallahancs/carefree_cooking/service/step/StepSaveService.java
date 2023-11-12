package com.michaelgallahancs.carefree_cooking.service.step;

import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.entity.data.Step;
import com.michaelgallahancs.carefree_cooking.repository.RecipeRepository;
import com.michaelgallahancs.carefree_cooking.repository.StepRepository;
import com.michaelgallahancs.carefree_cooking.repository.StepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StepSaveService {
    @Autowired
    private StepRepository stepRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    public Step save(Recipe recipeToSave, Step step) {
        step.setRecipe(recipeToSave);
        return stepRepository.save(step);
    }

    public void saveAll(Recipe recipeToSave, List<Step> steps) {
        // Set the recipe for each instruction
        steps.forEach(step -> {
            System.out.println("\n\n" + step.getStepNumber());
            step.setRecipe(recipeToSave);
        });

        List<Step> ogSteps = stepRepository.findAllByRecipe_Id(recipeToSave.getId());

        // Find any ing id(s) from the og recipe that do not exist in the updated recipe
        // Then remove these ids after the recipe has been saved to avoid integrity violation
        ArrayList<Long> instrIdsToRemove = new ArrayList<>();
        ogSteps.forEach(step -> {
            instrIdsToRemove.add(step.getId());
        });
        steps.forEach(step -> {
            if(instrIdsToRemove.contains(step.getId()))
                instrIdsToRemove.remove(step.getId());
        });

        instrIdsToRemove.forEach(id -> {
            stepRepository.delete(stepRepository.findById(id).orElseThrow());
        });

        steps.forEach(step -> {
            stepRepository.save(step);
        });
    }
}
