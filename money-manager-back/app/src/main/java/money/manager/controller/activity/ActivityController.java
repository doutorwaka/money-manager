package money.manager.controller.activity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import money.manager.controller.activity.dto.ListActivitiesResponseDto;
import money.manager.controller.activity.dto.mapper.ListActivitiesToListActivitiesResponseMapper;
import money.manager.repository.activity.ActivityJpaGateway;
import money.manager.repository.activity.jpa.ActivityJpaRepository;
import money.manager.service.activity.implementation.ActivityServiceImplementation;

@RestController
@RequestMapping("/activities")
public class ActivityController {

    @Autowired
    private ActivityJpaRepository activityRepository;

    @GetMapping
    public ResponseEntity<ListActivitiesResponseDto> listActivities() {

        final var aGateway = ActivityJpaGateway.build(activityRepository);

        final var aService = ActivityServiceImplementation.build(aGateway);

        final var aList = aService.listActivities();

        final var aResponse = ListActivitiesToListActivitiesResponseMapper
                .build()
                .apply(aList);

        return ResponseEntity.ok().body(aResponse);

    }

}
