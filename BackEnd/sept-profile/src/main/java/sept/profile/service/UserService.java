package sept.profile.service;

import java.util.Optional;

import sept.profile.model.User;

public interface UserService {

	public Optional<User> findByUsername(String username);
	public User updateProfile(User user);
}
