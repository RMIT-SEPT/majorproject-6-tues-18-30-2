package sept.registration.error;
public class PasswordTooShortException extends Exception{
    public PasswordTooShortException() {
        super("Password must be greater than or equals to 6 characters");
    }
}