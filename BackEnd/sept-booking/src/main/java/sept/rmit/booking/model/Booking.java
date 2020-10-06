package sept.rmit.booking.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;
import java.util.Objects;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customerId;
    private Date bookingDate;
    private Long workingDateId;
    private Long serviceId;
    private Long bookingStatusId;

    protected Booking() {}

    public Booking(String customerId, Date bookingDate, Long workingDateId, Long serviceId, Long bookingStatusId) {
        this.customerId = customerId;
        this.bookingDate = bookingDate;
        this.workingDateId = workingDateId;
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

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Long getWorkingDateId() {
        return workingDateId;
    }

    public void setWorkingDateId(Long workingDateId) {
        this.workingDateId = workingDateId;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public Long getBookingStatusId() {
        return bookingStatusId;
    }

    public void setBookingStatusId(Long bookingStatusId) {
        this.bookingStatusId = bookingStatusId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Booking booking = (Booking) o;
        return Objects.equals(id, booking.id) &&
                Objects.equals(customerId, booking.customerId) &&
                Objects.equals(bookingDate, booking.bookingDate) &&
                Objects.equals(workingDateId, booking.workingDateId) &&
                Objects.equals(serviceId, booking.serviceId) &&
                Objects.equals(bookingStatusId, booking.bookingStatusId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, customerId, bookingDate, workingDateId, serviceId, bookingStatusId);
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", customerId='" + customerId + '\'' +
                ", bookingDate=" + bookingDate +
                ", workingDateId=" + workingDateId +
                ", serviceId=" + serviceId +
                ", bookingStatusId=" + bookingStatusId +
                '}';
    }
}
