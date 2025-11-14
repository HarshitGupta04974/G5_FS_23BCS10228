package com.habittracker.habittracker.services;
import com.habittracker.habittracker.dto.AuthResponseDto;
import com.habittracker.habittracker.dto.LoginRequestDto;
import com.habittracker.habittracker.dto.RegisterRequestDto;
import com.habittracker.habittracker.model.User;
import com.habittracker.habittracker.repository.UserRepository;
import com.habittracker.habittracker.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Set;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider tokenProvider;

    public AuthResponseDto login(LoginRequestDto loginRequest) {
                Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );


        SecurityContextHolder.getContext().setAuthentication(authentication);


        String jwt = tokenProvider.generateToken(authentication);


        User user = (User) authentication.getPrincipal();


        return new AuthResponseDto(jwt, user);
    }

    public User register(RegisterRequestDto registerRequest) {

        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }


        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }


        User user = new User(
                registerRequest.getUsername(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword()) // Hash the password
        );


        return userRepository.save(user);
    }
}