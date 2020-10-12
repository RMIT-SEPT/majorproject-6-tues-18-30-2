import React, { useContext } from 'react';
import { Form, Input, Select, Button, DatePicker, TimePicker } from 'antd';
import { UserContext } from '../../contexts';
import { SideBarLayout } from '../../layouts';
import { addBooking } from "../../api/booking";
import moment from 'moment';

/*
Booking Form Component
*/
const { Option } = Select;

export const BookingForm: React.FC = () => {
  const [form] = Form.useForm();
  const closingHours = () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 17, 18, 19, 20, 21, 22, 23, 24];

  const onValidSubmission = values => {
    const UPCOMING_STATUS = 0;

    const newBooking = {
      customerId: values.username,
      employeeId: values.employee,
      bookingDate: values.booking_date.format('YYYY-MM-DD'),
      timeSlot: values.time.format('HH:mm:ss'),
      serviceId: values.service,
      bookingStatusId: UPCOMING_STATUS
    };

    addBooking(newBooking);
  };

  return (
    <SideBarLayout>
      <Form
        form={form}
        name='add-booking'
        initialValues={{
          username: 'u1@gmail.com',
          employee: 'e1@gmail.com',
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
        <Form.Item label='Employee' name='employee'>
          <Select style={{ width: 120 }}>
            <Option value='e1@gmail.com'>Employee 1</Option>
            <Option value='e2@gmail.com'>Employee 2</Option>
            <Option value='e3@gmail.com'>Employee 3</Option>
          </Select>
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
        <Form.Item label='Time' name='time' rules={[{ required: true, message: 'Time is Required!' }]}>
          <TimePicker format='HH:mm' minuteStep={60} disabledHours={closingHours} />
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
