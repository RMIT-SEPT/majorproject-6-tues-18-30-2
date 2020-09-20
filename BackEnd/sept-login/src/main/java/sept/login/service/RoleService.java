package sept.login.service;

import java.util.Optional;

import sept.login.model.Role;

public interface RoleService {

	public Optional<Role> findByName(String name);
}
