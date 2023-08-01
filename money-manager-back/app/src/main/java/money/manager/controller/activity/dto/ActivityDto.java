package money.manager.controller.activity.dto;

import java.time.Instant;

public record ActivityDto (
    String id,
    Instant date,
    String description,
    String type,
    float value
){
    
}
