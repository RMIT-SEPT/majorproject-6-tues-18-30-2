import axios from "axios";

class DashboardService{
    getUpcomingBookings(customerId: string){
        return axios.get("http://localhost:8090/api/dashboard/upcoming-bookings", {params: {"customerId": customerId }});
    }

    getCompletedBookings(customerId: string){
        return axios.get("http://localhost:8090/api/dashboard/completed-bookings", {params: {"customerId": customerId }});
    }
}

export default new DashboardService();