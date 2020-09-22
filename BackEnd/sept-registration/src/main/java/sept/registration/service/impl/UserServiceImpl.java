package sept.registration.service.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import sept.registration.model.User;
import sept.registration.repository.UserRepository;
import sept.registration.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;
	
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public User register(User user) {
		// TODO Validation goes here
		
		return userRepository.save(user);
	}

	@Override
	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

}
