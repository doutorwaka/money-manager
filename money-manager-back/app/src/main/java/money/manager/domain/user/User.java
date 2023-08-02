package money.manager.domain.user;

public class User {

    private String email;
    private String password;

    private User(final String anEmail, final String aPassword) {
        this.email = anEmail;
        this.password = aPassword;
    }

    public static User with(final String anEmail, final String aPassword) {
        return new User(anEmail, aPassword);
    }

    /**
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @return the password
     */
    public String getPassword() {
        return password;
    }
}
