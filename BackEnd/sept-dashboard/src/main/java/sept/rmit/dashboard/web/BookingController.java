package sept.rmit.dashboard.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sept.rmit.dashboard.model.Booking;
import sept.rmit.dashboard.service.BookingService;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:8080")
public class BookingController {
    private static final Integer UPCOMING_STATUS = 1;
    private static final Integer COMPLETE_STATUS = 2;

    @Autowired
    private BookingService bookingService;

    @GetMapping("/upcoming-bookings")
    @ResponseBody
    public List<Booking> getUpcomingBookings(@RequestParam String customerId) {
        return bookingService.findBookingByCustomerAndStatus(customerId, UPCOMING_STATUS);
    }

    @GetMapping("/completed-bookings")
    @ResponseBody
    public List<Booking> getCompletedBookings(@RequestParam String customerId) {
        return bookingService.findBookingByCustomerAndStatus(customerId, COMPLETE_STATUS);
    }


}