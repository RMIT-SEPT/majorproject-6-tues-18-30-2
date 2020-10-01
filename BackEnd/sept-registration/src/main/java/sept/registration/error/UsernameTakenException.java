package sept.registration.error;

public class UsernameTakenException extends Exception{
    public UsernameTakenException() {
        super("Username already taken, please try another");
    }
}