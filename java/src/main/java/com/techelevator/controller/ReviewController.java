package com.techelevator.controller;

import com.techelevator.dao.ReviewDao;
import com.techelevator.model.Review;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@PreAuthorize("isAuthenticated()")
@RequestMapping(value = "/reviews")
public class ReviewController {

    private ReviewDao reviewDao;

    public ReviewController(ReviewDao reviewDao) {
        this.reviewDao = reviewDao;
    }

    //Get Requests
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Review> getAllReviews() {
        return reviewDao.getAllReviews();
    }

    @GetMapping(value = "/principal")
    @ResponseStatus(HttpStatus.OK)
    public List<Review> getCurrentUsersReviews(Principal principal) {
        return reviewDao.getReviewsOfCurrentUser(principal.getName());
    }
    //Post Requests
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createReview(@RequestBody Review review, Principal principal) {
        reviewDao.createReview(review, principal.getName());
    }
    //Put Requests
    //Delete Requests
}
