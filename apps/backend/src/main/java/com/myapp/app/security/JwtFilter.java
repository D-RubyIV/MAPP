package com.myapp.app.security;


import com.myapp.app.model.UserModel;
import com.myapp.app.repository.UserRepository;
import com.myapp.app.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.HashMap;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HandlerExceptionResolver handlerExceptionResolver;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String myAuthorization = request.getHeader("Authorization");
        if (!(myAuthorization != null && myAuthorization.startsWith("Bearer"))) {
            filterChain.doFilter(request, response);
            return;
        }
        String tokenClient = myAuthorization.split(" ")[1].trim();

        try {
            if (jwtService.extractUsername(tokenClient) == null) {
                filterChain.doFilter(request, response);
                return;
            }
            String email = jwtService.extractUsername(tokenClient);
            UserModel userModel = userRepository.findByEmail(email);
            if (userModel == null) {
                filterChain.doFilter(request, response);
                return;
            }
            String token = jwtService.generateAccessToken(new HashMap<>(),userModel);
            setAuthenticationContext(token, request);
            filterChain.doFilter(request, response);
        }
        catch (Exception ex){
            handlerExceptionResolver.resolveException(request, response, null, ex);
        }

    }

    private void setAuthenticationContext(String token, HttpServletRequest request) {
        String email = jwtService.extractUsername(token);
        UserDetails userDetails = userRepository.findByEmail(email);
        UsernamePasswordAuthenticationToken
                authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities());
        authentication.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
