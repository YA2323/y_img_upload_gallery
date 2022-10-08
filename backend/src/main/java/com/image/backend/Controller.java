package com.image.backend;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/a")
public class Controller {


    @GetMapping
    public String sayHi(){
        return "HI Backend";
    }
}
