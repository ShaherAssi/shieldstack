package com.shieldstack.api.user;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserController(UserRepository userRepo, RoleRepository roleRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
    }

    @GetMapping
    public List<UserResponse> getAll() {
        return userRepo.findAll().stream()
                .map(u -> new UserResponse(
                        u.getId(),
                        u.getEmail(),
                        u.getCreatedAt() == null ? null : u.getCreatedAt().toString()
                ))
                .toList();
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserCreateRequest req) {
        User user = new User();
        user.setEmail(req.getEmail());
        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));

        // Resolve roles (default to USER)
        
        Set<RoleName> requested = (req.getRoles() == null || req.getRoles().isEmpty())
                ? Set.of(RoleName.USER)
                : req.getRoles();

        // Look up Role entities by name (in DemoOrg or any org row with that name).
        // We don't know org at signup, so pick any role with that name; typically you'll have 1 per org.
        Set<Role> roles = requested.stream()
            .map(name -> roleRepo.findByName(name)
                .orElseThrow(() -> new IllegalStateException("Role not found in DB: " + name)))
            .collect(Collectors.toSet());

        user.setRoles(roles);

        try {
            User saved = userRepo.save(user);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new UserResponse(
                            saved.getId(),
                            saved.getEmail(),
                            saved.getCreatedAt() == null ? null : saved.getCreatedAt().toString()
                    ));
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("❌ Email already registered: " + req.getEmail());
        }
    }
}
