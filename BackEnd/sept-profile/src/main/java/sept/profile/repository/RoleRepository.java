package sept.profile.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sept.profile.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

	public Optional<Role> findByName(String name);
	
}
