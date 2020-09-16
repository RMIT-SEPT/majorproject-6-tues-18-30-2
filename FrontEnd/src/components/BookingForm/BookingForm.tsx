import React, { useState } from 'react';
import { useFormik } from 'formik';
import DayPicker from 'react-day-picker';
import BookingForm from '../../interfaces/bookingForm.interface';

export interface ComponentProps extends BookingForm {}

export const BookingForm: React.FC = () => {
  return (
    <form>
      <label htmlFor='firstName'>First Name </label>
      <input type='text' id='firstName' name='firstName'></input>

      <label htmlFor='lastName'> Last Name</label>
      <input type='text' id='lastName' name='lastName'></input>

      <label htmlFor='DOB'>Date of Birth</label>
      <DayPicker className='DOB' />

      <label htmlFor='contactNo'>Contact Phone Number</label>
      <input type='number' id='contactNo' name='contactNo'></input>

      <label htmlFor='email'>Email Address</label>
      <input type='email' id='email' name='email'></input>

      <label htmlFor='bkDate'>Booking Date</label>
      <DayPicker className='bkDate' fromMonth={new Date()} />

      <label htmlFor='timeSlot'>Time</label>
      <select name='timeSlot' id='timeSlot'>
        <option value={1}>9:00AM</option>
        <option value={2}>10:00AM</option>
        <option value={3}>11:00AM</option>
        <option value={4}>12:00PM</option>
        <option value={5}>1:00PM</option>
        <option value={6}>2:00PM</option>
        <option value={7}>3:00PM</option>
        <option value={8}>4:00PM</option>
      </select>

      <label htmlFor='notes'>Notes</label>
      <textarea name='notes'></textarea>

      <input type='submit' value='Submit' />
      <button id='cancel' name='cancel' onClick={() => (window.location.href = '/dashboard')}>
        Cancel
      </button>
    </form>
  );
};
