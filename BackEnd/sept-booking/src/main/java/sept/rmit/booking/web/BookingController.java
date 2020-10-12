package sept.rmit.booking.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sept.rmit.booking.model.Booking;
import sept.rmit.booking.service.BookingService;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin(origins = "http://localhost:9000")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("add")
    public @ResponseBody String addBooking(@RequestBody Booking booking){
        boolean isExist = bookingService.isExist(booking.getCustomerId(), booking.getEmployeeId(), booking.getBookingDate(), booking.getTimeslot());

        if(isExist == false){
            bookingService.create(booking.getCustomerId(), booking.getEmployeeId(), booking.getBookingDate(), booking.getTimeslot(), booking.getServiceId(), booking.getBookingStatusId());
            return "New Booking Added";
        }else{
            return "Duplicate Entry";
        }
    }

}
