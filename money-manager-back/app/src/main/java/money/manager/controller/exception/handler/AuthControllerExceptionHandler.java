package money.manager.controller.exception.handler;

import javax.security.auth.login.LoginException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import jakarta.servlet.http.HttpServletRequest;
import money.manager.controller.exception.handler.body.ExceptionResponseBody;
import money.manager.service.auth.exception.AuthException;
import money.manager.utils.InstantUtils;

@ControllerAdvice("money.manager.controller.authentication")
public class AuthControllerExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = { LoginException.class })
    protected ResponseEntity<ExceptionResponseBody> handleLoginExceptions(
            final LoginException anException,
            final HttpServletRequest aRequest) {

        final var aBody = new ExceptionResponseBody(
                InstantUtils.now(),
                HttpStatus.BAD_REQUEST.value(),
                anException.getMessage(),
                aRequest.getRequestURI());

        return ResponseEntity.badRequest().body(aBody);
    }

    @ExceptionHandler(value = { AuthException.class })
    protected ResponseEntity<ExceptionResponseBody> handleAuthExceptions(
            final AuthException anException,
            final HttpServletRequest aRequest) {

        final var aBody = new ExceptionResponseBody(
                InstantUtils.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                anException.getMessage(),
                aRequest.getRequestURI());

        return ResponseEntity.internalServerError().body(aBody);
    }

    @ExceptionHandler(value = { Exception.class })
    protected ResponseEntity<ExceptionResponseBody> handleDomainExceptions(
            final Exception anException,
            final HttpServletRequest aRequest) {

        final var aBody = new ExceptionResponseBody(
                InstantUtils.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                anException.getMessage(),
                aRequest.getRequestURI());

        return ResponseEntity.internalServerError().body(aBody);
    }

}
