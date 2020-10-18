package sept.registration.test;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import sept.registration.util.SecurityUtil;

public class SecurityUtilTests {

	@Test
	public void testBcrypt() {
		
		String hashed = SecurityUtil.bcrypt("123456");
		
		// Test verify bcrypt
		Assertions.assertTrue(SecurityUtil.verify("123456", hashed));
	}
	
	@Test
	public void testIsWeak() {
		
		Assertions.assertTrue(SecurityUtil.isWeak("123456"));
		Assertions.assertTrue(SecurityUtil.isWeak("a23456"));
		Assertions.assertTrue(SecurityUtil.isWeak("A23456"));
		Assertions.assertTrue(SecurityUtil.isWeak("AAAAAA"));
		Assertions.assertTrue(SecurityUtil.isWeak("aaaaaa"));
		Assertions.assertTrue(!SecurityUtil.isWeak("aaaaaA"));
	}
}
