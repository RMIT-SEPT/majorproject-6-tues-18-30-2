import React, { Component } from "react";

interface UserType{
    userType: number
}

class Dashboard extends Component<{}, UserType> {
    constructor(props) {
        super(props);
        this.state = {
            userType: 3
        };
    }

    render() {
        if (this.state.userType == 3) {
            return (
                <div className="container">
                    <table className="table table-hover">
                        <th>
                            <td><button type="button" className="btn btn-default"> Upcoming Bookings </button></td>
                            <td><button type="button" className="btn btn-default"> Completed Bookings </button></td>
                        </th>
                        <tr>
                            <td>Example Booking</td>
                            <td><button type="button" className="btn btn-info">Manage Booking</button></td>
                        </tr>
                    </table>
                </div>

            );
        }
        else{
            return(
                <div className="center">
                    error
                </div>
            )
        }
    }
}
export default Dashboard;