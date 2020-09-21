package sept.registration.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sept.registration.model.Role;
import sept.registration.repository.RoleRepository;
import sept.registration.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleRepository repository;

	@Override
	public Optional<Role> findByName(String name) {
		return repository.findByName(name);
	}

}
