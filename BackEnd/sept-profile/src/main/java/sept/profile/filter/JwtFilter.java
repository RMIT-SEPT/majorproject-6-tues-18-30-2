package sept.profile.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import sept.profile.config.JwtTokenUtil;

@Component
@Order(1)
public class JwtFilter implements Filter {

	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;
		String jwtToken = this.resolveToken(httpServletRequest);
		if (StringUtils.hasText(jwtToken)) {
			
			try {
				
				String username = jwtTokenUtil.getUsernameFromToken(jwtToken);
				
				if(!jwtTokenUtil.validateToken(jwtToken, username)) {
					// Error forbidden
					httpServletResponse.sendError(403);
					return;
				} else {
					// Success
					httpServletRequest.setAttribute("logged_user", username);
				}
				
			}catch(Exception ex) {
				// Error forbidden
				httpServletResponse.sendError(403);
				return;
			}
			
		} else {
			// Error forbidden
			System.out.println(httpServletRequest.getMethod());
			System.out.println(httpServletRequest.getRequestURI());
			if(!httpServletRequest.getMethod().equals("OPTIONS")) {
				httpServletResponse.sendError(403);
				return;
			}
		}

		chain.doFilter(request, response);
	}

	private String resolveToken(HttpServletRequest request) {

		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			String jwt = bearerToken.substring(7, bearerToken.length());
			return jwt;
		}
		return null;
	}
}
