package com.rmit.sept.microservice.dashboard.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
    private String customerId;
    private Date bookingDate;
    private Integer workingDateId;
    private Integer serviceId;
    private Integer bookingStatusId;

    protected Booking(){}

    public Booking(String customerId, Date bookingDate, Integer workingDateId, Integer serviceId, Integer bookingStatusId) {
        this.customerId = customerId;
        this.bookingDate = bookingDate;
        this.workingDateId = workingDateId;
        this.serviceId = serviceId;
        this.bookingStatusId = bookingStatusId;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Integer getWorkingDateId() {
        return workingDateId;
    }

    public void setWorkingDateId(Integer workingDateId) {
        this.workingDateId = workingDateId;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public Integer getBookingStatusId() {
        return bookingStatusId;
    }

    public void setBookingStatusId(Integer bookingStatusId) {
        this.bookingStatusId = bookingStatusId;
    }
}
