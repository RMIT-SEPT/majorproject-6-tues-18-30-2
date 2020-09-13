import React, { useState } from 'react';
import User from '../../interfaces/user.interface';
import ViewStatus from '../../interfaces/viewStatus.interface';

/**
 * Dashboard Properties
 */
export interface ComponentProps extends User, ViewStatus {}

/**
 * Dashboard Component
 */
export const Dashboard: React.FC<ComponentProps> = ({ userId, userType }) => {
  const [defaultView, setDefaultView] = useState(true);

  return userType === 3 ? (
    <div className='container'>
      <table className='table'>
        <thead>
          <tr>
            <th>
              <button type='button' className='btn btn-primary active' onClick={() => setDefaultView(true)}>
                Upcoming Bookings
              </button>
            </th>

            <th>
              <button type='button' className='btn btn-primary' onClick={() => setDefaultView(false)}>
                Completed Bookings
              </button>
            </th>
          </tr>
        </thead>
        {renderBookingRows(defaultView, userId)}
      </table>
    </div>
  ) : (
    <div className='container'>An unexpeced error has occured please refresh the page.</div>
  );
};

/**
 * Render the appropriate booking rows based on the user interaction.
 * @param defaultView Whether the default view is active.
 * @param id The users unique identifier.
 */
const renderBookingRows = (defaultView: boolean, id: string) => {
  if (defaultView) {
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
  } else {
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
  }
};
