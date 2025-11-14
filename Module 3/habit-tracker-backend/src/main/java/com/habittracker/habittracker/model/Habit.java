package com.habittracker.habittracker.model;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.UserDetails;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
@Data
@NoArgsConstructor
@Document(collection = "habits")
public class Habit {

    @Id
    private String id;
    private String userId; // Links the habit to a user
    private String name;
    private String frequency; // e.g., "DAILY", "WEEKLY"

    // Gamification fields
    private int streak = 0;
    private int xpValue = 10; // Default XP reward

    private LocalDate lastCompletedDate;
    private Set<LocalDate> completionDates = new HashSet<>();
    public Habit(String userId, String name, int xp) {
        this.userId = userId;
        this.name = name;
        this.xpValue = xp;
    }
}
