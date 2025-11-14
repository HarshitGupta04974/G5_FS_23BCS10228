package com.habittracker.habittracker.model;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@Document(collection = "users")
public class User implements UserDetails { // Implement the interface

    @Id
    private String id;

    @Indexed(unique = true)
    private String username;

    @Indexed(unique = true)
    private String email;

    private String password; // Hashed password

    private Set<String> roles = new HashSet<>();

    // Gamification fields
    private long xp = 0;
    private int level = 1;
    private Set<String> badges = new HashSet<>();
    private String imageUrl; // We can still keep this

    // Constructor for new user registration
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password; // The raw password (will be hashed by AuthService)
        this.roles.add("ROLE_USER");
        this.level = 1;
        this.xp = 0;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Converts our Set<String> roles into Spring Security's format
        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }
}