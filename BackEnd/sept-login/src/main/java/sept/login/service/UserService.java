package sept.login.service;

import java.util.Optional;

import sept.login.error.InvalidLoginException;
import sept.login.model.User;

public interface UserService {

	public User login(String username, String password) throws InvalidLoginException;
	
	public Optional<User> findByUsername(String username);
}
