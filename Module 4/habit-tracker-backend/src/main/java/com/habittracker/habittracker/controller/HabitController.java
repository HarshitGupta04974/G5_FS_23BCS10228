package com.habittracker.habittracker.controller;
import com.habittracker.habittracker.model.Habit;
import com.habittracker.habittracker.model.User;
import com.habittracker.habittracker.services.HabitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * This controller handles all API requests for habits (create, read, update, delete).
 * It is secured and can only be accessed by authenticated users.
 */
@RestController
@RequestMapping("/api/habits") // This path is secured by SecurityConfig
public class HabitController {

    @Autowired
    private HabitService habitService;

    /**
     * Helper method to get the username from the authenticated principal.
     */
    private String getUsernameFromPrincipal(UserDetails principal) {
        if (principal == null) {
            // This should not happen if SecurityConfig is set up correctly
            throw new IllegalStateException("User not authenticated");
        }
        return principal.getUsername();
    }

    /**
     * API endpoint to get all habits for the logged-in user.
     * GET /api/habits
     */
    @GetMapping
    public List<Habit> getAllHabits(@AuthenticationPrincipal UserDetails principal) {
        String username = getUsernameFromPrincipal(principal);
        return habitService.getHabitsByUsername(username);
    }

    /**
     * API endpoint to create a new habit.
     * POST /api/habits
     */
    @PostMapping
    public Habit createHabit(@RequestBody Habit habit, @AuthenticationPrincipal UserDetails principal) {
        String username = getUsernameFromPrincipal(principal);
        // Note: We pass the full habit object, but the service will only use
        // the fields it needs (name, xp, frequency) to create a new one.
        return habitService.createHabit(habit, username);
    }

    /**
     * API endpoint to update an existing habit.
     * PUT /api/habits/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Habit> updateHabit(@PathVariable String id, @RequestBody Habit habitDetails, @AuthenticationPrincipal UserDetails principal) {
        String username = getUsernameFromPrincipal(principal);
        Habit updatedHabit = habitService.updateHabit(id, habitDetails, username);
        return ResponseEntity.ok(updatedHabit);
    }

    /**
     * API endpoint to delete a habit.
     * DELETE /api/habits/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHabit(@PathVariable String id, @AuthenticationPrincipal UserDetails principal) {
        String username = getUsernameFromPrincipal(principal);
        habitService.deleteHabit(id, username);
        return ResponseEntity.noContent().build(); // Standard 204 No Content response
    }

    /**
     * API endpoint to mark a habit as complete for the day.
     * POST /api/habits/{id}/complete
     */
    @PostMapping("/{id}/complete")
    public ResponseEntity<User> completeHabit(@PathVariable String id, @AuthenticationPrincipal UserDetails principal) {
        String username = getUsernameFromPrincipal(principal);
        User updatedUser = habitService.completeHabit(id, username);
        return ResponseEntity.ok(updatedUser);
    }
}