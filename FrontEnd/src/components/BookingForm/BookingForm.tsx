import React, { useState } from 'react';
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik';
import DayPicker from 'react-day-picker';
import BookingForm from '../../interfaces/bookingForm.interface';

export interface FormProps extends BookingForm {}

export const BookingForm: React.FC = () => {
  const initialValues: FormProps = {
    firstName: '',
    lastName: '',
    DOB: new Date(),
    contactNo: null,
    email: '',
    bkDate: new Date(),
    timeSlot: null,
    notes: ''
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <label htmlFor='firstName'>First Name </label>
          <Field type='text' id='firstName' name='firstName'></Field>

          <label htmlFor='lastName'> Last Name</label>
          <Field type='text' id='lastName' name='lastName'></Field>

          <label htmlFor='DOB'>Date of Birth</label>
          <DayPicker className='DOB' />

          <label htmlFor='contactNo'>Contact Phone Number</label>
          <Field type='number' id='contactNo' name='contactNo'></Field>

          <label htmlFor='email'>Email Address</label>
          <Field type='email' id='email' name='email'></Field>

          <label htmlFor='bkDate'>Booking Date</label>
          <DayPicker className='bkDate' fromMonth={new Date()} />

          <label htmlFor='timeSlot'>Time</label>
          <Field as='select' name='timeSlot' id='timeSlot'>
            <option value={1}>9:00AM</option>
            <option value={2}>10:00AM</option>
            <option value={3}>11:00AM</option>
            <option value={4}>12:00PM</option>
            <option value={5}>1:00PM</option>
            <option value={6}>2:00PM</option>
            <option value={7}>3:00PM</option>
            <option value={8}>4:00PM</option>
          </Field>

          <label htmlFor='notes'>Notes</label>
          <Field as='textarea' name='notes'></Field>

          <input type='submit' value='Submit' />
          <button id='cancel' name='cancel' onClick={() => (window.location.href = '/dashboard')}>
            Cancel
          </button>
        </Form>
      </Formik>
    </div>
  );
};
