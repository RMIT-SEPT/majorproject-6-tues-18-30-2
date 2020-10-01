package sept.registration.error;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler{
	/**
     * Handles PasswordTooShortException.
     *
     * @param ex the PasswordTooShortException
     * @return the ApiError object
     */
    @ExceptionHandler(PasswordTooShortException.class)
    protected ResponseEntity<Object> handlePasswordTooShortException(PasswordTooShortException ex) {
        ApiError apiError = new ApiError(BAD_REQUEST);
        apiError.setMessage(ex.getMessage());
        return buildResponseEntity(apiError);
    }
    
    /**
     * Handles PasswordTooWeakException.
     *
     * @param ex the PasswordTooWeakException
     * @return the ApiError object
     */
    @ExceptionHandler(PasswordTooWeakException.class)
    protected ResponseEntity<Object> handlePasswordTooWeakException(PasswordTooWeakException ex) {
        ApiError apiError = new ApiError(BAD_REQUEST);
        apiError.setMessage(ex.getMessage());
        return buildResponseEntity(apiError);
    }
    
    /**
     * Handles UsernameTakenException.
     *
     * @param ex the UsernameTakenException
     * @return the ApiError object
     */
    @ExceptionHandler(UsernameTakenException.class)
    protected ResponseEntity<Object> handleUsernameTakenException(UsernameTakenException ex) {
        ApiError apiError = new ApiError(BAD_REQUEST);
        apiError.setMessage(ex.getMessage());
        return buildResponseEntity(apiError);
    }
    
    /**
     * Handles PhoneTakenException.
     *
     * @param ex the PhoneTakenException
     * @return the ApiError object
     */
    @ExceptionHandler(PhoneTakenException.class)
    protected ResponseEntity<Object> handlePhoneTakenException(PhoneTakenException ex) {
        ApiError apiError = new ApiError(BAD_REQUEST);
        apiError.setMessage(ex.getMessage());
        return buildResponseEntity(apiError);
    }
    
    /**
     * Handles InputEmptyException.
     *
     * @param ex the InputEmptyException
     * @return the ApiError object
     */
    @ExceptionHandler(InputEmptyException.class)
    protected ResponseEntity<Object> handleInputEmptyException(InputEmptyException ex) {
        ApiError apiError = new ApiError(BAD_REQUEST);
        apiError.setMessage(ex.getMessage());
        return buildResponseEntity(apiError);
    }
    
	private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}
