import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../App';
import { ErrorDisplay } from '../../components/organism/ErrorDisplay/ErrorDisplay';
import axios from 'axios';

import { Button, Form, Input, Space } from 'antd';

import styles from './LoginPage.module.css';

export const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function onFinish() {
    try {
      const loginData = { email, password }; // Combine email and password
      const response = await axios.post('https://ubt-server.vercel.app/auth', loginData, {
        headers: {
          'Content-Type': 'application/json' // Set content type header
        }
      });
      console.log(response.data);
      const userRole = response.data.role;

      localStorage.setItem('user_data', JSON.stringify(response.data));

      // onLogin()

      switch (userRole) {
        case ROLES.Student:
          navigate('/exams');
          break;
        case ROLES.Teacher:
          navigate('/my_class');
          break;
        case ROLES.Admin:
          navigate('/exams_admin');
          break;
        default:
          navigate('*');
          break;
      }

      window.location.reload();
    } catch (error) {
      console.error(error.response.data); // Log backend error response
      setErrorMessage(error.response.data.message);
    }
  }

  return (
    <div className={styles.login_container}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2>Войти</h2>
        <p className={styles.welcome_text}>Добро пожаловать!</p>
      </div>
      <div className="form">
        {errorMessage && <ErrorDisplay errorMessage={errorMessage} />}
        <Form
          variant="filled"
          onFinish={onFinish}
          style={{
            maxWidth: 600
          }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!'
              }
            ]}
          >
            <div className="input_group">
              <Input
                placeholder=""
                onChange={handleEmailChange}
                className={styles.form_input}
                autoComplete="off"
              />
              <label className={styles.form_input_label}>Email*</label>
            </div>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <div className="input_group">
              <Input.Password
                placeholder=""
                onChange={handlePasswordChange}
                className={styles.form_input}
                autoComplete="off"
              />
              <label className={styles.form_input_label}>Password*</label>
            </div>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button className={styles.submit} type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
