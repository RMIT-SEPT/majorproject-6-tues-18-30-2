import React, { useState } from 'react';
import { FullWidthLayout } from '../../layouts';
import {
  Typography,
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Result
} from 'antd';

/**
 * Registration Page
 */
export const Registration: React.FC = () => {
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const { Title, Paragraph } = Typography
  const { Option } = Select;
  const onValidSubmission = () => {
    // TODO: Submit Registration & Validate Response
    setSubmitted(true);
  };

  return (
    <FullWidthLayout>
      <Typography style={{ display: submitted ? 'none' : 'block', textAlign: 'center' }}>
        <Title>Create Account</Title>
        <Paragraph style={{ paddingBottom: '15px' }}>
          Register an account with us, we guarantee you'll never look back! 😁
        </Paragraph>
      </Typography>
      <Form
        form={form}
        name="register"
        hidden={submitted}
        labelCol={{
          xs: {
            span: 38
          },
          sm: {
            span: 6
          }
        }}
        wrapperCol={{
          xs: {
            span: 12
          },
          sm: {
            span: 14
          }
        }}
        onFinish={onValidSubmission}
        scrollToFirstError
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{
            required: true,
            message: "You must provider your first name."
          }]}
        >
          <Input placeholder="Enter your first name." />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{
            required: true,
            message: "You must provide your last name."
          }]}
        >
          <Input placeholder="Enter your last name." />
        </Form.Item>
        <Form.Item
          name="emailAddress"
          label="Email Address"
          rules={[
            {
              type: "email",
              message: "An invalid email address was provided."
            },
            {
              required: true,
              message: "You must provide an email address."
            }
          ]}
        >
          <Input placeholder="Enter your email address." />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{
            required: true,
            message: "You must provide a phone number."
          }]}
        >
          <Input
            placeholder="Enter a phone number."
            addonBefore={(
              <Form.Item name="prefix" noStyle>
                <Select style={{ width: 70 }} defaultValue="61">
                  <Option value="61">+61</Option>
                </Select>
              </Form.Item>
            )}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{
            required: true,
            message: "You must provide a password."
          }]}
        >
          <Input.Password placeholder="Enter your password." />
        </Form.Item>
        <Form.Item
          name="passwordConfirmation"
          label="Confirm Password"
          rules={[
            {
              required: true,
              message: "You must confirm your password."
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Your passwords do not match.");
              }
            })
          ]}
        >
          <Input.Password placeholder="Repeat your password." />
        </Form.Item>
        <Form.Item
          name="streetName"
          label="Street Name"
          rules={[{
            required: true,
            message: "You must enter a street name."
          }]}
        >
          <Input placeholder="Enter your street name." />
        </Form.Item>
        <Form.Item
          name="streetNumber"
          label="Street Number"
          rules={[{
            required: true,
            message: "You must enter a street number."
          }]}
        >
          <Input placeholder="Enter your street number." />
        </Form.Item>
        <Form.Item
          name="postcode"
          label="Postcode"
          rules={[{
            required: true,
            message: "You must enter a postcode."
          }]}
        >
          <Input placeholder="Enter your postcode." />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[{
            validator: (_, value) => value
              ? Promise.resolve()
              : Promise.reject("You must accept our agreement.")
          }]}
          labelCol={{
            xs: {
              span: 38
            },
            sm: {
              span: 3
            }
          }}
          wrapperCol={{
            xs: {
              span: 11
            },
            sm: {
              span: 18
            }
          }}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Checkbox>
            By checking this box, you acknowledge you have read and understand the <a href="#">Privacy Policy</a> and accept our <a href="#">Terms and Conditions</a>.
          </Checkbox>
        </Form.Item>
        <Form.Item
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Button type="primary" shape="round" size="large" htmlType="submit" block>
            REGISTER
          </Button>
        </Form.Item>
      </Form>
      <Result
        status="success"
        title="Registration Succcessful!"
        subTitle="Congratulations, you have succcessfully registered an account with us - now you can login and start using the booking system!"
        style={{ display: submitted ? 'block' : 'none' }}
      />
    </FullWidthLayout>
  );
};