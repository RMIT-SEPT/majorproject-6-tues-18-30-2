package com.rmit.sept.microservice.dashboard.service;

import com.rmit.sept.microservice.dashboard.model.Booking;
import com.rmit.sept.microservice.dashboard.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepo;

    public List<Booking> findBookingByCustomerAndStatus(String customerId, Integer bookingStatusId){
        return bookingRepo.findBookingByCustomerAndStatus(customerId, bookingStatusId);
    }
}
