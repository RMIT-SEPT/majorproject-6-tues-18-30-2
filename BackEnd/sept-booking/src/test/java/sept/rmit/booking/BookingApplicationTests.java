package sept.rmit.booking;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import sept.rmit.booking.model.Booking;
import sept.rmit.booking.service.BookingService;

import java.sql.Date;

import static org.junit.Assert.*;


@SpringBootTest
class BookingApplicationTests {
    @Autowired
    private BookingService service;

    private String mockUser = "test@gmail.com";
    private Date mockDate = Date.valueOf("2020-01-01");
    private Long mockLong = 1L;

    @DisplayName("Booking Creation")
    @Test
    void testCreationSuccess(){
        Booking mockBooking = new Booking(mockUser, mockDate, mockLong, mockLong, mockLong);
        Booking newBooking = service.create(mockUser, mockDate, mockLong, mockLong, mockLong);
        mockBooking.setId(newBooking.getId());

        assertEquals(mockBooking, newBooking);
    }

    @DisplayName("Booking Exist - True")
    @Test
    void testExistTrue(){
        service.create( mockUser, mockDate, mockLong, mockLong, mockLong);
        assertTrue(service.isExist(mockUser, mockLong));
    }

    @DisplayName("Booking Exist - False")
    @Test
    void testExistFalse(){
        String nonExistentUser = "dontexist@gmail.com";
        Long nonExistentWorkingDate = 2L;
        assertFalse(service.isExist(nonExistentUser, nonExistentWorkingDate));
    }

}
