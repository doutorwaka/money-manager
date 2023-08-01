package money.manager.controller.activity.dto.mapper;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import money.manager.controller.activity.dto.ActivityDto;
import money.manager.controller.activity.dto.ListActivitiesResponseDto;
import money.manager.service.activity.dto.ListActivitiesOutputDto;

public class ListActivitiesToListActivitiesResponseMapper implements
        Function<List<ListActivitiesOutputDto>, ListActivitiesResponseDto> {

    public static ListActivitiesToListActivitiesResponseMapper build() {
        return new ListActivitiesToListActivitiesResponseMapper();
    }

    @Override
    public ListActivitiesResponseDto apply(final List<ListActivitiesOutputDto> input) {
        final var aList = input.stream()
                .map(a -> new ActivityDto(
                        a.id(),
                        a.date(),
                        a.description(),
                        a.type(),
                        a.value()))
                .collect(Collectors.toList());

        return new ListActivitiesResponseDto(aList);
    }

}
