package sept.registration.error;

public class InputEmptyException extends Exception{
	public InputEmptyException(String field) {
        super(field + " is required");
    }
}
