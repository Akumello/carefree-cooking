package com.michaelgallahancs.carefree_cooking;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class ViewController {

    @GetMapping(value = "/", produces = { MediaType.TEXT_HTML_VALUE })
    public String listAllIngredients()
    {
        return "recipe.html";
    }
}