package money.manager.service.activity.dto.mapper;

import com.google.common.base.Function;

import money.manager.domain.activity.Activity;
import money.manager.domain.activity.type.Type.ActivityType;
import money.manager.service.activity.dto.InsertActivityInputDto;
import money.manager.service.exception.ServiceException;

public class InsertActivityInputToActivityMapper implements Function<InsertActivityInputDto, Activity> {

    public static InsertActivityInputToActivityMapper build() {
        return new InsertActivityInputToActivityMapper();
    }

    @Override
    public Activity apply(final InsertActivityInputDto input) {

        if (input.type().equals(ActivityType.REVENUE)) {
            final var anActivity = Activity.newActivity(
                    input.date(),
                    input.description(),
                    input.value(),
                    ActivityType.REVENUE);

            return anActivity;
        } else if (input.type().equals(ActivityType.EXPENSE)) {
            final var anActivity = Activity.newActivity(
                    input.date(),
                    input.description(),
                    input.value(),
                    ActivityType.EXPENSE);

            return anActivity;
        } else {
            throw new ServiceException("Invalid activity type");
        }

    }

}
