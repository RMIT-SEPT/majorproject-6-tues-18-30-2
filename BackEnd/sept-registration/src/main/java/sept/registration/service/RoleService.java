package sept.registration.service;

import java.util.Optional;

import sept.registration.model.Role;

public interface RoleService {

	public Optional<Role> findByName(String name);
}
