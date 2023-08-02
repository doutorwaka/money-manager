package money.manager.controller.authentication.dto.mapper;

import java.util.function.Function;

import money.manager.controller.authentication.dto.LoginRequestDto;
import money.manager.service.auth.dto.LoginServiceInputDto;

public class LoginRequestToLoginServiceInputMapper implements Function<LoginRequestDto, LoginServiceInputDto> {

    public static LoginRequestToLoginServiceInputMapper build() {
        return new LoginRequestToLoginServiceInputMapper();
    }

    @Override
    public LoginServiceInputDto apply(final LoginRequestDto input) {
        return new LoginServiceInputDto(input.email(), input.password());
    }

}
