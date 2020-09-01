import React, { Component } from 'react';
import User from '../interfaces/user.interface';

export interface DashboardStatus {
  defaultView: boolean;
}

class Dashboard extends Component<{ userId; userType }, User & DashboardStatus> {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      userType: props.userType,
      defaultView: true
    };
    this.upcomingView = this.upcomingView.bind(this);
    this.completedView = this.completedView.bind(this);
    this.getBookingRows = this.getBookingRows.bind(this);
  }

  upcomingView() {
    if (this.state.defaultView == false) {
      this.setState({ defaultView: true });
      this.forceUpdate();
    }
  }

  completedView() {
    if (this.state.defaultView == true) {
      this.setState({ defaultView: false });
      this.forceUpdate();
    }
  }

  getBookingRows(id: string) {
    if (this.state.defaultView == true) {
      return (
        <tbody>
          <tr>
            <td>Example Upcoming Booking</td>
            <td>
              <button type='button' className='btn btn-info'>
                Manage Booking
              </button>
            </td>
          </tr>
        </tbody>
      );
    } else if (this.state.defaultView == false) {
      return (
        <tbody>
          <tr>
            <td>Example Completed Booking</td>
            <td>
              <button type='button' className='btn btn-info'>
                View Booking Details
              </button>
            </td>
          </tr>
        </tbody>
      );
    } else {
      return <div className='container'> An unexpected error has occured please refresh the page.</div>;
    }
  }

  render() {
    if (this.state.userType == 3) {
      return (
        <div className='container'>
          <table className='table'>
            <thead>
              <tr>
                <th>
                  <button type='button' className='btn btn-primary active' onClick={this.upcomingView}>
                    Upcoming Bookings
                  </button>
                </th>

                <th>
                  <button type='button' className='btn btn-primary' onClick={this.completedView}>
                    Completed Bookings
                  </button>
                </th>
              </tr>
            </thead>

            {this.getBookingRows(this.props.userId)}
          </table>
        </div>
      );
    } else {
      return <div className='container'>An unexpeced error has occured please refresh the page.</div>;
    }
  }
}
export default Dashboard;
