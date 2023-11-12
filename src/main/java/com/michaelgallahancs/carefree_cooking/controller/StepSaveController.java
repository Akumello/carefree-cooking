package com.michaelgallahancs.carefree_cooking.controller;

import com.michaelgallahancs.carefree_cooking.entity.data.Step;
import com.michaelgallahancs.carefree_cooking.service.step.StepSaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/step")
public class StepSaveController {
    @Autowired
    private StepSaveService stepSaveService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Step saveStep(@RequestBody Step step) {
        return stepSaveService.save(step);
    }
}
