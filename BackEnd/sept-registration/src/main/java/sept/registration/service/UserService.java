package sept.registration.service;

import java.util.Optional;

import sept.registration.model.User;

public interface UserService {

	public User register(User user);

	public Optional<User> findByUsername(String username);
}
