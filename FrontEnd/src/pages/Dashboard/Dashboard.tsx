import React from 'react';
import { SideBarLayout } from '../../layouts';
import { Row, Col, Table } from 'antd';

/**
 * Dashboard Page
 */
export const Dashboard: React.FC = () => {
  return (
    <SideBarLayout>
      <h1>
        This is the dashboard.
      </h1>
      <Row gutter={[24, 8]}>
        <Col order={1} span={12}>
          <h2>Upcoming Bookings</h2>
          <Table />
        </Col>
        <Col order={2} span={12}>
          <h2>Completed Bookings</h2>
          <Table />
        </Col>
      </Row>
    </SideBarLayout>
  );
};
