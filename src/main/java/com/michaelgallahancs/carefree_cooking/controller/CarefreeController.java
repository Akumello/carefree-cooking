package com.michaelgallahancs.carefree_cooking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class CarefreeController {
    @GetMapping("/")
    public String index() {
        return "recipe-menu.html";
    }

    @RequestMapping(value = "/edit", method = RequestMethod.GET)
    public String edit() {
        return "recipe-add.html";
    }
}
