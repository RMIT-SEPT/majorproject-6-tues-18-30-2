package sept.registration.test;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import sept.registration.model.Role;
import sept.registration.model.User;
import sept.registration.repository.RoleRepository;
import sept.registration.service.UserService;
import sept.registration.util.SecurityUtil;

@SpringBootTest
public class UserServiceTests {

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private UserService userService;

	@Test
	public void testRegisterSuccess() {

		User registered = this.prepareUser();

		Assertions.assertNotNull(registered);

		Optional<User> found = userService.findByUsername("johndoe@gmail.com");
		User userFound = found.get();

		Assertions.assertEquals("John", userFound.getFirstName());
		Assertions.assertEquals("Doe", userFound.getLastName());
		Assertions.assertTrue(SecurityUtil.verify("somePassword", userFound.getPassword()));
		Assertions.assertEquals("Smith", userFound.getStreetName());
		Assertions.assertEquals("123", userFound.getStreetNo());
		Assertions.assertEquals("65900100200", userFound.getPhone());
		Assertions.assertEquals("12345", userFound.getPostcode());
		Assertions.assertEquals("customer", userFound.getRole().getName());
		System.out.println(userFound.getPassword());
	}

	private User prepareUser() {
		Optional<Role> customerRole = roleRepository.findByName("customer");
		Assertions.assertTrue(customerRole.isPresent());

		User user = new User();
		user.setUsername("johndoe@gmail.com");
		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword(SecurityUtil.bcrypt("somePassword"));
		user.setStreetName("Smith");
		user.setStreetNo("123");
		user.setPhone("65900100200");
		user.setPostcode("12345");
		user.setRole(customerRole.get());

		User registered = userService.register(user);
		return registered;
	}
}
