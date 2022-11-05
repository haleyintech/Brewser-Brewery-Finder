package com.techelevator.model;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class Review {
    private Long reviewId;
    @NotNull
    private Long userId;
    @NotNull
    private Long beerId;
    @NotEmpty(message = "Please Provided a Description")
    private String description;
    @Max(value = 5)
    private int rating;
}
