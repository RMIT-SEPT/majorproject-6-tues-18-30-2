package sept.rmit.booking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sept.rmit.booking.model.Booking;
import sept.rmit.booking.repository.BookingRepository;

import java.sql.Date;
import java.sql.Time;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepo;

    //Check for booking existence based on customerId and the working date
    public boolean isExist(String customerId, String employeeId, Date bookingDate, Time timeslot) {
        if (bookingRepo.isExist(customerId, employeeId, bookingDate, timeslot) == null) {
            return false;
        } else {
            return true;
        }
    }

    public Booking create(String customerId, String employeeId, Date bookingDate, Time timeslot, Long serviceId, int bookingStatusId) {
        return bookingRepo.save(new Booking(customerId, employeeId, bookingDate, timeslot, serviceId, bookingStatusId));
    }
}
