package com.michaelgallahancs.carefree_cooking.service.step;

import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.entity.data.Step;
import com.michaelgallahancs.carefree_cooking.repository.RecipeRepository;
import com.michaelgallahancs.carefree_cooking.repository.StepRepository;
import com.michaelgallahancs.carefree_cooking.repository.StepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StepSaveService {
    @Autowired
    private StepRepository stepRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    public Step save(Step step)
    {
        return stepRepository.save(step);
    }

    public void saveAll(Long recipeId, List<Step> steps) {
        steps.forEach(step -> {
            step.setRecipe(recipeRepository.getById(recipeId));
        });
        List<Step> ogSteps = stepRepository.findAllByRecipe_Id(recipeId);

        int ogSize = (ogSteps == null) ? 0 : ogSteps.size();
        for (int i = 0; i < Math.max(steps.size(), ogSize); i++) {
            if (i < ogSteps.size())
                steps.get(i).setId(ogSteps.get(i).getId());

            stepRepository.save(steps.get(i));
        }
    }
}
