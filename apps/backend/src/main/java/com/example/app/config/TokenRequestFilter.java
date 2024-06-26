package com.example.app.config;


import com.example.app.common.Provider;
import com.example.app.model.UserModel;
import com.example.app.repository.UserRepository;
import com.example.app.service.TokenService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.Map;

@Component
public class TokenRequestFilter extends OncePerRequestFilter {
    @Autowired
    private TokenService tokenService;
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
            if (tokenService.extractUsername(tokenClient) == null) {
                System.out.println("TOKEN NULL");
                filterChain.doFilter(request, response);
                return;
            }
            String email = tokenService.extractUsername(tokenClient);
            Map<String, Object> map = tokenService.getMapClaimsFromToken(tokenClient);
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
//        } catch (ExpiredJwtException e) {
//            throw new CredentialsExpiredException("Expired jwt credentials");

        } catch (Exception ex) {
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