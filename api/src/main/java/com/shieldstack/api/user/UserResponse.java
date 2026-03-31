package com.shieldstack.api.user;

public class UserResponse {
    private Long id;
    private String email;
    private String createdAt;

    public UserResponse(Long id, String email, String createdAt) {
        this.id = id;
        this.email = email;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getCreatedAt() {
        return createdAt;
    }
}
