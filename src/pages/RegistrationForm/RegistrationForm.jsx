import React, { useEffect, useState } from 'react';
import styles from './RegistrationForm.module.css';
import { useNavigate } from 'react-router-dom';
import { group, literal } from '../../data/data';
import { registerTeacherPage } from '../../data/page_text';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import { Button, Form, Input, Select, Space } from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

export const RegistrationForm = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [groupNum, setGroupNum] = useState(null);
  const [literalValue, setLiteralValue] = useState(null);
  const [subject, setSubject] = useState(null);
  const [fetchedSubjects, setFetchedSubjects] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await axios.get(`${config.baseURL}/subjects/`);
        setFetchedSubjects(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSubjects();
  }, []);

  async function onFinish() {
    const [firstname, lastname] = fullname.split(' ');
    const registerData = {
      email: email,
      password: password,
      name: firstname,
      surname: lastname,
      classNum: groupNum,
      literal: literalValue,
      subjectId: subject,
      role: 'teacher'
    };

    console.log(registerData);

    try {
      const response = await axios.post(`${config.baseURL}/register/teacher/`, registerData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.registration_form}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2>{registerTeacherPage.title}</h2>
        <p className={styles.welcome_text}>{registerTeacherPage.miniTitle}</p>
      </div>
      <div>
        <Form onFinish={onFinish} className={styles.form} {...formItemLayout}>
          <Form.Item
            className={styles.form_item}
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
            labelCol={{ span: 24 }}
          >
            <Input
              id={styles.email_input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.form_input}
            />
          </Form.Item>

          <Form.Item
            className={styles.form_item}
            name="fullname"
            label="ФИО"
            rules={[{ required: true, message: 'Please input your full name!' }]}
            labelCol={{ span: 24 }}
          >
            <Input
              id={styles.fullname_input}
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className={styles.form_input}
            />
          </Form.Item>

          <Form.Item
            className={styles.form_item}
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            labelCol={{ span: 24 }}
          >
            <Input.Password
              id={styles.password_input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.form_input}
            />
          </Form.Item>

          <div className="container px-4 text-center">
            <div className="row gx-5">
              <div className="col">
                <Form.Item
                  className={styles.form_item}
                  name="class"
                  label="Class"
                  rules={[{ required: true, message: 'Please input!' }]}
                  labelCol={{ span: 24 }}
                >
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Выберите группу"
                    value={groupNum}
                    onChange={(value) => setGroupNum(value)}
                    allowClear
                  >
                    {group.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col">
                <Form.Item
                  className={styles.form_item}
                  name="literal"
                  label="Literal"
                  rules={[{ required: true, message: 'Please input!' }]}
                  labelCol={{ span: 24 }}
                >
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Выберите литерал"
                    value={literalValue}
                    onChange={(value) => setLiteralValue(value)}
                    allowClear
                  >
                    {literal.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
          </div>

          <Form.Item
            className={styles.form_item}
            name="subject1"
            label="Выберите предмет"
            rules={[{ required: true, message: 'Please input!' }]}
            labelCol={{ span: 24 }}
          >
            <Select
              style={{ width: '100%' }}
              placeholder="Предмет"
              value={subject}
              onChange={(value) => setSubject(value)}
              allowClear
            >
              {fetchedSubjects.map((subject) => (
                <Option key={subject._id} value={subject._id}>
                  {subject.kz_subject}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button className={styles.submit} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <p>
          {registerTeacherPage.alreadyRegister}{' '}
          <Link to="/login">{registerTeacherPage.logInText}</Link>
        </p>
      </div>
    </div>
  );
};
