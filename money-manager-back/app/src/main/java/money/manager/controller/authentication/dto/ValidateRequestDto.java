package money.manager.controller.authentication.dto;

import jakarta.validation.constraints.NotBlank;

public record ValidateRequestDto (
    @NotBlank(message = "token should not be blank") String token
){
    
}
