package com.techelevator.model;

import javax.validation.constraints.NotNull;

public class Brewery {
    private Long breweryId;
    @NotNull
    private String name;
    @NotNull
    private String history;
    @NotNull
    private String address;
    @NotNull
    private String phone;
    @NotNull
    private String email;
    @NotNull
    private String imgUrl;
    @NotNull
    private String hours;
    @NotNull
    private boolean isPetFriendly;

    public Brewery() {

    }

    public Brewery(Long breweryId, String name, String history, String address, String phone, String email, String imgUrl, String hours, boolean isPetFriendly) {
        this.breweryId = breweryId;
        this.name = name;
        this.history = history;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.imgUrl = imgUrl;
        this.hours = hours;
        this.isPetFriendly = isPetFriendly;
    }

    public Long getBreweryId() {
        return breweryId;
    }

    public void setBreweryId(Long breweryId) {
        this.breweryId = breweryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getHours() {
        return hours;
    }

    public void setHours(String hours) {
        this.hours = hours;
    }

    public boolean isPetFriendly() {
        return isPetFriendly;
    }

    public void setPetFriendly(boolean petFriendly) {
        isPetFriendly = petFriendly;
    }
}
