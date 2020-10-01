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
	
	public static boolean isWeak(String password) {
		boolean hasLowercase = false;
		boolean hasUppercase = false;
		for (int i=0; i < password.length(); i++) {
			char c = password.charAt(i);
			if (c >= 'a' && c <= 'z') {
				hasLowercase = true;
			}
			else if (c >= 'A' && c <= 'Z') {
				hasUppercase = true;
			}
		}
		return !(hasLowercase && hasUppercase);
	}
}
