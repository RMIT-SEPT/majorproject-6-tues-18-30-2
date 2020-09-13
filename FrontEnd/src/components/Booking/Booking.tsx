import React, { useState } from 'react';
import User from '../../interfaces/user.interface';
import ViewStatus from '../../interfaces/viewStatus.interface';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './Booking.style.css';

/**
 * Booking Properties
 */
export interface ComponentProps extends User, ViewStatus {}

/**
 * Booking Component
 */
export const Booking: React.FC<ComponentProps> = ({ userId, userType }) => {
  const [defaultView, setDefaultView] = useState(true);

  return (
    <div className='container'>
      <table className='table'>
        <thead>
          <tr>
            <th>
              <button type='button' className='btn btn-primary active' onClick={() => setDefaultView(true)}>
                Select by Available Date
              </button>
            </th>
            <th>
              <button type='button' className='btn btn-primary' onClick={() => setDefaultView(false)}>
                Select by available Employee
              </button>
            </th>
          </tr>
        </thead>
      </table>
      {renderView(defaultView)}
    </div>
  );
};

/**
 * Render the appropriate view based on user interaction.
 * @param defaultView Whether the default view is active.
 */
const renderView = (defaultView: boolean) => {
  if (defaultView) {
    let dates = getUnavailableDates();
    return (
      <div className='centre bm-4'>
        <DayPicker fromMonth={new Date()} />
      </div>
    );
  } else {
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
  }
};

/**
 * Provides a JSON of all employee slots from backend.
 */
const getUnavailableDates = (): Date[] => {
  var rawDates: string[];
  var unavailableDates: Date[];

  for (const dates in rawDates) {
    unavailableDates.push(new Date(dates));
  }

  return unavailableDates;
}
