package com.myapp.app.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myapp.app.enums.Provider;
import com.myapp.app.model.UserModel;
import com.myapp.app.response.jwt.JwtResponse;
import com.myapp.app.response.oauth.*;
import com.myapp.app.service.JwtService;
import com.myapp.app.service.OauthService;
import org.apache.coyote.BadRequestException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@CrossOrigin("*")
@RequestMapping("/api/oauth")
@RestController
public class OauthController {
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private OauthService oauthService;
    // GOOGLE
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String client_id_google;
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String client_secret_google;
    // GITHUB
    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String client_id_github;
    @Value("${spring.security.oauth2.client.registration.github.client-secret}")
    private String client_secret_github;
    // FACEBOOK
    @Value("${spring.security.oauth2.client.registration.facebook.client-id}")
    private String client_id_facebook;
    @Value("${spring.security.oauth2.client.registration.facebook.client-secret}")
    private String client_secret_facebook;
    // REDIRECT
    @Value("${spring.security.oauth2.client.registration.redirect_uri}")
    private String redirect_uri = "";
    @Autowired
    private JwtService jwtService;


    @GetMapping("google")
    public ResponseEntity<?> google(@RequestParam("code") String code) throws IOException, InterruptedException {
        String urlFormatted = String.format("https://oauth2.googleapis.com/token?client_id=%s&client_secret=%s&code=%s&grant_type=authorization_code&redirect_uri=%s", client_id_google, client_secret_google, code, redirect_uri);
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(urlFormatted))
                .POST(HttpRequest.BodyPublishers.noBody())
                .headers("Accept", "application/json")
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() == 200){
            GoogleTokenResponse googleTokenResponse = objectMapper.readValue(response.body(), GoogleTokenResponse.class);
            // GET INFO FROM TOKEN
            HttpRequest requestInfo = HttpRequest.newBuilder()
                    .uri(URI.create("https://oauth2.googleapis.com/tokeninfo"))
                    .GET()
                    .setHeader("Accept", "application/json")
                    .setHeader("Authorization", String.format("Bearer %s", googleTokenResponse.getAccess_token()))
                    .build();
            HttpResponse<String> responseInfo = client.send(requestInfo, HttpResponse.BodyHandlers.ofString());
            // MAP OBJECT
            GoogleProfileResponse googleProfileResponse = objectMapper.readValue(responseInfo.body(), GoogleProfileResponse.class);
            UserModel userModel = oauthService.authenticate(googleProfileResponse.getEmail(), Provider.GOOGLE);
            JwtResponse jwtResponse = jwtService.generate(userModel);
            return ResponseEntity.ok().body(jwtResponse);
        }
        else {
            throw new  BadRequestException("OAuth2.0 token not valid");
        }
    }


    @GetMapping("github")
    public ResponseEntity<?> github(@RequestParam("code") String code) throws IOException, InterruptedException {
        String urlFormatted = String.format("https://github.com/login/oauth/access_token?client_id=%s&client_secret=%s&code=%s&redirect_uri=%s", client_id_github, client_secret_github, code, redirect_uri);
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(urlFormatted))
                .POST(HttpRequest.BodyPublishers.noBody())
                .headers("Accept", "application/json")
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() == 200){
            GithubTokenResponse githubTokenResponse = objectMapper.readValue(response.body(), GithubTokenResponse.class);
            // GET INFO FROM TOKEN
            HttpRequest requestInfo = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.github.com/user"))
                    .GET()
                    .setHeader("Accept", "application/json")
                    .setHeader("Authorization", String.format("Bearer %s", githubTokenResponse.getAccess_token()))
                    .build();
            HttpResponse<String> responseInfo = client.send(requestInfo, HttpResponse.BodyHandlers.ofString());
            // MAP OBJECT
            GithubProfileResponse githubProfileResponse = objectMapper.readValue(responseInfo.body(), GithubProfileResponse.class);

            UserModel userModel = oauthService.authenticate(githubProfileResponse.getLogin(), Provider.GITHUB);
            JwtResponse jwtResponse = jwtService.generate(userModel);
            return ResponseEntity.ok().body(jwtResponse);

        }
        else {
            throw new  BadRequestException("OAuth2.0 token not valid");
        }
    }

    @GetMapping("facebook")
    public ResponseEntity<?> facebook(@RequestParam("code") String code) throws IOException, InterruptedException {
        String urlFormatted = String.format("https://graph.facebook.com/v19.0/oauth/access_token?client_id=%s&client_secret=%s&code=%s&redirect_uri=%s", client_id_facebook, client_secret_facebook, code, redirect_uri);
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(urlFormatted))
                .POST(HttpRequest.BodyPublishers.noBody())
                .headers("Accept", "application/json")
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() == 200){
            FacebookTokenResponse facebookTokenResponse = objectMapper.readValue(response.body(), FacebookTokenResponse.class);
            // GET INFO FROM TOKEN
            HttpRequest requestInfo = HttpRequest.newBuilder()
                    .uri(URI.create(String.format("https://graph.facebook.com/debug_token?input_token=%s&access_token=%s", facebookTokenResponse.getAccess_token(), facebookTokenResponse.getAccess_token())))
                    .GET()
                    .setHeader("Accept", "application/json")
                    .setHeader("Authorization", String.format("Bearer %s", facebookTokenResponse.getAccess_token()))
                    .build();
            HttpResponse<String> responseInfo = client.send(requestInfo, HttpResponse.BodyHandlers.ofString());
            JSONObject jsonObject = new JSONObject(responseInfo.body());
            // MAP OBJECT
            FacebookProfileResponse facebookProfileResponse = objectMapper.readValue(jsonObject.getJSONObject("data").toString(), FacebookProfileResponse.class);

            UserModel userModel = oauthService.authenticate(facebookProfileResponse.getUser_id(), Provider.FACEBOOK);
            JwtResponse jwtResponse = jwtService.generate(userModel);
            return ResponseEntity.ok().body(jwtResponse);
        }
        else {
            throw new  BadRequestException("OAuth2.0 token not valid");
        }
    }

}

