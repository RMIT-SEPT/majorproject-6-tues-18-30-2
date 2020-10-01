package sept.registration.service.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import sept.registration.error.InputEmptyException;
import sept.registration.error.PasswordTooShortException;
import sept.registration.error.PasswordTooWeakException;
import sept.registration.error.PhoneTakenException;
import sept.registration.error.UsernameTakenException;
import sept.registration.model.User;
import sept.registration.repository.UserRepository;
import sept.registration.service.UserService;
import sept.registration.util.SecurityUtil;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;
	
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public User register(User user) throws PasswordTooShortException, PasswordTooWeakException, UsernameTakenException, PhoneTakenException, InputEmptyException{
		// TODO Validation goes here
		
		if (user.getFirstName().isBlank()) {
			throw new InputEmptyException("First Name");
		}
		
		if (user.getLastName().isBlank()) {
			throw new InputEmptyException("Last Name");
		}
		
		if (user.getPassword().isBlank()) {
			throw new InputEmptyException("Password");
		}
		
		if (user.getPhone().isBlank()) {
			throw new InputEmptyException("Phone");
		}
		
		if (user.getPostcode().isBlank()) {
			throw new InputEmptyException("Postcode");
		}
		
		if (user.getStreetName().isBlank()) {
			throw new InputEmptyException("Street Name");
		}
		
		if (user.getStreetNo().isBlank()) {
			throw new InputEmptyException("Street No");
		}
		
		if (user.getUsername().isBlank()) {
			throw new InputEmptyException("Username");
		}
		
		if (user.getPassword().length() < 6) {
			throw new PasswordTooShortException();
		}
		
		if (SecurityUtil.isWeak(user.getPassword())) {
			throw new PasswordTooWeakException();
		}
		
		if (isUsernameExists(user.getUsername())) {
			throw new UsernameTakenException();
		}
		
		if (isPhoneExists(user.getPhone())) {
			throw new PhoneTakenException();
		}
		
		user.setPassword(SecurityUtil.bcrypt(user.getPassword()));
		return userRepository.save(user);
	}

	@Override
	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	
	@Override
	public Optional<User> findByPhone(String phone) {
		return userRepository.findByPhone(phone);
	}
	
	private boolean isUsernameExists(String username) {
		Optional<User> user = this.userRepository.findByUsername(username);
		
		return user.isPresent();
	}
	
	private boolean isPhoneExists(String phone) {
		Optional<User> user = this.userRepository.findByPhone(phone);
		
		return user.isPresent();
	}

}
