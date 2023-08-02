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

        if (input.type().trim().toUpperCase().equals(ActivityType.REVENUE.toString())) {
            final var anActivity = Activity.newActivity(
                    input.date(),
                    input.description(),
                    input.value(),
                    ActivityType.REVENUE);

            return anActivity;
        } else if (input.type().trim().toUpperCase().equals(ActivityType.EXPENSE.toString())) {
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
