package com.habittracker.habittracker.dto;
import com.habittracker.habittracker.model.User;
import lombok.Data;
import java.util.Set;

/**
 * Data Transfer Object for the authentication response.
 * This is the JSON object the server sends back to the React app
 * after a successful login. It includes the token and user data.
 */
@Data
public class AuthResponseDto {
    private String accessToken;
    private String tokenType = "Bearer";
    private UserData user; // Send user data back to the frontend

    public AuthResponseDto(String accessToken, User user) {
        this.accessToken = accessToken;
        this.user = new UserData(user);
    }

    /**
     * Inner class to safely send only the user data we need.
     * This prevents sensitive data (like the hashed password) from
     * ever being sent to the frontend.
     */
    @Data
    class UserData {
        private String id;
        private String username;
        private String email;
        private long xp;
        private int level;
        private Set<String> badges;
        private String imageUrl;

        UserData(User user) {
            this.id = user.getId();
            this.username = user.getUsername();
            this.email = user.getEmail();
            this.xp = user.getXp();
            this.level = user.getLevel();
            this.badges = user.getBadges();
            this.imageUrl = user.getImageUrl();

        }
    }
}