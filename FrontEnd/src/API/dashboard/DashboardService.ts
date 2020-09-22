import axios from "axios";

export const getUpcomingBookings = (customerId :string) => {
    return axios.get("http://localhost:8090/api/dashboard/upcoming-bookings", {params: {
        "customerId": customerId
    }});
}

export const getCompletedBookings = (customerId :string) => {
    return axios.get("http://localhost:8090/api/dashboard/completed-bookings", {params: {
        "customerId": customerId
    }});
}
