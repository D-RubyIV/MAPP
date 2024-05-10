package com.myapp.app.security;


import com.myapp.app.enums.Provider;
import com.myapp.app.model.UserModel;
import com.myapp.app.repository.UserRepository;
import com.myapp.app.service.JwtService;
import io.jsonwebtoken.Claims;
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
import java.util.Map;

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
            System.out.println("NOT HAVE AUTHORIZATION");
            filterChain.doFilter(request, response);
            return;
        }
        String tokenClient = myAuthorization.split(" ")[1].trim();

        try {
            if (jwtService.extractUsername(tokenClient) == null) {
                System.out.println("TOKEN NULL");
                filterChain.doFilter(request, response);
                return;
            }
            String email = jwtService.extractUsername(tokenClient);
            Map<String, Object> map = jwtService.getMapClaimsFromToken(tokenClient);
            String providerString = (String) map.get("provider");
            Provider provider = Provider.valueOf(providerString);
            System.out.println("PROVIDER: " + provider.toString());
            UserModel userModel = userRepository.findByEmailAndProvider(email, provider);
            System.out.println(userModel);
            if (userModel == null) {
                System.out.println("USER NOT FOUND");
                filterChain.doFilter(request, response);
                return;
            }
            setAuthenticationContext(userModel, request);
            filterChain.doFilter(request, response);
        }
        catch (Exception ex){
            handlerExceptionResolver.resolveException(request, response, null, ex);
        }

    }

    private void setAuthenticationContext(UserDetails userDetails, HttpServletRequest request) {
        System.out.println("USER DETAIL");
        System.out.println(userDetails);
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
