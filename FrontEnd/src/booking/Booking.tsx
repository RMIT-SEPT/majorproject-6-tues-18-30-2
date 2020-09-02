import React, { Component } from 'react';
import User from '../interfaces/user.interface';
import viewStatus from '../interfaces/viewStatus.interface';
//https://www.npmjs.com/package/react-day-picker
import DayPicker from "react-day-picker";

import "react-day-picker/lib/style.css";
import "../index.css";

class Booking extends Component<{ userId; userType }, User & viewStatus> {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      userType: props.userType,
      defaultView: true
    };
    this.calendarView = this.calendarView.bind(this);
    this.employeeView = this.employeeView.bind(this);
    this.getView = this.getView.bind(this);
  }

  calendarView() {
    if (this.state.defaultView == false) {
      this.setState({ defaultView: true });
      this.forceUpdate();
    }
  }

  employeeView() {
    if (this.state.defaultView == true) {
      this.setState({ defaultView: false });
      this.forceUpdate();
    }
  }

  getUnavailableDates(){
    //return JSON of all employee slots from backend
    var rawDates: string[];
    var unavailableDates: Date[];

    for(const dates in rawDates){
      unavailableDates.push(new Date(dates));
    }

    return unavailableDates;

  }

  getView() {
    if (this.state.defaultView == true) {
      return (
        <div className="centre bm-4">
          <DayPicker fromMonth={new Date()}/>
        </div>
      );
    } else if (this.state.defaultView == false) {
      return (
        <table>
          <tbody>
            <tr>
              <td>Example Employee Profile</td>
              <td>
                <button type='button' className='btn btn-info'>
                  View Employee Info
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return <div className='container'> An unexpected error has occured please refresh the page.</div>;
    }
  }

  render() {
    return (
      <div className='container'>
        <table className='table'>
          <thead>
            <tr>
              <th>
                <button type='button' className='btn btn-primary active' onClick={this.calendarView}>
                  Select by Available Date
                </button>
              </th>

              <th>
                <button type='button' className='btn btn-primary' onClick={this.employeeView}>
                  Select by available Employee
                </button>
              </th>
            </tr>
          </thead>
          </table>
          {this.getView()}
      </div>
    );
  }
}
export default Booking;
