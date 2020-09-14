import React, { Component } from 'react';
import User from "../../interfaces/user.interface";
import Booking from "../../interfaces/booking.interface";
import "../index.css";

export interface ComponentProps extends User, Booking {};

export const BookingInfo: React.FC<ComponentProps> = ({ userId, userType, bkId }) => {
    var bookingInfo = getBookingInfo();

      return(
          <div className="container">
              <table className='table'>
                  <tr>
                      <th>Booking Date: </th>
                      <td>{bookingInfo.bookingDate}</td>
                  </tr>

                  <tr>
                      <th>Booking Time: </th>
                      <td>{bookingInfo.bookingTime}</td>
                  </tr>

                  <tr>
                      <th>Employee: </th>
                      <td>{bookingInfo.employeeFirstName + ' '+ bookingInfo.employee.LastName}</td>
                  </tr>

                  <tr>
                      <th>Contact Phone Number</th>
                      <td>{bookingInfo.phone}</td>
                  </tr>

                  <tr>
                      <th>Notes</th>
                      <td>{bookingInfo.notes}</td>
                  </tr>
              </table>
          </div>
      );
}

const getBookingInfo = () => {
    //return JSON of all booking info from backend and store 
    var bookingList = {};
    return bookingList;
}

