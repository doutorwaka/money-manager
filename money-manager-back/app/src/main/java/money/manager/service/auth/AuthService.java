package money.manager.service.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;

import money.manager.domain.user.User;
import money.manager.service.auth.dto.LoginServiceInputDto;
import money.manager.service.auth.dto.LoginServiceOutputDto;
import money.manager.service.auth.exception.AuthException;
import money.manager.service.auth.exception.LoginException;
import money.manager.utils.InstantUtils;

public class AuthService {

    // Usuário único da aplicação
    final User uniqueUser = User.with("doutorwaka@gmail.com", "doutorwaka");

    private final String TOKEN_SECRET = "123456";

    private final String TOKEN_ISSUER = "money.manager";

    public LoginServiceOutputDto login(final LoginServiceInputDto input) {

        final var anUser = User.with(input.email(), input.password());

        if (!uniqueUser.getEmail().equals(anUser.getEmail())
                || !uniqueUser.getPassword().equals(anUser.getPassword())) {
            throw new LoginException("User or password not found");
        }

        final var aToken = this.createToken(anUser);

        return new LoginServiceOutputDto(aToken);
    }

    private String createToken(final User anUser) {

        final var anAlgorithm = Algorithm.HMAC256(TOKEN_SECRET);

        try {
            final var aToken = JWT.create()
                    .withIssuer(TOKEN_ISSUER)
                    .withSubject(anUser.getEmail())
                    .withExpiresAt(InstantUtils.now().plusSeconds(60 * 60 * 4)) // plus 4 horas
                    .sign(anAlgorithm);

            return aToken;

        } catch (IllegalArgumentException e) {
            throw new AuthException(e.getMessage());
        } catch (JWTCreationException e) {
            throw new AuthException(e.getMessage());
        }
    }

}
