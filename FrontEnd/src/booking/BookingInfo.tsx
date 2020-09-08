import React, { Component } from 'react';
import User from '../interfaces/user.interface';
import Booking from "../interfaces/booking.interface";
import "../index.css";

class BookingInfo extends Component<{ userId; userType, bkId }, User & Booking> {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      userType: props.userType,
      bkId: props.bkId
    };
    this.getBookingInfo = this.getBookingInfo.bind(this);
  }

  getBookingInfo(){
    //return JSON of all booking info from backend
  }

  render(){
      return(
          <div className="container">
              <table className='table'>
                  <tr>
                      <th>Booking Date: </th>
                      <td>xx/xx/xx</td>
                  </tr>

                  <tr>
                      <th>Booking Time: </th>
                      <td>xx:xx xx</td>
                  </tr>

                  <tr>
                      <th>Employee: </th>
                      <td> xxxxx xxxx</td>
                  </tr>

                  <tr>
                      <th>Contact Phone Number</th>
                      <td>xxxx xxx xxx</td>
                  </tr>

                  <tr>
                      <th>Notes</th>
                      <td>xxxxxxx</td>
                  </tr>
              </table>
          </div>
      )
  }
}
export default BookingInfo;
