package money.manager.service.activity.implementation;

import java.util.List;
import java.util.stream.Collectors;

import money.manager.domain.activity.type.Type.ActivityType;
import money.manager.domain.gateway.ActivityGateway;
import money.manager.service.activity.ActivityService;
import money.manager.service.activity.dto.InsertActivityInputDto;
import money.manager.service.activity.dto.InsertActivityOutputDto;
import money.manager.service.activity.dto.ListActivitiesOutputDto;
import money.manager.service.activity.dto.mapper.ActivityToInsertActivityOutputMapper;
import money.manager.service.activity.dto.mapper.ActivityToListActivitiesOutputMapper;
import money.manager.service.activity.dto.mapper.InsertActivityInputToActivityMapper;

public class ActivityServiceImplementation implements ActivityService {

    private ActivityGateway activityGateway;

    private ActivityServiceImplementation(final ActivityGateway aGateway) {
        this.activityGateway = aGateway;
    }

    public static ActivityServiceImplementation build(final ActivityGateway aGateway) {
        return new ActivityServiceImplementation(aGateway);
    }

    @Override
    public InsertActivityOutputDto insertActivity(final InsertActivityInputDto anInput) {
        final var anActivity = InsertActivityInputToActivityMapper.build().apply(anInput);

        this.activityGateway.create(anActivity);

        return ActivityToInsertActivityOutputMapper.build().apply(anActivity);
    }

    @Override
    public void removeActivity(final String anId) {
        this.activityGateway.delete(anId);
    }

    @Override
    public List<ListActivitiesOutputDto> listActivities() {
        final var aList = this.activityGateway.findAll();

        return aList.stream()
                .map(a -> ActivityToListActivitiesOutputMapper.build()
                        .apply(a))
                .collect(Collectors.toList());
    }

    @Override
    public float calculateBalance() {
        final var aList = this.activityGateway.findAll();

        if (aList == null || aList.size() == 0) {
            return 0;
        }

        return (float) aList.stream()
                .mapToDouble(
                        a -> a.getType() == ActivityType.REVENUE
                                ? a.getValue()
                                : -a.getValue())
                .sum();
    }

}
