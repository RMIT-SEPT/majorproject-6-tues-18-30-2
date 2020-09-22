package com.rmit.sept.microservice.dashboard.repository;

import com.rmit.sept.microservice.dashboard.model.Booking;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Long> {
    //SQL Query that returns all bookings based on customer and completion status
    @Query(value="SELECT * FROM booking WHERE customer_id = ?1 AND booking_status_id = ?2", nativeQuery = true)
    List<Booking> findBookingByCustomerAndStatus(String customerId, Integer bookingStatusId);
}
