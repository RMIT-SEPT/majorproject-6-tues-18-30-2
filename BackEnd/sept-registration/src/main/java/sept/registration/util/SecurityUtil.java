package sept.registration.util;

import java.security.SecureRandom;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class SecurityUtil {

	public static String bcrypt(String plain) {
		int strength = 10; // work factor of bcrypt
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(strength, new SecureRandom());

		String encodedPassword = bCryptPasswordEncoder.encode(plain);
		return encodedPassword;
	}
	
	public static boolean verify(String plain, String hash) {
		int strength = 10; // work factor of bcrypt
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(strength, new SecureRandom());

		return bCryptPasswordEncoder.matches(plain, hash);
	}
}
