package sept.login.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sept.login.model.Role;
import sept.login.repository.RoleRepository;
import sept.login.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleRepository repository;

	@Override
	public Optional<Role> findByName(String name) {
		return repository.findByName(name);
	}

}
