package money.manager.controller.activity.dto.mapper;

import java.util.function.Function;

import money.manager.controller.activity.dto.InsertActivityRequestDto;
import money.manager.service.activity.dto.InsertActivityInputDto;

public class InsertActivityRequestToInsertActivityServiceMapper
        implements Function<InsertActivityRequestDto, InsertActivityInputDto> {

    public static InsertActivityRequestToInsertActivityServiceMapper build() {
        return new InsertActivityRequestToInsertActivityServiceMapper();
    }

    @Override
    public InsertActivityInputDto apply(final InsertActivityRequestDto input) {

        return new InsertActivityInputDto(
                input.date(),
                input.description(),
                input.value(),
                input.type());
    }

}
