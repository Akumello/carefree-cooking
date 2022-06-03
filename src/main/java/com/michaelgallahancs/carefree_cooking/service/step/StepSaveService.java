package com.michaelgallahancs.carefree_cooking.service.step;

import com.michaelgallahancs.carefree_cooking.entity.data.Recipe;
import com.michaelgallahancs.carefree_cooking.entity.data.Step;
import com.michaelgallahancs.carefree_cooking.repository.RecipeRepository;
import com.michaelgallahancs.carefree_cooking.repository.StepRepository;
import com.michaelgallahancs.carefree_cooking.repository.StepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StepSaveService {

    @Autowired
    private StepRepository stepRepository;

    public Step save(Step step)
    {
        return stepRepository.save(step);
    }
}
