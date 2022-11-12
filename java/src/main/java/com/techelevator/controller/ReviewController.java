package com.techelevator.controller;

import com.techelevator.dao.ReviewDao;
import com.techelevator.model.Review;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@PreAuthorize("isAuthenticated()")
@CrossOrigin
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

    @GetMapping(value = "/beer/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<Review> getReviewsByBeerId(@PathVariable Long id) {
        return reviewDao.getReviewsByBeerId(id);
    }

    @GetMapping(value = "/beer/{id}/average-rating")
    @ResponseStatus(HttpStatus.OK)
    public double getAverageRatingOfBeer(@PathVariable Long id) {
        return reviewDao.getAverageRatingOfBeer(id);
    }

    @GetMapping(value = "users/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<Review> getReviewsByUserId(Long id) {
        return reviewDao.getReviewsByUserId(id);
    }

    @GetMapping(value = "/principal")
    @ResponseStatus(HttpStatus.OK)
    public List<Review> getCurrentUsersReviews(Principal principal) {
        return reviewDao.getReviewsOfCurrentUser(principal.getName());
    }


    //Post Requests
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createReview(@RequestBody @Valid Review review, Principal principal) {
        reviewDao.createReview(review, principal.getName());
    }
    //Put Requests

    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateReview(@RequestBody @Valid Review review, @PathVariable Long id) {
        reviewDao.updateReview(review,id);
    }
    //Delete Requests
    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteReview(@PathVariable Long id) {
        reviewDao.deleteReview(id);
    }
}
