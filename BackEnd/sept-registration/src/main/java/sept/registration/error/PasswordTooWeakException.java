package sept.registration.error;
public class PasswordTooWeakException extends Exception{
    public PasswordTooWeakException() {
        super("Password must contain 1 lowercase & 1 uppercase characters");
    }
}