package money.manager.controller.activity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ActivityController {
    
    @GetMapping
    public String helloWorld(){
        return "Olá money manager do Dr. Waka!";
    }

}
