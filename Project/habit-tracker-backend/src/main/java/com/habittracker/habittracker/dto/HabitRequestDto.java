package com.habittracker.habittracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class HabitRequestDto {
    @NotBlank
    private String name;

    @Positive
    private int xp;
}