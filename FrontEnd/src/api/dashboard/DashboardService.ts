import axios from 'axios';

/**
 * GET Upcoming Bookings
 * @param customerId the customer to retrieve bookings for.
 */
export const getUpcomingBookings = (customerId :string) => {
  return axios.get("http://13.211.197.4/api/dashboard/upcoming-bookings", {
    params: {
      "customerId": customerId
    }
  });
};

/**
 * GET Completed Bookings
 * @param customerId the customer to retrieve bookings for.
 */
export const getCompletedBookings = (customerId :string) => {
  return axios.get("http://13.211.197.4/api/dashboard/completed-bookings", {
    params: {
      "customerId": customerId
    }
  });
};