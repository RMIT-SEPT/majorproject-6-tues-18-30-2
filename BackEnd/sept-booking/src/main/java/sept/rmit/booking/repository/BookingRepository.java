package sept.rmit.booking.repository;

import org.apache.catalina.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sept.rmit.booking.model.Booking;

import java.sql.Date;
import java.sql.Time;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Long> {
    @Query(value = "SELECT * FROM booking WHERE customer_id = ?1 AND employee_id = ?2 AND booking_date = ?3 AND timeslot = ?4", nativeQuery = true)
    Booking isExist(String customerId, String employeeId, Date bookingDate, Time timeslot );
}
