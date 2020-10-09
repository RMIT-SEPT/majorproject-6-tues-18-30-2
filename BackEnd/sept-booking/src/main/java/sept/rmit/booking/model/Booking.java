package sept.rmit.booking.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;
import java.sql.Time;
import java.util.Objects;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customerId;
    private String employeeId;
    private Date bookingDate;
    private Time timeslot;
    private Long serviceId;
    private int bookingStatusId;

    protected Booking() {}

    public Booking(String customerId, String employeeId, Date bookingDate, Time timeslot, Long serviceId, int bookingStatusId) {
        this.customerId = customerId;
        this.employeeId = employeeId;
        this.bookingDate = bookingDate;
        this.timeslot = timeslot;
        this.serviceId = serviceId;
        this.bookingStatusId = bookingStatusId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Time getTimeslot() {
        return timeslot;
    }

    public void setTimeslot(Time timeslot) {
        this.timeslot = timeslot;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public int getBookingStatusId() {
        return bookingStatusId;
    }

    public void setBookingStatusId(int bookingStatusId) {
        this.bookingStatusId = bookingStatusId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Booking booking = (Booking) o;
        return bookingStatusId == booking.bookingStatusId &&
                Objects.equals(id, booking.id) &&
                Objects.equals(customerId, booking.customerId) &&
                Objects.equals(employeeId, booking.employeeId) &&
                Objects.equals(bookingDate, booking.bookingDate) &&
                Objects.equals(timeslot, booking.timeslot) &&
                Objects.equals(serviceId, booking.serviceId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, customerId, employeeId, bookingDate, timeslot, serviceId, bookingStatusId);
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", customerId='" + customerId + '\'' +
                ", employeeId='" + employeeId + '\'' +
                ", bookingDate=" + bookingDate +
                ", timeslot=" + timeslot +
                ", serviceId=" + serviceId +
                ", bookingStatusId=" + bookingStatusId +
                '}';
    }
}
