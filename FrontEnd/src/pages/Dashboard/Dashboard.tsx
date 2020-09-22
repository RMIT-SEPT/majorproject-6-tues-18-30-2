import React, { useState, useEffect } from 'react';
import { SideBarLayout } from '../../layouts';
import { Row, Col, Table } from 'antd';
import { getUpcomingBookings, getCompletedBookings } from '../../API/dashboard/DashboardService';

/**
 * Dashboard Page
 */
export const Dashboard: React.FC = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);

  useEffect(() => {
    setUpcomingBookings(getBookingData('u1@gmail.com', true));
    setCompletedBookings(getBookingData('u1@gmail.com', false));
  }, []);

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
          <Table dataSource={upcomingBookings} columns={columns} />
        </Col>
        <Col order={2} span={12}>
          <h2>Completed Bookings</h2>
          <Table dataSource={completedBookings} columns={columns} />
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
    });
  } else {
    getCompletedBookings(customerId).then(response => {
      bookingData = response.data;
    });
  }

  return bookingData;
};
