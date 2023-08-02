package money.manager.controller.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import money.manager.controller.authentication.dto.LoginRequestDto;
import money.manager.controller.authentication.dto.LoginResponseDto;
import money.manager.controller.authentication.dto.ValidateRequestDto;
import money.manager.controller.authentication.dto.ValidateResponseDto;
import money.manager.controller.authentication.dto.mapper.LoginRequestToLoginServiceInputMapper;
import money.manager.service.auth.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid final LoginRequestDto input) {

        final var aServiceInput = LoginRequestToLoginServiceInputMapper.build().apply(input);

        final var aToken = authService.login(aServiceInput).token();

        final var aResponse = new LoginResponseDto(aToken);

        return ResponseEntity.ok(aResponse);
    }

    @PostMapping("/validate")
    public ResponseEntity<ValidateResponseDto> validate(@RequestBody @Valid final ValidateRequestDto input) {

        final var aServiceOutput = this.authService.validateToken(input.token());

        var isValid = false;

        if (!aServiceOutput.isBlank()) {
            isValid = true;
        }

        return ResponseEntity.ok().body(new ValidateResponseDto(isValid));
    }

}
