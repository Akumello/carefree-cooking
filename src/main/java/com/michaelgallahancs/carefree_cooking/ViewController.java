package com.michaelgallahancs.carefree_cooking;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/test")
public class ViewController
{
    @GetMapping("/index")
    @ResponseBody
    private String test()
    {
        return "sample_index";
    }
}
