package sept.login.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sept.login.config.JwtTokenUtil;
import sept.login.error.InvalidLoginException;
import sept.login.model.User;
import sept.login.model.request.LoginRequest;
import sept.login.model.response.LoginResponse;
import sept.login.service.UserService;

@RestController
public class LoginController {

	private final static Logger LOGGER = LoggerFactory.getLogger(LoginController.class);
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login (@RequestBody LoginRequest loginRequest) {
		
		String username = loginRequest.getUsername();
		String password = loginRequest.getPassword();
				
		User user = null;
		try {
			user = userService.login(username, password);
			
		} catch (InvalidLoginException e) {
			LOGGER.error(e.getMessage());
			
			LoginResponse response = new LoginResponse();
			response.setUsername(username);
			response.setAccessToken("");
			response.setMessage(e.getMessage());
			
			return ResponseEntity.badRequest().body(response);
		}
		
		String token = jwtTokenUtil.generateToken(user);
		
		LoginResponse response = new LoginResponse();
		response.setUsername(username);
		response.setAccessToken(token);
		
		return ResponseEntity.ok(response);
	}
}
