package com.shieldstack.api.auth;

import com.shieldstack.api.user.User;
import com.shieldstack.api.user.UserRepository;
import com.shieldstack.api.user.Role;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        // Collect role names as strings for the token (e.g., ["ADMIN", "USER"])
        List<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .map(Enum::name)
                .toList();

        String token = JwtUtil.generateToken(user.getEmail(), roleNames);
        return new LoginResponse(token);
    }
}
