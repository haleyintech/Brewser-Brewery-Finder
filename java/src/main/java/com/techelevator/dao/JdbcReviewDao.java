package com.techelevator.dao;

import com.techelevator.model.Review;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JdbcReviewDao implements ReviewDao {

    private JdbcTemplate jdbcTemplate;

    public JdbcReviewDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Review> getAllReviews() {
        List<Review> reviews = new ArrayList<>();
        String sql = "SELECT * FROM reviews;";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql);
        while(rs.next()) {
            reviews.add(mapRowToReview(rs));
        }
        return reviews;
    }

    @Override
    public List<Review> getReviewsByBeerId(Long id) {
        List<Review> reviews = new ArrayList<>();
        String sql = "SELECT * FROM reviews WHERE beer_id = ?;";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql,id);
        while(rs.next()) {
            reviews.add(mapRowToReview(rs));
        }
        return reviews;
    }

    @Override
    public List<Review> getReviewsByUserId(Long id) {
        List<Review> reviews = new ArrayList<>();
        String sql = "SELECT * FROM reviews WHERE user_id = ?;";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql,id);
        while(rs.next()) {
            reviews.add(mapRowToReview(rs));
        }
        return reviews;
    }

    @Override
    public List<Review> getReviewsOfCurrentUser(String username) {
        List<Review> reviews = new ArrayList<>();
        String sql = "SELECT * FROM reviews JOIN users on users.user_id = reviews.user_id WHERE users.username = ?;";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql,username);
        while(rs.next()) {
            reviews.add(mapRowToReview(rs));
        }
        return reviews;
    }

    @Override
    public void createReview(Review review, String username) {
        String sql = "INSERT INTO reviews (user_id,beer_id,description,rating) VALUES ((SELECT user_id from users where username = ?),?,?,?);";
        jdbcTemplate.update(sql,username,review.getBeerId(),review.getDescription(),review.getRating());
    }

    @Override
    public void updateReview(Review review, Long id) {
        String sql = " UPDATE reviews SET description = ?, rating = ? WHERE review_id = ?;";
        jdbcTemplate.update(sql,review.getDescription(),review.getRating(),id);
    }

    @Override
    public void deleteReview(Long id) {
        String sql = "DELETE FROM reviews where review_id = ?;";
        jdbcTemplate.update(sql,id);
    }

    private Review mapRowToReview(SqlRowSet rs) {
        Review review = new Review();
        review.setReviewId(rs.getLong("review_id"));
        review.setUserId(rs.getLong("user_id"));
        review.setBeerId(rs.getLong("beer_id"));
        review.setDescription(rs.getString("description"));
        review.setRating(rs.getInt("rating"));
        return review;
    }
}
