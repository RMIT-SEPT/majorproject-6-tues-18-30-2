package sept.rmit.booking.repository;

import org.apache.catalina.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sept.rmit.booking.model.Booking;

import java.sql.Time;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Long> {
    @Query(value = "SELECT * FROM booking WHERE customer_id = ?1 AND employee_id = ?2 AND timeslot = ?3", nativeQuery = true)
    Booking isExist(String customerId, String employeeId, Time timeslot );
}
