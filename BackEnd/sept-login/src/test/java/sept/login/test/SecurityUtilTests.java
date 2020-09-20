package sept.login.test;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import sept.login.util.SecurityUtil;

public class SecurityUtilTests {

	@Test
	public void testBcrypt() {
		
		String hashed = SecurityUtil.bcrypt("123456");
		
		// Test verify bcrypt
		Assertions.assertTrue(SecurityUtil.verify("123456", hashed));
	}
}
