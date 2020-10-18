package sept.registration.test;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

import sept.registration.error.InputEmptyException;
import sept.registration.error.PasswordTooShortException;
import sept.registration.error.PasswordTooWeakException;
import sept.registration.error.PhoneTakenException;
import sept.registration.error.UsernameTakenException;
import sept.registration.model.Role;
import sept.registration.model.User;
import sept.registration.repository.RoleRepository;
import sept.registration.service.UserService;
import sept.registration.util.SecurityUtil;

@SpringBootTest
public class UserServiceTests extends AbstractTransactionalJUnit4SpringContextTests{

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private UserService userService;
	
	@BeforeEach
	public void prepare() {
		super.deleteFromTables("user");
	}

	// Password length must be greater than or equals to 6 char
	@Test
	public void testRegisterPasswordTooShort() {
		Optional<Role> customerRole = roleRepository.findByName("customer");
		Assertions.assertTrue(customerRole.isPresent());

		User user = new User();
		user.setUsername("johndoe@gmail.com");
		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword("Passw");
		user.setStreetName("Smith");
		user.setStreetNo("123");
		user.setPhone("65900100200");
		user.setPostcode("12345");
		user.setRole(customerRole.get());

		try {
			User registered = userService.register(user);
			Assertions.fail("Password too short");
		} catch (Exception e) {
			Assertions.assertTrue(e instanceof PasswordTooShortException);
		}
	}

	@Test
	public void testRegisterPasswordLengthSuccess() throws PasswordTooShortException, PasswordTooWeakException, UsernameTakenException, PhoneTakenException, InputEmptyException {
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
	}

	@Test
	public void testRegisterPasswordTooweak(){
		Optional<Role> customerRole = roleRepository.findByName("customer");
		Assertions.assertTrue(customerRole.isPresent());

		User user = new User();
		user.setUsername("johndoe@gmail.com");
		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword("password");
		user.setStreetName("Smith");
		user.setStreetNo("123");
		user.setPhone("65900100200");
		user.setPostcode("12345");
		user.setRole(customerRole.get());

		try {
			User registered = userService.register(user);
			Assertions.fail("Password too weak");
		} catch (Exception e) {
			Assertions.assertTrue(e instanceof PasswordTooWeakException);
		}
	}

	@Test
	public void testRegisterPasswordStrengthSuccess() throws PasswordTooShortException, PasswordTooWeakException, UsernameTakenException, PhoneTakenException, InputEmptyException {
		Optional<Role> customerRole = roleRepository.findByName("customer");
		Assertions.assertTrue(customerRole.isPresent());

		User user = new User();
		user.setUsername("johndoe@gmail.com");
		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword("Password");
		user.setStreetName("Smith");
		user.setStreetNo("123");
		user.setPhone("65900100200");
		user.setPostcode("12345");
		user.setRole(customerRole.get());

		User registered = userService.register(user);
		
		Assertions.assertNotNull(registered);

		Optional<User> found = userService.findByUsername("johndoe@gmail.com");
		User userFound = found.get();

		Assertions.assertEquals("John", userFound.getFirstName());
		Assertions.assertEquals("Doe", userFound.getLastName());
		Assertions.assertTrue(SecurityUtil.verify("Password", userFound.getPassword()));
		Assertions.assertEquals("Smith", userFound.getStreetName());
		Assertions.assertEquals("123", userFound.getStreetNo());
		Assertions.assertEquals("65900100200", userFound.getPhone());
		Assertions.assertEquals("12345", userFound.getPostcode());
		Assertions.assertEquals("customer", userFound.getRole().getName());
	}

	@Test
	public void testRegisterUsernameTaken() throws PasswordTooShortException, PasswordTooWeakException, UsernameTakenException, PhoneTakenException, InputEmptyException {
		// User 1
		Optional<Role> customerRole = roleRepository.findByName("customer");
		Assertions.assertTrue(customerRole.isPresent());

		User user = new User();
		user.setUsername("johndoe@gmail.com");
		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword("Password");
		user.setStreetName("Smith");
		user.setStreetNo("123");
		user.setPhone("65900100200");
		user.setPostcode("12345");
		user.setRole(customerRole.get());

		User registered = userService.register(user);
		
		Assertions.assertNotNull(registered);
		
		// User 2

		user = new User();
		user.setUsername("johndoe@gmail.com");
		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword("Password");
		user.setStreetName("Smith");
		user.setStreetNo("123");
		user.setPhone("65900100200");
		user.setPostcode("12345");
		user.setRole(customerRole.get());
		
		try {
			registered = userService.register(user);
			Assertions.fail("Username already taken, validation fail");
		} catch (Exception e) {
			Assertions.assertTrue(e instanceof UsernameTakenException);
		}
		
	}

	@Test
	public void testRegisterMobileTaken() throws PasswordTooShortException, PasswordTooWeakException, UsernameTakenException, PhoneTakenException, InputEmptyException {
		// User 1
				Optional<Role> customerRole = roleRepository.findByName("customer");
				Assertions.assertTrue(customerRole.isPresent());

				User user = new User();
				user.setUsername("johndoe@gmail.com");
				user.setFirstName("John");
				user.setLastName("Doe");
				user.setPassword("Password");
				user.setStreetName("Smith");
				user.setStreetNo("123");
				user.setPhone("65900100200");
				user.setPostcode("12345");
				user.setRole(customerRole.get());

				User registered = userService.register(user);
				
				Assertions.assertNotNull(registered);
				
				// User 2

				user = new User();
				user.setUsername("madmax@gmail.com");
				user.setFirstName("Mad");
				user.setLastName("Max");
				user.setPassword("Password");
				user.setStreetName("Smith");
				user.setStreetNo("123");
				user.setPhone("65900100200");
				user.setPostcode("12345");
				user.setRole(customerRole.get());
				
				try {
					registered = userService.register(user);
					Assertions.fail("Phone number already taken, validation fail");
				} catch (Exception e) {
					Assertions.assertTrue(e instanceof PhoneTakenException);
				}
	}

