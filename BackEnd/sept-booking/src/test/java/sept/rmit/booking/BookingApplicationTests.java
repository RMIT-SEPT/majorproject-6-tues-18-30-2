package sept.rmit.booking;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import sept.rmit.booking.model.Booking;
import sept.rmit.booking.repository.BookingRepository;
import sept.rmit.booking.service.BookingService;

import java.sql.Date;
import java.sql.Time;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
class BookingApplicationTests {
    @Autowired
    private BookingService service;

    @Autowired
    private BookingRepository repo;

    private final String mockUser = "test@gmail.com";
    private final String mockEmployee = "test1@gmail.com";
    private final Date mockDate = Date.valueOf("2020-01-01");
    private final Time mockTime = Time.valueOf("09:00:00");
    private final Long mockLong = 1L;
    private final int mockStatus = 1;

    private final String nonExistentUser = "dontexist@gmail.com";
    private final Date nonExistentDate = Date.valueOf("2020-01-02");
    private final Time nonExistentTime = Time.valueOf("10:00:00");

    @DisplayName("Booking Creation")
    @Test
    void testCreationSuccess() {
        Booking mockBooking = new Booking(mockUser, mockEmployee, mockDate, mockTime, mockLong, mockStatus);
        Booking newBooking = service.create(mockUser, mockEmployee, mockDate, mockTime, mockLong, mockStatus);
        mockBooking.setId(newBooking.getId());

        assertEquals(mockBooking, newBooking);

        repo.delete(mockBooking);
        repo.delete(newBooking);
    }

    @DisplayName("Booking Exist(True)")
    @Test
    void testExistTrue() {
        Booking mockBooking = service.create(mockUser, mockEmployee, mockDate, mockTime, mockLong, mockStatus);
        assertTrue(service.isExist(mockUser, mockEmployee, mockDate, mockTime));

        repo.delete(mockBooking);
    }

    @DisplayName("Booking Exist(False)")
    @Test
    void testExistFalse() {
        String nonExistentEmployee = "dontexistemp@gmail.com";
        assertFalse(service.isExist(nonExistentUser, nonExistentEmployee, nonExistentDate, nonExistentTime));
    }

    @DisplayName("Booking Exist(False) - Non-existent User")
    @Test
    void testExistFalseUser() {
        assertFalse(service.isExist(nonExistentUser, mockEmployee, mockDate, mockTime));
    }

    @DisplayName("Booking Exist(False) - Non-existent employee")
    @Test
    void testExistFalseEmployee() {
        assertFalse(service.isExist(mockUser, nonExistentUser, mockDate, mockTime));
    }

    @DisplayName("Booking Exist(False) - Non-existent date")
    @Test
    void testExistFalseDate() {
        assertFalse(service.isExist(mockUser, mockEmployee, nonExistentDate, mockTime));
    }

    @DisplayName("Booking Exist(False) - Non-existent time")
    @Test
    void testExistFalseTime() {
        assertFalse(service.isExist(mockUser, mockEmployee, mockDate, nonExistentTime));
    }

}
