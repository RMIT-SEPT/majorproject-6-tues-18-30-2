package sept.login.service.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import sept.login.error.InvalidLoginException;
import sept.login.model.User;
import sept.login.repository.UserRepository;
import sept.login.service.UserService;
import sept.login.util.SecurityUtil;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;
	
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public User login(String username, String password) throws InvalidLoginException {
		
		// Find user by username
		Optional<User> user = userRepository.findByUsername(username);
		
		if(!user.isPresent()) {
			throw new InvalidLoginException("Username not found");
		}
		
		// Username found, check with password
		// Note password is stored with bcrypt in the database
		
		String plainPassword = password;
		String passwordHash = user.get().getPassword();
		
		if(!SecurityUtil.verify(plainPassword, passwordHash)) {
			throw new InvalidLoginException("Username and password did not match");
		}
		
		return user.get();
	}

	@Override
	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

}
