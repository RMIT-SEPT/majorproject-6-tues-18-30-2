import React, { useContext, useLayoutEffect, useState } from 'react';
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
  Modal,
  Form,
  Input,
  Button
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
import { getProfile } from '../../api/profile';
import { putProfileUpdate } from '../../api/profile';

/**
 * Profile Page
 */
export const Profile: React.FC = () => {
  const { Meta } = Card;
  const { user, setUser } = useContext(UserContext);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName ?? "Nick",
    lastName: user?.lastName ?? "Mladenov",
    //description: "This is a short description of the users profile.",
    organisation: user?.organisation ?? "",
    department: user?.department ?? "",
    role: user?.role?.name ?? "",
    country: user?.country ?? ""
  });
  const [profileVisibility, setProfileVisibility] = useState(true);
  const toggleProfileVisibility = () => setProfileVisibility(!profileVisibility);
  const [editProfile, setEditProfile] = useState(false);
  const toggleEditProfile = () => setEditProfile(!editProfile);
  const [form] = Form.useForm();
  const onValidSubmission = values => {
    // TODO: Submit Profile & Validate Response
    console.log(values);
    putProfileUpdate(values).then(function(response){
      console.log(response)
      var user=response.data
      setUser({
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        password: null,
        streetNo: user.street_no,
        streetName: user.street_name,
        postcode: user.postcode,
        phone: user.phone,
        department: user.department,
        organisation: user.organisation,
        country: user.country,
        role: user.role
      });
      setProfileData({
        firstName: user.first_name,
        lastName: user.last_name,
        //description: values.description,
        organisation: user.organisation,
        department: user.department,
        role: user?.role?.name,
        country: user.country
      });
      toggleEditProfile();
    }).catch(function(error){
      console.log(error);
      //window.alert(error.response.data.message);
    })
  };

  useLayoutEffect(() => {
    let isMounted=true;

    const loadProfile = async () => {
      getProfile().then(response => {
        var user=response.data
        if (isMounted){
          setUser({
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            password: null,
            streetNo: user.street_no,
            streetName: user.street_name,
            postcode: user.postcode,
            phone: user.phone,
            department: user.department,
            organisation: user.organisation,
            country: user.country,
            role: user.role
          })
        }
      }) 
    };
    loadProfile();
    return () => { 
      isMounted=false;
    }
  }, []);

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
                title={`${profileData.firstName} ${profileData.lastName}`}
                description=""
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
                      { profileData.organisation }
                    </Descriptions.Item>
                    <Descriptions.Item label="Department" span={3}>
                      { profileData.department }
                    </Descriptions.Item>
                    <Descriptions.Item label="Role" span={3}>
                      { profileData.role }
                    </Descriptions.Item>
                    <Descriptions.Item label="Country">
                      { profileData.country }
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
              <Form
                form={form}
                name="profile"
                labelCol={{
                  xs: {
                    span: 10
                  },
                  sm: {
                    span: 5
                  }
                }}
                wrapperCol={{
                  xs: {
                    span: 20
                  },
                  sm: {
                    span: 20
                  }
                }}
                onFinish={onValidSubmission}
                initialValues={profileData}
              >
                <Form.Item
                  name="firstName"
                  label="First Name"
                >
                  <Input
                    placeholder="Enter your first name."
                  />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                >
                  <Input
                    placeholder="Enter your last name."
                  />
                </Form.Item>
                <Form.Item
                  name="organisation"
                  label="Organisation"
                >
                  <Input
                    placeholder="Enter your organisation."
                  />
                </Form.Item>
                <Form.Item
                  name="department"
                  label="Department"
                >
                  <Input
                    placeholder="Enter your department."
                  />
                </Form.Item>
                <Form.Item
                  name="country"
                  label="Country"
                >
                  <Input
                    placeholder="Enter your country."
                  />
                </Form.Item>
                <Form.Item
                  style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                  <Button type="primary" shape="round" size="large" htmlType="submit" block>
                    UPDATE PROFILE
                  </Button>
                </Form.Item>
              </Form>
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