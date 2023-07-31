package money.manager.domain.activity.type;

public class Type {

    public enum ActivityType {
        REVENUE("revenue"),
        EXPENSE("expense");

        private String value;

        ActivityType(final String aValue) {
            this.value = aValue;
        }

        public String getValue() {
            return this.value;
        }
    }

}
