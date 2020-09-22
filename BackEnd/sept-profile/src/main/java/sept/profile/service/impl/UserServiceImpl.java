package sept.profile.service.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import sept.profile.model.User;
import sept.profile.repository.UserRepository;
import sept.profile.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;
	
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
		@Override
	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

}
