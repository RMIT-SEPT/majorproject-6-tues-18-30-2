import axios from 'axios';

/**
 * POST booking
 * @param bookingDetails object containing booking details from form
 */

export const addBooking = bookingDetails => {
  return axios.post('http://k8s.sept.mladenov.me/api/booking', {
    customerId: bookingDetails.customerId,
    employeeId: bookingDetails.employeeId,
    bookingDate: bookingDetails.bookingDate,
    timeslot: bookingDetails.timeSlot,
    serviceId: bookingDetails.serviceId,
    bookingStatusId: bookingDetails.bookingStatusId
  });
};
