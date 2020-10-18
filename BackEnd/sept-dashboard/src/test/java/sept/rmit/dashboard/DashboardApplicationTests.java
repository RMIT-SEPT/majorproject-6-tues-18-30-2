package sept.rmit.dashboard;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import sept.rmit.dashboard.model.Booking;
import sept.rmit.dashboard.repository.BookingRepository;
import sept.rmit.dashboard.service.BookingService;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class DashboardApplicationTests {
    @Autowired
    BookingService service;
    @Autowired
    BookingRepository repo;

    private final String mockUser = "test@gmail.com";
    private final String mockEmployee = "test1@gmail.com";
    private final Date mockDate = Date.valueOf("2020-01-01");
    private final Time mockTime = Time.valueOf("09:00:00");
    private final Long mockLong = 1L;
    private final int mockStatus = 1;

    private final Booking mockBooking = new Booking(mockEmployee, mockUser, mockDate, mockTime, mockLong, mockStatus);

    @DisplayName("Booking Search Test")
    @Test
    void bookingSearchSuccess(){
        repo.save(mockBooking);
        Booking returnedBooking = service.findBookingByCustomerAndStatus(mockBooking.getCustomerId(), mockBooking.getBookingStatusId()).get(0);

        assertEquals(mockBooking,returnedBooking);
        repo.delete(mockBooking);
    }

    @DisplayName("Booking Search Test - No Entries")
    @Test
    void bookingSearchNoEntries(){
        List<Booking> returnedBooking = service.findBookingByCustomerAndStatus(mockBooking.getCustomerId(), mockBooking.getBookingStatusId());
        List<Booking> emptyList = new ArrayList<Booking>();
        assertEquals(emptyList, returnedBooking);
    }
}
