package money.manager.service.activity.dto.mapper;

import java.util.function.Function;

import money.manager.domain.activity.Activity;
import money.manager.service.activity.dto.InsertActivityOutputDto;

public class ActivityToInsertActivityOutputMapper implements Function<Activity, InsertActivityOutputDto> {

    public static ActivityToInsertActivityOutputMapper build() {
        return new ActivityToInsertActivityOutputMapper();
    }

    @Override
    public InsertActivityOutputDto apply(final Activity input) {
        return new InsertActivityOutputDto(
                input.getId(),
                input.getDate(),
                input.getDescription(),
                input.getValue(),
                input.getType().getValue(),
                input.getCreatedAt(),
                input.getUpdatedAt());

    }

}
