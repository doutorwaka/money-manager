package money.manager.service.activity.dto;

import java.time.Instant;

public record InsertActivityOutputDto(
                String id,
                Instant date,
                String description,
                float value,
                String type,
                Instant createdAt,
                Instant updatedAt) {

}
