package money.manager.service.activity.dto.mapper;

import java.util.function.Function;

import money.manager.domain.activity.Activity;
import money.manager.service.activity.dto.ListActivitiesOutputDto;

public class ActivityToListActivitiesOutputMapper implements Function<Activity, ListActivitiesOutputDto> {

    public static ActivityToListActivitiesOutputMapper build() {
        return new ActivityToListActivitiesOutputMapper();
    }

    @Override
    public ListActivitiesOutputDto apply(final Activity input) {
        return new ListActivitiesOutputDto(
                input.getId(),
                input.getDate(),
                input.getDescription(),
                input.getValue(),
                input.getType().getValue(),
                input.getCreatedAt(),
                input.getUpdatedAt());
    }
}
