package sept.registration.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sept.registration.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

	public Optional<User> findByUsername(String username);
	
	public Optional<User> findByPhone(String phone);
	
}
