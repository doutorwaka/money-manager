package money.manager.controller.activity.dto;

import java.time.Instant;

public record InsertActivityRequestDto(
        Instant date,
        String description,
        String type,
        float value) {

}
