package sept.profile.controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sept.profile.model.User;
import sept.profile.service.UserService;

@RestController
@RequestMapping("/api")
public class ProfileController {

	@Autowired
	private UserService userService;

	@GetMapping("/profile")
	public ResponseEntity<User> getProfile(HttpServletRequest request) {
		
		String username = (String) request.getAttribute("logged_user");

		Optional<User> user = userService.findByUsername(username);

		return ResponseEntity.ok(user.get());
	}
}
