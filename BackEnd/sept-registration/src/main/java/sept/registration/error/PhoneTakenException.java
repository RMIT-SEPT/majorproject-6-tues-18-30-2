package sept.registration.error;
public class PhoneTakenException extends Exception{
    public PhoneTakenException() {
        super("Mobile number has been taken, please try another");
    }
}