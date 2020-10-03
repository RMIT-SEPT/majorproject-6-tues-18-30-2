package sept.profile.controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@PutMapping("/profile")
	public ResponseEntity<User> putProfile(HttpServletRequest request, @RequestBody User updatedUser) {
		
//		System.out.println(updatedUser.getDepartment());
//		System.out.println(updatedUser.getCountry());
//		System.out.println(updatedUser.getOrganisation());
//		System.out.println(updatedUser.getFirstName());
//		System.out.println(updatedUser.getLastName());
		String username = (String) request.getAttribute("logged_user");

		Optional<User> user = userService.findByUsername(username);
		User aUser = user.get();
		aUser.setFirstName(updatedUser.getFirstName());
		aUser.setLastName(updatedUser.getLastName());
		aUser.setDepartment(updatedUser.getDepartment());
		aUser.setOrganisation(updatedUser.getOrganisation());
		aUser.setCountry(updatedUser.getCountry());
		
		aUser = userService.updateProfile(aUser);
		
		return ResponseEntity.ok(aUser);
	}
}
