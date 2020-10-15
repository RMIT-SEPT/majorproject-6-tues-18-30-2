package sept.rmit.dashboard.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sept.rmit.dashboard.model.Booking;
import sept.rmit.dashboard.repository.BookingRepository;

import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepo;

    public List<Booking> findBookingByCustomerAndStatus(String customerId, Integer bookingStatusId) {
        return bookingRepo.findBookingByCustomerAndStatus(customerId, bookingStatusId);
    }
}
