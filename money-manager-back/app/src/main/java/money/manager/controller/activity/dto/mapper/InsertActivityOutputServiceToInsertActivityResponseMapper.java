package money.manager.controller.activity.dto.mapper;

import java.util.function.Function;

import money.manager.controller.activity.dto.InsertActivityResponseDto;
import money.manager.service.activity.dto.InsertActivityOutputDto;

public class InsertActivityOutputServiceToInsertActivityResponseMapper
        implements Function<InsertActivityOutputDto, InsertActivityResponseDto> {

    public static InsertActivityOutputServiceToInsertActivityResponseMapper build() {
        return new InsertActivityOutputServiceToInsertActivityResponseMapper();
    }

    @Override
    public InsertActivityResponseDto apply(final InsertActivityOutputDto input) {
        return new InsertActivityResponseDto(
                input.id(),
                input.date(),
                input.description(),
                input.value(),
                input.type(),
                input.updatedAt(),
                input.createdAt());
    }

}
