package sept.login.model.request;

import com.fasterxml.jackson.annotation.JsonGetter;

public class LoginRequest {

	private String username;
	
	private String password;

	/**
	 * @return the username
	 */
	@JsonGetter("username")
	public String getUsername() {
		return username;
	}

	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @return the password
	 */
	@JsonGetter("password")
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
