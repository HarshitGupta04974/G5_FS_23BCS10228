package com.habittracker.habittracker.services;

import com.habittracker.habittracker.model.Habit;
import com.habittracker.habittracker.model.User;
import com.habittracker.habittracker.repository.HabitRepository;
import com.habittracker.habittracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class HabitService {

    @Autowired
    private HabitRepository habitRepository;

    @Autowired
    private UserRepository userRepository;

    // Helper to get user by email (which is our new unique identifier)
    private User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .or(() -> userRepository.findByEmail(username)) // Also check email just in case
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }

    public List<Habit> getHabitsByUsername(String username) {
        User user = getUserByUsername(username);
        return habitRepository.findByUserId(user.getId());
    }

    public Habit createHabit(Habit habit, String username) {
        User user = getUserByUsername(username);

        // Use the constructor from the Habit model
        Habit newHabit = new Habit(user.getId(), habit.getName(), habit.getXpValue());
        newHabit.setFrequency(habit.getFrequency()); // Set frequency if provided

        return habitRepository.save(newHabit);
    }

    // Updated to include email for security check
    public Habit updateHabit(String id, Habit habitDetails, String username) {
        User user = getUserByUsername(username);
        Habit habit = habitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habit not found with id: " + id));

        // Security Check: Ensure the habit belongs to the logged-in user
        if (!habit.getUserId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized: You do not own this habit");
        }

        habit.setName(habitDetails.getName());
        habit.setFrequency(habitDetails.getFrequency());
        habit.setXpValue(habitDetails.getXpValue());

        return habitRepository.save(habit);
    }

    // Updated to include email for security check
    public void deleteHabit(String id, String username) {
        User user = getUserByUsername(username);
        Habit habit = habitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habit not found with id: " + id));

        // Security Check
        if (!habit.getUserId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized: You do not own this habit");
        }

        habitRepository.delete(habit);
    }


    public User completeHabit(String habitId, String username) {
        Habit habit = habitRepository.findById(habitId)
                .orElseThrow(() -> new RuntimeException("Habit not found"));

        User user = getUserByUsername(username);

        // Security Check
        if (!habit.getUserId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized: You do not own this habit");
        }

        LocalDate today = LocalDate.now();
        // NOTE: Make sure your Habit.java model has 'completionDates'
         Set<LocalDate> completionDates = habit.getCompletionDates() != null ? habit.getCompletionDates() : new HashSet<>();

         if (completionDates.contains(today)) {
             return user; // Already completed, no changes
         }

         completionDates.add(today);
         habit.setCompletionDates(completionDates);

        // --- Calculate Streak ---
        LocalDate yesterday = today.minusDays(1);
        if (habit.getLastCompletedDate() != null && habit.getLastCompletedDate().equals(yesterday)) {
            habit.setStreak(habit.getStreak() + 1);
        } else {
            habit.setStreak(1); // Reset or start streak
        }
        habit.setLastCompletedDate(today);

        // --- Calculate XP and Level ---
        long newXp = user.getXp() + habit.getXpValue(); // Use xpValue
        int oldLevel = user.getLevel();
        int newLevel = (int) (newXp / 100) + 1; // 100 XP per level

        user.setXp(newXp);
        user.setLevel(newLevel);

        // --- Handle Badges ---
        Set<String> badges = user.getBadges() != null ? user.getBadges() : new HashSet<>();
        if (newLevel > oldLevel) {
            badges.add("LEVEL_" + newLevel);
        }
        if (habit.getStreak() == 5 && !badges.contains("STREAK_5")) {
            badges.add("STREAK_5");
        }
        if (!badges.contains("FIRST_HABIT")) {
            badges.add("FIRST_HABIT");
        }
        user.setBadges(badges);

        // Save both updated documents
        habitRepository.save(habit);
        return userRepository.save(user);
    }
}