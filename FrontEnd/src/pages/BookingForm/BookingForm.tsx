import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Layout, Row, DatePicker } from 'antd';
import moment from 'moment';
import BookingForm from '../../interfaces/bookingForm.interface';
import 'antd/dist/antd.css';

/*
Form Properties
*/
export interface FormProps extends BookingForm {}

/*
Destructuring Layout from antd
*/
const { Content } = Layout;

/*
Booking Form Component
*/
export const BookingForm: React.FC = () => {
  const initialValues: FormProps = {
    firstName: '',
    lastName: '',
    DOB: new Date(),
    contactNo: null,
    email: '',
    employeeName: '',
    bkDate: new Date(),
    timeSlot: null,
    notes: ''
  };

  return (
    <Layout>
      <Content>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
            actions.setSubmitting(false);
          }}
        >
          <Form>
            <Row justify='center' align='middle'>
              <label htmlFor='firstName'>First Name </label>
            </Row>
            <Row justify='center' align='middle'>
              <Field type='text' id='firstName' name='firstName'></Field>
            </Row>
            <Row justify='center' align='middle'>
              <label htmlFor='lastName'> Last Name</label>
            </Row>
            <Row justify='center' align='middle'>
              <Field type='text' id='lastName' name='lastName'></Field>
            </Row>
            <Row justify='center' align='middle'>
              <label htmlFor='DOB'>Date of Birth</label>
            </Row>
            <Row justify='center' align='middle'>
              <DatePicker
                id='DOB'
                name='DOB'
                format={'DD-MM-YYYY'}
                disabledDate={current => {
                  return current && current > moment().endOf('day');
                }}
              />
            </Row>
            <Row justify='center' align='middle'>
              <label htmlFor='contactNo'>Contact Phone Number</label>
            </Row>
            <Row justify='center' align='middle'>
              <Field type='tel' id='contactNo' name='contactNo'></Field>
            </Row>
            <Row justify='center' align='middle'>
              <label htmlFor='email'>Email Address</label>
            </Row>
            <Row justify='center' align='middle'>
              <Field type='email' id='email' name='email'></Field>
            </Row>
            <Row justify='center' align='middle'>
              <label htmlFor='employeeName'> Employee Name</label>
            </Row>
            >
            <Row justify='center' align='middle'>
              <Field as='select' name='employeeName' id='employeeName'>
                <option value={'Employee A'}>Employee A</option>
                <option value={'Employee A'}>Employee B</option>
                <option value={'Employee A'}>Employee C</option>
              </Field>
            </Row>
            <Row justify='center' align='middle'>
              <label htmlFor='bkDate'>Booking Date</label>
            </Row>
            <Row justify='center' align='middle'>
              <DatePicker
                id='bkDate'
                name='bkDate'
                format={'DD-MM-YYYY'}
                disabledDate={current => {
                  return current && current < moment().endOf('day');
                }}
              />
            </Row>
            <Row justify='center' align='middle'>
              <label htmlFor='timeSlot'>Time</label>
            </Row>
            <Row justify='center' align='middle'>
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
            </Row>
            <Row justify='center' align='middle'>
              <label htmlFor='notes'>Notes</label>
            </Row>
            <Row justify='center' align='middle'>
              <Field as='textarea' name='notes'></Field>
            </Row>
            <Row justify='center' align='middle' gutter={[4, 4]}>
              <input type='submit' value='Submit' />
              <button id='cancel' name='cancel' onClick={() => (window.location.href = '/dashboard')}>
                Cancel
              </button>
            </Row>
          </Form>
        </Formik>
      </Content>
    </Layout>
  );
};
