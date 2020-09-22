import React from 'react';
import { SideBarLayout } from '../../layouts';
import { Row, Col, Table } from 'antd';
import {getUpcomingBookings, getCompletedBookings} from '../../API/dashboard/DashboardService';

/**
 * Dashboard Page
 */
export const Dashboard: React.FC = () => {
  const columns = [
    {
      title: 'Booking Id',
      dataIndex: 'bookingId',
      key: 'bookingId'
    },
    {
      title: 'Customer Id',
      dataIndex: 'customerId',
      key: 'customerId'
    },
    {
      title: 'Booking Date',
      dataIndex: 'bookingDate',
      key: 'bookingDate'
    },
    {
      title: 'Working Date Id',
      dataIndex: 'workingDateId',
      key: 'workingDateId'
    },
    {
      title: 'Service Id',
      dataIndex: 'serviceId',
      key: 'serviceId'
    },
    {
      title: 'Booking Status Id',
      dataIndex: 'bookingStatusId',
      key: 'bookingStatusId'
    }
  ];

  return (
    <SideBarLayout>
      <h1>Dashboard</h1>
      <Row gutter={[24, 8]}>
        <Col order={1} span={12}>
          <h2>Upcoming Bookings</h2>
          <Table dataSource={getBookingData('u1@gmail.com', true)} columns={columns} />
        </Col>
        <Col order={2} span={12}>
          <h2>Completed Bookings</h2>
          <Table dataSource={getBookingData('u1@gmail.com', false)} columns={columns} />
        </Col>
      </Row>
    </SideBarLayout>
  );
};

const getBookingData = (customerId: string, isUpcoming: boolean) => {
  let bookingData = [];

  if (isUpcoming == true) {
    getUpcomingBookings(customerId).then(response => {
      bookingData = response.data;
      console.log(bookingData);
    });
  } else {
    getCompletedBookings(customerId).then(response => {
      console.log(bookingData);
      bookingData = response.data;
    });
  }

  return bookingData;
};
