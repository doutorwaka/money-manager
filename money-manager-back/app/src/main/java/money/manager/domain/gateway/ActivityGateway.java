package money.manager.domain.gateway;

import java.util.List;

import money.manager.domain.activity.Activity;

public interface ActivityGateway {

    public void create(final Activity anActivity);

    public void delete(final String anId);

    public List<Activity> findAll();

}
