package money.manager.controller.activity.dto;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonProperty;

public record InsertActivityResponseDto(
        String id,
        Instant date,
        String description,
        float value,
        String type,
        @JsonProperty("created_at") Instant createdAt,
        @JsonProperty("updated_at") Instant updatedAt) {

}
