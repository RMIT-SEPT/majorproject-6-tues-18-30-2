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
		
		if ("".equals(user.getFirstName())) {
			throw new InputEmptyException("First Name");
		}
		
		if ("".equals(user.getLastName())) {
			throw new InputEmptyException("Last Name");
		}
		
		if ("".equals(user.getPassword())) {
			throw new InputEmptyException("Password");
		}
		
		if ("".equals(user.getPhone())) {
			throw new InputEmptyException("Phone");
		}
		
		if ("".equals(user.getPostcode())) {
			throw new InputEmptyException("Postcode");
		}
		
		if ("".equals(user.getStreetName())) {
			throw new InputEmptyException("Street Name");
		}
		
		if ("".equals(user.getStreetNo())) {
			throw new InputEmptyException("Street No");
		}
		
		if ("".equals(user.getUsername())) {
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
