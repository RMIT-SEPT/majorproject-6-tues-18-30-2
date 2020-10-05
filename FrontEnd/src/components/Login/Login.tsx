import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { UserContext } from '../../contexts';
import { loginUser } from '../../api/login';
import { getProfile } from '../../api/profile';
import { navigate } from '@reach/router';

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
  const goToDashboard = () => {
    navigate('/dashboard')
  }
  const onValidSubmission = values => {
    // TODO: Submit Login & Validate Response

    console.log(values);
    var userDetails = {
      username: values.username,
      password: values.password,
    };

    loginUser (userDetails).then(function(response){
      console.log(response);
      localStorage.setItem('access_token', response.data.accessToken);
      console.log(localStorage.getItem('access_token'));
      //TODO set user
      getProfile ().then(function(response){
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
          role: {
            id: 1,
            name: "test",
          }
        });
        goToDashboard();
      }).catch(function(error){
        console.log(error);
        //window.alert(error.response.data.message);
      })
    }).catch(function(error){
      window.alert(error.response.data.message);
    })
    
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