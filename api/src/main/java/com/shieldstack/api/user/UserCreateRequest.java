package com.shieldstack.api.user;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateRequest {
    private String email;
    private String password;

    // Optional: allow creating with roles. If null/empty, we’ll default to USER.
    private Set<RoleName> roles;
}
