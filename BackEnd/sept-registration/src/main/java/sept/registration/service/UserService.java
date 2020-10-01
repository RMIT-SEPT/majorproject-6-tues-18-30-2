package sept.registration.service;

import java.util.Optional;

import sept.registration.error.InputEmptyException;
import sept.registration.error.PasswordTooShortException;
import sept.registration.error.PasswordTooWeakException;
import sept.registration.error.PhoneTakenException;
import sept.registration.error.UsernameTakenException;
import sept.registration.model.User;

public interface UserService {

	public User register(User user) throws PasswordTooShortException, PasswordTooWeakException, UsernameTakenException, PhoneTakenException, InputEmptyException;

	public Optional<User> findByUsername(String username);
	
	public Optional<User> findByPhone(String phone);
}
