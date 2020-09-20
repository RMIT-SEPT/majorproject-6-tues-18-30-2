package sept.registration.model.request;

import com.fasterxml.jackson.annotation.JsonGetter;

import sept.registration.model.User;

public class RegisterRequest {

	private String username;
	
	private String firstName;
	
	private String lastName;
	
	private String password;
	
	private String streetNo;
	
	private String streetName;
	
	private String postcode;
	
	private String phone;

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
	 * @return the firstName
	 */
	@JsonGetter("first_name")
	public String getFirstName() {
		return firstName;
	}

	/**
	 * @param firstName the firstName to set
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	/**
	 * @return the lastName
	 */
	@JsonGetter("last_name")
	public String getLastName() {
		return lastName;
	}

	/**
	 * @param lastName the lastName to set
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
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

	/**
	 * @return the streetNo
	 */
	@JsonGetter("street_no")
	public String getStreetNo() {
		return streetNo;
	}

	/**
	 * @param streetNo the streetNo to set
	 */
	public void setStreetNo(String streetNo) {
		this.streetNo = streetNo;
	}

	/**
	 * @return the streetName
	 */
	@JsonGetter("street_name")
	public String getStreetName() {
		return streetName;
	}

	/**
	 * @param streetName the streetName to set
	 */
	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}

	/**
	 * @return the postcode
	 */
	@JsonGetter("postcode")
	public String getPostcode() {
		return postcode;
	}

	/**
	 * @param postcode the postcode to set
	 */
	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	/**
	 * @return the phone
	 */
	@JsonGetter("phone")
	public String getPhone() {
		return phone;
	}

	/**
	 * @param phone the phone to set
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public User toUser() {
		User user = new User();
		user.setFirstName(firstName);
		user.setLastName(lastName);
		user.setUsername(username);
		user.setPassword(password);
		user.setPhone(phone);
		user.setPostcode(postcode);
		user.setStreetName(streetName);
		user.setStreetNo(streetNo);
		return user;
	}
}
