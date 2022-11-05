package com.techelevator.model;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class Review {
    private Long reviewId;
    private Long userId;
    private Long beerId;
    @NotEmpty(message = "Please Provided a Description.")
    private String description;
    @Max(value = 5)
    @Min(value = 1)
    @NotNull(message = "Please provide a rating of 1-5.")
    private int rating;

    public Review() {
    }

    public Review(Long reviewId, Long userId, Long beerId, String description, int rating) {
        this.reviewId = reviewId;
        this.userId = userId;
        this.beerId = beerId;
        this.description = description;
        this.rating = rating;
    }

    public Long getReviewId() {
        return reviewId;
    }

    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getBeerId() {
        return beerId;
    }

    public void setBeerId(Long beerId) {
        this.beerId = beerId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
