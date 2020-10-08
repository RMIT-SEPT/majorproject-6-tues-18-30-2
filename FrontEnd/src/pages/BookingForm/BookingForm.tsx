import React, { useContext } from 'react';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import { UserContext } from '../../contexts';
import { SideBarLayout } from '../../layouts';
import moment from 'moment';

/*
Booking Form Component
*/
const { Option } = Select;

export const BookingForm: React.FC = () => {
  const [form] = Form.useForm();

  const onValidSubmission = values => {
    const UPCOMING_STATUS = 0;

    const newBooking = {
      customerId: values.username,
      bookingDate: values.booking_date.format('DD-MM-YYYY'),
      workingDateId: values.time,
      serviceId: values.service,
      bookingStatusId: UPCOMING_STATUS
    };

    console.log(newBooking);
  };

  return (
    <SideBarLayout>
      <Form
        form={form}
        name='add-booking'
        initialValues={{
          username: 'u1@gmail.com',
          time: 1,
          service: 1
        }}
        labelCol={{
          xs: { span: 24 },
          sm: { span: 6 }
        }}
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 16 }
        }}
        onFinish={onValidSubmission}
      >
        <Form.Item label='Username' name='username'>
          <Input style={{ width: 120 }} placeholder='u1@gmail.com' value='u1@gmail.com' disabled />
        </Form.Item>
        <Form.Item
          label='Booking Date'
          name='booking_date'
          rules={[{ required: true, message: 'Booking Date is Required!' }]}
        >
          <DatePicker
            format='DD-MM-YYYY'
            disabledDate={current => {
              return current && current < moment().endOf('day');
            }}
          />
        </Form.Item>
        <Form.Item label='Time' name='time'>
          <Select defaultValue={1} style={{ width: 120 }}>
            <Option value={1}>09:00AM</Option>
            <Option value={2}>10:00AM</Option>
            <Option value={3}>11:00AM</Option>
            <Option value={4}>12:00PM</Option>
            <Option value={5}>01:00PM</Option>
            <Option value={7}>02:00PM</Option>
            <Option value={8}>03:00PM</Option>
            <Option value={9}>04:00PM</Option>
          </Select>
        </Form.Item>
        <Form.Item label='Service' name='service'>
          <Select defaultValue={1} style={{ width: 120 }}>
            <Option value={1}>Mens Haircut</Option>
            <Option value={2}>Womens Haircut</Option>
            <Option value={3}>Child Haircut</Option>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{ xs: { span: 48 }, sm: { span: 22 } }}
          style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '0px' }}
        >
          <Button block type='primary' shape='round' size='large' htmlType='submit'>
            SUBMIT
          </Button>
        </Form.Item>
      </Form>
    </SideBarLayout>
  );
};
