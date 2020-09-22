import axios from "axios";

//GET request for Upcoming Bookings based on given customerId
export const getUpcomingBookings = (customerId :string) => {
    return axios.get("http://localhost:8090/api/dashboard/upcoming-bookings", {params: {
        "customerId": customerId
    }});
}

//GET request for Completed Bookings based on given customerId
export const getCompletedBookings = (customerId :string) => {
    return axios.get("http://localhost:8090/api/dashboard/completed-bookings", {params: {
        "customerId": customerId
    }});
}