	@Test
	public void testInputEmpty() {
		Optional<Role> customerRole = roleRepository.findByName("customer");
		Assertions.assertTrue(customerRole.isPresent());

		User user = new User();
		user.setUsername("");
		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword("password");
		user.setStreetName("Smith");
		user.setStreetNo("123");
		user.setPhone("65900100200");
		user.setPostcode("12345");
		user.setRole(customerRole.get());

		try {
			User registered = userService.register(user);
			Assertions.fail("Username can't be empty");
		} catch (Exception e) {
			Assertions.assertTrue(e instanceof InputEmptyException);
			Assertions.assertEquals("Username is required", e.getMessage());
		}
		
		user = new User();
		user.setUsername("johndoe@gmail.com");
		user.setFirstName("");
		user.setLastName("Doe");
		user.setPassword("password");
		user.setStreetName("Smith");
		user.setStreetNo("123");
		user.setPhone("65900100200");
		user.setPostcode("12345");
		user.setRole(customerRole.get());

		try {
			User registered = userService.register(user);
			Assertions.fail("First Name can't be empty");
		} catch (Exception e) {
			Assertions.assertTrue(e instanceof InputEmptyException);
			Assertions.assertEquals("First Name is required", e.getMessage());
		}
		
		user = new User();
		user.setUsername("johndoe@gmail.com");
		user.setFirstName("John");
		user.setLastName("");
		user.setPassword("password");
		user.setStreetName("Smith");
		user.setStreetNo("123");
		user.setPhone("65900100200");
		user.setPostcode("12345");
		user.setRole(customerRole.get());

		try {
			User registered = userService.register(user);
			Assertions.fail("Last Name can't be empty");
		} catch (Exception e) {
			Assertions.assertTrue(e instanceof InputEmptyException);
			Assertions.assertEquals("Last Name is required", e.getMessage());
		}
		
		user = new User();
		user.setUsername("johndoe@gmail.com");
		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword("");
		user.setStreetName("Smith");
		user.setStreetNo("123");
		user.setPhone("65900100200");
		user.setPostcode("12345");
		user.setRole(customerRole.get());

		try {
			User registered = userService.register(user);
			Assertions.fail("Password can't be empty");
		} catch (Exception e) {
			Assertions.assertTrue(e instanceof InputEmptyException);
			Assertions.assertEquals("Password is required", e.getMessage());
		}
		
		user = new User();
		user.setUsername("johndoe@gmail.com");
		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword("password");
		user.setStreetName("");
		user.setStreetNo("123");
		user.setPhone("65900100200");
		user.setPostcode("12345");
		user.setRole(customerRole.get());

		try {
			User registered = userService.register(user);
			Assertions.fail("Street Name can't be empty");
		} catch (Exception e) {
			Assertions.assertTrue(e instanceof InputEmptyException);
			Assertions.assertEquals("Street Name is required", e.getMessage());
		}
		
		user = new User();
		user.setUsername("johndoe@gmail.com");
		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword("password");
		user.setStreetName("Smith");
		user.setStreetNo("");
		user.setPhone("65900100200");
		user.setPostcode("12345");
		user.setRole(customerRole.get());

		try {
			User registered = userService.register(user);
			Assertions.fail("Street No can't be empty");
		} catch (Exception e) {
			Assertions.assertTrue(e instanceof InputEmptyException);
			Assertions.assertEquals("Street No is required", e.getMessage());
		}
		
		user = new User();
		user.setUsername("johndoe@gmail.com");
		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword("password");
		user.setStreetName("Smith");
		user.setStreetNo("123");
		user.setPhone("");
		user.setPostcode("12345");
		user.setRole(customerRole.get());

		try {
			User registered = userService.register(user);
			Assertions.fail("First Name can't be empty");
		} catch (Exception e) {
			Assertions.assertTrue(e instanceof InputEmptyException);
			Assertions.assertEquals("Phone is required", e.getMessage());
		}
		
		user = new User();
		user.setUsername("johndoe@gmail.com");
		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword("password");
		user.setStreetName("Smith");
		user.setStreetNo("123");
		user.setPhone("65900100200");
		user.setPostcode("");
		user.setRole(customerRole.get());

		try {
			User registered = userService.register(user);
			Assertions.fail("Postcode can't be empty");
		} catch (Exception e) {
			Assertions.assertTrue(e instanceof InputEmptyException);
			Assertions.assertEquals("Postcode is required", e.getMessage());
		}
	}

	private User prepareUser() throws PasswordTooShortException, PasswordTooWeakException, UsernameTakenException, PhoneTakenException, InputEmptyException {
		Optional<Role> customerRole = roleRepository.findByName("customer");
		Assertions.assertTrue(customerRole.isPresent());

		User user = new User();
		user.setUsername("johndoe@gmail.com");
		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword("somePassword");
		user.setStreetName("Smith");
		user.setStreetNo("123");
		user.setPhone("65900100200");
		user.setPostcode("12345");
		user.setRole(customerRole.get());

		User registered = userService.register(user);
		return registered;
	}
}
