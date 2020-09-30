import React, { useState, useEffect } from 'react';
import { SideBarLayout } from '../../layouts';
import { Row, Col, Table } from 'antd';
import { getUpcomingBookings, getCompletedBookings } from '../../api/dashboard/DashboardService';

// Dashboard Page
export const Dashboard: React.FC = () => {
  /**
   * Dashboard State Properties
   *
   */
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);

  /**
   * Grab Upcoming Bookings and Completed Booking data from the backend
   */
  useEffect(() => {
    async function fetchUpcomingData() {
      const request = await getUpcomingBookings('u1@gmail.com');
      setUpcomingBookings(request.data);
    }
    
    async function fetchCompletedData() {
      const request = await getCompletedBookings('u1@gmail.com');
      setCompletedBookings(request.data);
    }

    fetchUpcomingData();
    fetchCompletedData();
  }, []);

  /**
   * Column definitions for the table
   */
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
