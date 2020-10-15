package sept.registration.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sept.registration.error.InputEmptyException;
import sept.registration.error.PasswordTooShortException;
import sept.registration.error.PasswordTooWeakException;
import sept.registration.error.PhoneTakenException;
import sept.registration.error.UsernameTakenException;
import sept.registration.model.Role;
import sept.registration.model.User;
import sept.registration.model.request.RegisterRequest;
import sept.registration.service.RoleService;
import sept.registration.service.UserService;
import sept.registration.util.SecurityUtil;

@RestController
public class RegisterController {

	private final static Logger LOGGER = LoggerFactory.getLogger(RegisterController.class);

	@Autowired
	private UserService userService;
	
	@Autowired
	private RoleService roleService;

	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody RegisterRequest request) throws PasswordTooShortException, PasswordTooWeakException, UsernameTakenException, PhoneTakenException, InputEmptyException {

		User user = request.toUser();
		
		// Change user password
		String plainPassword = user.getPassword();
		//String passwordHash = SecurityUtil.bcrypt(plainPassword);
		
		user.setPassword(plainPassword);
		
		// Set the user use "customer" role
		Role customerRole = roleService.findByName("customer").get();
		user.setRole(customerRole);

		return ResponseEntity.ok(userService.register(user));
		
	}
}
