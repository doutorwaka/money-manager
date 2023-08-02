package money.manager.controller.authentication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ValidateResponseDto(
        @JsonProperty("is_valid") boolean isValid) {

}
