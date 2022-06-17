package com.michaelgallahancs.carefree_cooking.controller;

import com.michaelgallahancs.carefree_cooking.entity.data.Step;
import com.michaelgallahancs.carefree_cooking.service.step.StepListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/step/listing")
public class StepListingController
{
    @Autowired
    private StepListingService stepListingService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Step> listAllSteps()
    {
        return stepListingService.retrieveAllSteps();
    }

}
