package money.manager.domain.activity;

import java.time.Instant;
import java.util.UUID;

import money.manager.domain.activity.type.Type.ActivityType;
import money.manager.utils.InstantUtils;

public class Activity {

    private String id;
    private Instant date;
    private String description;
    private float value;
    private ActivityType type;
    private Instant createdAt;
    private Instant updatedAt;

    private Activity(final String anId, final Instant aDate, final String aDescription,
            final float aValue, final ActivityType aType, final Instant aCreatedAt,
            final Instant anUpdatedAt) {
        this.id = anId;
        this.date = aDate;
        this.description = aDescription;
        this.value = aValue;
        this.type = aType;
        this.createdAt = aCreatedAt;
    }

    public static Activity newActivity(final Instant aDate, final String aDescription,
            final float aValue, final ActivityType aType) {

        return new Activity(
                UUID.randomUUID().toString().toLowerCase(),
                aDate,
                aDescription,
                aValue,
                aType,
                InstantUtils.now(),
                InstantUtils.now());
    }

    public static Activity with(final String anId, final Instant aDate, final String aDescription,
            final float aValue, final ActivityType aType, final Instant aCreatedAt,
            final Instant anUpdatedAt) {
        return new Activity(anId, aDate, aDescription, aValue, aType, aCreatedAt, anUpdatedAt);
    }

    /**
     * @return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @return the date
     */
    public Instant getDate() {
        return date;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @return the value
     */
    public float getValue() {
        return value;
    }

    /**
     * @return the type
     */
    public ActivityType getType() {
        return type;
    }

    /**
     * @return the createdAt
     */
    public Instant getCreatedAt() {
        return createdAt;
    }

    /**
     * @return the updatedAt
     */
    public Instant getUpdatedAt() {
        return updatedAt;
    }

    @Override
    public String toString() {
        return "Activity [id=" + id + ", date=" + date + ", description=" + description + ", value=" + value + ", type="
                + type + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
    }

}
