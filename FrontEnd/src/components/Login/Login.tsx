import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { UserContext } from '../../contexts';

/**
 * Login Properties
 */
export interface ComponentProps {};

/**
 * Login Component
 */
export const Login: React.FC<ComponentProps> = () => {
  const { setUser } = useContext(UserContext);
  const [form] = Form.useForm();
  const onValidSubmission = values => {
    // TODO: Submit Login & Validate Response
    setUser({
      username: values.username,
      firstName: "Nick",
      lastName: "Mladenov",
      password: values.password,
      streetNo: "test",
      streetName: "test",
      postcode: "test",
      phone: "test",
      role: {
        id: 1,
        name: "test",
      }
    });
  };

  return (
    <Form
      form={form}
      name="login"
      labelCol={{
        xs: { span: 24 },
        sm: { span: 6 },
      }}
      wrapperCol={{
        xs: { span: 24 },
        sm: { span: 16 },
      }}
      onFinish={onValidSubmission}
    >
      <Form.Item label="Username" name="username" rules={[{ required: true, type: 'email', message: "Username is required!" }]}>
        <Input placeholder="Enter your email address." />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is required!"}]}>
        <Input.Password placeholder="Enter your password." />
      </Form.Item>
      <Form.Item wrapperCol={{ xs: { span: 48 }, sm: { span: 22 } }} style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '0px' }}>
        <Button block type="primary" shape="round" size="large" htmlType="submit">
          LOGIN
        </Button>
      </Form.Item>
    </Form>
  );
};