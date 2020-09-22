package com.rmit.sept.dashboard.service;

import com.rmit.sept.dashboard.model.Booking;
import com.rmit.sept.dashboard.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepo;

    public List<Booking> findBookingByCustomerAndStatus(String customerId, Integer bookingStatusId) {
        return bookingRepo.findBookingByCustomerAndStatus(customerId, bookingStatusId);
    }
}