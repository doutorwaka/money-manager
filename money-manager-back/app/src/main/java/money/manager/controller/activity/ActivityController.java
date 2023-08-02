package money.manager.controller.activity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import money.manager.controller.activity.dto.CalculateBalanceResponseDto;
import money.manager.controller.activity.dto.InsertActivityRequestDto;
import money.manager.controller.activity.dto.InsertActivityResponseDto;
import money.manager.controller.activity.dto.ListActivitiesResponseDto;
import money.manager.controller.activity.dto.mapper.InsertActivityOutputServiceToInsertActivityResponseMapper;
import money.manager.controller.activity.dto.mapper.InsertActivityRequestToInsertActivityServiceMapper;
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

    @PostMapping
    public ResponseEntity<InsertActivityResponseDto> insertActivity(@RequestBody InsertActivityRequestDto input) {

        final var aGateway = ActivityJpaGateway.build(activityRepository);
        final var aService = ActivityServiceImplementation.build(aGateway);

        final var aServiceInput = InsertActivityRequestToInsertActivityServiceMapper.build()
                .apply(input);

        final var aServiceResponse = aService.insertActivity(aServiceInput);

        final var aResponse = InsertActivityOutputServiceToInsertActivityResponseMapper.build()
                .apply(aServiceResponse);

        return ResponseEntity.ok().body(aResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivityById(@PathVariable("id") final String anId) {
        final var aGateway = ActivityJpaGateway.build(activityRepository);
        final var aService = ActivityServiceImplementation.build(aGateway);

        aService.removeActivity(anId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/balance")
    public ResponseEntity<CalculateBalanceResponseDto> calculateBalance() {
        final var aGateway = ActivityJpaGateway.build(activityRepository);
        final var aService = ActivityServiceImplementation.build(aGateway);

        final var aServiceResponse = aService.calculateBalance();

        final var aResponse = new CalculateBalanceResponseDto(aServiceResponse);

        return ResponseEntity.ok().body(aResponse);
    }

}
