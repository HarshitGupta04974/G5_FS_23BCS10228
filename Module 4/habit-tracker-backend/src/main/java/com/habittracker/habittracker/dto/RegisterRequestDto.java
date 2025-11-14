package com.habittracker.habittracker.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Data Transfer Object for the registration request.
 * It defines the JSON body for the /api/auth/register endpoint.
 * Validation annotations (@NotBlank, @Size) ensure the data is correct.
 */
@Data
public class RegisterRequestDto {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
}
