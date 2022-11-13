package com.techelevator.dao;

import com.techelevator.model.Review;

import java.util.List;

public interface ReviewDao {
    //Get Methods
    List<Review> getAllReviews();
    List<Review> getReviewsByBeerId(Long id);
    List<Review> getReviewsByUserId(Long id);
    List<Review> getReviewsOfCurrentUser(String username);
    //Post Methods
    void createReview(Review review, String username);
    //Put Methods
    void updateReview(Review review, Long id);
    //Delete Methods
    void deleteReview(Long id);

    double getAverageRatingOfBeer(Long id);
}
