package sept.login.test;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

import sept.login.error.InvalidLoginException;
import sept.login.service.UserService;

@SpringBootTest
public class UserServiceTests extends AbstractTransactionalJUnit4SpringContextTests {

	@Autowired
	private UserService userService;

	@BeforeEach
	public void prepareData() {
		super.executeSqlScript("classpath:sept/login/test/data/init_data.sql", false);
	}

	@Test
	public void testLoginSuccess() throws InvalidLoginException {

		// Test login success
		String username = "johndoe@gmail.com";
		String password = "somePassword";

		userService.login(username, password);
	}

	@Test
	public void testLoginUsernameNotFound() {

		// Test login with username not found
		String username = "sally@gmail.com";
		String password = "somePassword";

		try {
			userService.login(username, password);
		} catch (Exception e) {
			Assertions.assertTrue(e instanceof InvalidLoginException);
			InvalidLoginException ex = (InvalidLoginException) e;
			Assertions.assertEquals("Username not found", ex.getMessage());
		}
	}

	@Test
	public void testLoginWrongPassword() {

		// Test login with wrong password
		String username = "johndoe@gmail.com";
		String password = "wrongPassword";

		try {
			userService.login(username, password);
		} catch (Exception e) {
			Assertions.assertTrue(e instanceof InvalidLoginException);
			InvalidLoginException ex = (InvalidLoginException) e;
			Assertions.assertEquals("Username and password did not match", ex.getMessage());
		}
	}
}
