package com.myapp.app.service;

import com.myapp.app.model.UserModel;
import com.myapp.app.repository.UserRepository;
import com.myapp.app.response.jwt.JwtResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${security.jwt.secret-key}")
    private String secretKey;
    @Value("${security.jwt.expiration-long}")
    private int expiration_long;
    @Value("${security.jwt.expiration-short}")
    private int expiration_short;
    @Autowired
    private UserRepository userRepository;

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public String extractIssuer(String token) {
        return extractClaim(token, Claims::getIssuer);
    }

    public Map<String, Object> getMapClaimsFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getBody();
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            UserModel userModel,
            long expiration
    ) {
        return Jwts
                .builder()
                .setIssuer(userModel.getProvider().toString())
                .setClaims(extraClaims)
                .setSubject(userModel.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateAccessToken(UserModel userModel) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("provider", userModel.getProvider());
        String token = buildToken(extraClaims, userModel, expiration_short);
        userModel.setAccessToken(token);
        userRepository.save(userModel);
        return token;
    }

    public String generateRefreshToken(UserModel userModel) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("provider", userModel.getProvider());
        String token = buildToken(extraClaims, userModel, expiration_long);
        userModel.setRefreshToken(token);
        userRepository.save(userModel);
        return token;
    }
    public JwtResponse generate(UserModel userModel){
        JwtResponse jwtResponse = new JwtResponse();
        jwtResponse.setAccess(generateAccessToken(userModel));
        jwtResponse.setRefresh(generateRefreshToken(userModel));
        return jwtResponse;
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

}
