package money.manager.repository.activity;

import java.util.List;
import java.util.stream.Collectors;

import money.manager.domain.activity.Activity;
import money.manager.domain.gateway.ActivityGateway;
import money.manager.repository.activity.jpa.ActivityJpaEntity;
import money.manager.repository.activity.jpa.ActivityJpaRepository;

public class ActivityJpaGateway implements ActivityGateway {

    private ActivityJpaRepository activityRepository;

    private ActivityJpaGateway(final ActivityJpaRepository aRepository) {
        this.activityRepository = aRepository;
    }

    public static ActivityJpaGateway build(final ActivityJpaRepository aRepository) {
        return new ActivityJpaGateway(aRepository);
    }

    @Override
    public void create(final Activity anActivity) {
        final var anActivityEntity = ActivityJpaEntity.from(anActivity);

        this.activityRepository.save(anActivityEntity);
    }

    @Override
    public void delete(final String anId) {
        this.activityRepository.deleteById(anId);
    }

    @Override
    public List<Activity> findAll() {
        final var aList = this.activityRepository.findAll();

        return aList.stream()
                .map(activityEntity -> activityEntity.toModel())
                .collect(Collectors.toList());
    }

}
