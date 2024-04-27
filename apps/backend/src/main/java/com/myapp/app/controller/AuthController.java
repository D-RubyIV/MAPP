package com.myapp.app.controller;

import com.myapp.app.dto.SigninUserDto;
import com.myapp.app.dto.SignupUserDto;
import com.myapp.app.model.UserModel;
import com.myapp.app.repository.UserRepository;
import com.myapp.app.service.AuthService;
import com.myapp.app.service.JwtService;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/auth")
public class AuthController {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthService authService;


    @PostMapping("/signup")
    private ResponseEntity<?> handleSignup(@Valid @RequestBody SignupUserDto signupUserDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (userRepository.findByEmail(signupUserDto.getEmail()) != null) {
            throw new BadRequestException("Email is used");
        }
        UserModel userModel = authService.register(signupUserDto);
        // Do something with the signupUserDto
        return ResponseEntity.status(HttpStatus.OK).body(userModel); // For example, return OK if successful
    }

    @PostMapping("/login")
    private ResponseEntity<?> handleSigin(@Valid @RequestBody SigninUserDto signinUserDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        UserModel userModel = userRepository.findByEmail(signinUserDto.getEmail());
        if (userModel == null){
            throw new BadRequestException("User not found");
        }
        else {
            if (new BCryptPasswordEncoder().matches(signinUserDto.getPassword(), userModel.getPassword())){
                if (!userModel.isEnabled()){
                    throw new BadRequestException("Account not active");
                }
                else{
                    HashMap<String, String> map = new HashMap<>();
                    String accessToken = jwtService.generateAccessToken(new HashMap<>(), userModel);
                    String refreshToken = jwtService.generateRefreshToken(new HashMap<>(), userModel);
                    map.put("access", accessToken);
                    map.put("refresh", refreshToken);
                    return ResponseEntity.ok().body(map);
                }
            }
            else {
                throw new BadRequestException("Email or password not correct");
            }
        }
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> handleRefresh() throws Exception{

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null){
                Object currentUser = authentication.getPrincipal();
                Map<String, String> map = new HashMap<>();
                UserModel model = (UserModel) currentUser;
                String access = jwtService.generateAccessToken(new HashMap<>(), model);
                map.put("access", access);
                return ResponseEntity.ok(map);
            }
            else {
                throw new BadRequestException("Not allow access");
            }
    }

    @ResponseBody
    @GetMapping("/active/{code}")
    public ResponseEntity<?> activeAccount(@PathVariable String code){
        String message = String.format("Active successfully with code: %s", code);
        UserModel userModel = userRepository.findByVerificationCode(code);
        userModel.setEnabled(true);
        userRepository.save(userModel);
        return ResponseEntity.ok().body(message);

    }
    @GetMapping("/me")
    public ResponseEntity<?> handleAuth(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object currentUser = authentication.getPrincipal();
        return ResponseEntity.ok(currentUser);
    }

}
