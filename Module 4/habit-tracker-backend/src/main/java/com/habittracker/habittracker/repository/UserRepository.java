package com.habittracker.habittracker.repository;


import com.habittracker.habittracker.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    // Finds a user by their username (for login or fetching profile)
    Optional<User> findByUsername(String username);

    // --- THIS IS THE FIX ---
    // This method was missing. Your CustomUserDetailsService needs it
    // to allow users to log in with their email address.
    Optional<User> findByEmail(String email);

    // Checks if a username is already taken (for registration)
    Boolean existsByUsername(String username);

    // Checks if an email is already registered (for registration)
    Boolean existsByEmail(String email);
}
