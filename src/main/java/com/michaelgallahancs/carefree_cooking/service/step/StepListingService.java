package com.michaelgallahancs.carefree_cooking.service.step;

import com.michaelgallahancs.carefree_cooking.entity.data.Step;
import com.michaelgallahancs.carefree_cooking.repository.StepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class StepListingService {

    @Autowired
    private StepRepository stepRepository;

    public List<Step> retrieveAllSteps()
    {
        return stepRepository.findAll();
    }

    public List<Step> retrieveSteps(Long recipeId)
    {
        return stepRepository.findAllByRecipe_Id(recipeId);
                //.orElseThrow(() -> new EntityNotFoundException(recipeId.toString()));
    }
}
