package money.manager.controller.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import jakarta.servlet.http.HttpServletRequest;
import money.manager.controller.exception.handler.body.ExceptionResponseBody;
import money.manager.domain.exception.DomainException;
import money.manager.repository.activity.exception.PersistenceException;
import money.manager.service.exception.ServiceException;
import money.manager.utils.InstantUtils;

@ControllerAdvice
public class ActivityControllerExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = { DomainException.class })
    protected ResponseEntity<ExceptionResponseBody> handleDomainExceptions(final DomainException anException,
            final HttpServletRequest aRequest) {

        final var aBody = new ExceptionResponseBody(
                InstantUtils.now(),
                HttpStatus.BAD_REQUEST.value(),
                anException.getMessage(),
                aRequest.getRequestURI());

        return ResponseEntity.badRequest().body(aBody);
    }

    @ExceptionHandler(value = { PersistenceException.class })
    protected ResponseEntity<ExceptionResponseBody> handleDomainExceptions(final PersistenceException anException,
            final HttpServletRequest aRequest) {

        final var aBody = new ExceptionResponseBody(
                InstantUtils.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                anException.getMessage(),
                aRequest.getRequestURI());

        return ResponseEntity.internalServerError().body(aBody);
    }

    @ExceptionHandler(value = { ServiceException.class })
    protected ResponseEntity<ExceptionResponseBody> handleDomainExceptions(final ServiceException anException,
            final HttpServletRequest aRequest) {

        final var aBody = new ExceptionResponseBody(
                InstantUtils.now(),
                HttpStatus.BAD_REQUEST.value(),
                anException.getMessage(),
                aRequest.getRequestURI());

        return ResponseEntity.badRequest().body(aBody);
    }

    @ExceptionHandler(value = { Exception.class })
    protected ResponseEntity<ExceptionResponseBody> handleDomainExceptions(final Exception anException,
            final HttpServletRequest aRequest) {

        final var aBody = new ExceptionResponseBody(
                InstantUtils.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                anException.getMessage(),
                aRequest.getRequestURI());

        return ResponseEntity.internalServerError().body(aBody);
    }

}
