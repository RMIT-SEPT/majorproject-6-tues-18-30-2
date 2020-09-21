import React, { useContext, useState } from 'react';
import { FullWidthLayout } from '../../layouts';
import {
  Row,
  Col,
  Alert,
  Avatar,
  Card,
  Tooltip,
  Timeline,
  Descriptions,
  Modal
} from 'antd';
import {
  UserOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
  EllipsisOutlined,
  ClockCircleOutlined,
  BookOutlined
} from '@ant-design/icons';
import { UserContext } from '../../contexts';

/**
 * Profile Page
 */
export const Profile: React.FC = () => {
  const { Meta } = Card;
  const { user } = useContext(UserContext);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const toggleProfileVisibility = () => setProfileVisibility(!profileVisibility);
  const [editProfile, setEditProfile] = useState(false);
  const toggleEditProfile = () => setEditProfile(!editProfile);

  return (
    <FullWidthLayout>
      <Row gutter={[4, 32]}>
        <Alert
          style={{ width: '100%'}}
          type="info"
          message="Information"
          description="This is a public user profile that shows a summary of your account but you can customise your information."
          showIcon
        />
      </Row>
      <Row gutter={[12, 8]}>
        <Col order={1} span={6}>
          <Row>
            <Card style={{ width: '100%' }}>
              <Meta
                avatar={<Avatar size={64} icon={<UserOutlined />} />}
                title={`${user.firstName} ${user.lastName}`}
                description="This is a short description of the users profile."
              />
            </Card>
          </Row>
          <Row>
            <Card
              style={{ width: '100%' }}
              actions={[
                <Tooltip title="Profile Visibility" placement="bottom">
                  {
                    profileVisibility
                    ? <EyeOutlined key="visibility" onClick={toggleProfileVisibility} />
                    : <EyeInvisibleOutlined key="visibility" onClick={toggleProfileVisibility} />
                  }
                </Tooltip>,
                <Tooltip title="Edit Profile" placement="bottom">
                  <EditOutlined key="information" onClick={toggleEditProfile} />
                </Tooltip>,
                <Tooltip title="More Settings" placement="bottom">
                  <EllipsisOutlined key="more" />
                </Tooltip>
              ]}
            >
              <Meta
                description={
                  <Descriptions layout="horizontal">
                    <Descriptions.Item label="Organisation" span={3}>
                      RMIT
                    </Descriptions.Item>
                    <Descriptions.Item label="Department" span={3}>
                      Information Technology
                    </Descriptions.Item>
                    <Descriptions.Item label="Role" span={3}>
                      Administrator
                    </Descriptions.Item>
                    <Descriptions.Item label="Country">
                      Australia
                    </Descriptions.Item>
                  </Descriptions>
                }
              />
            <Modal
              title="Edit Profile"
              visible={editProfile}
              onOk={toggleEditProfile}
              onCancel={toggleEditProfile}
              footer={null}
              centered
            >
              TODO: Edit Profile Form
            </Modal>
            </Card>
          </Row>
        </Col>
        <Col order={2} span={18}>
          <Card title="Timeline" bordered={false}>
            <Timeline mode="alternate">
              <Timeline.Item color="green">Checked in to their booking</Timeline.Item>
              <Timeline.Item dot={<BookOutlined />}>Created their first booking 22/09/2020</Timeline.Item>
              <Timeline.Item>Profile configured</Timeline.Item>
              <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                Account Created 22/09/2020
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </FullWidthLayout>
  );
};