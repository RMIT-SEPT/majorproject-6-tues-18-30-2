package sept.rmit.booking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sept.rmit.booking.model.Booking;
import sept.rmit.booking.repository.BookingRepository;

import java.sql.Date;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepo;

    //Check for booking existence based on customerId and the working date
//    public boolean isExist(String customerId, Long workingDateId) {
//        if (bookingRepo.isExist(customerId, workingDateId) == null) {
//            return false;
//        } else {
//            return true;
//        }
//    }
//
//    public Booking create(String customerId, Date bookingDate, Long workingDateId, Long serviceId, Long bookingStatusId) {
//        return bookingRepo.save(new Booking(customerId, bookingDate, workingDateId, serviceId, bookingStatusId));
//    }
}
