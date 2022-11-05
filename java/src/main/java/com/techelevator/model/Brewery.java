package com.techelevator.model;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class Brewery {
    private Long breweryId;
    @NotEmpty(message = "Please provide a name for the brewery.")
    private String name;
    @NotEmpty(message = "Please provide a brief history.")
    private String history;
    @NotEmpty(message = "Please provide an address. ")
    private String address;
    @NotEmpty(message = "Please provide a phone number.")
    @Size(min = 10, max = 0, message = "Only include the 10 digits for the number.")
    private String phone;
    @NotEmpty(message = "Please provide an email address.")
    private String email;
    @NotEmpty(message = "Please provide an image url.")
    private String imgUrl;
    @NotEmpty(message = "Please provide the working hours of the brewery.")
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
