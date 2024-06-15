import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import accountCircleImg from '../../assets/imgs/account_circle.png';
import passwordImg from '../../assets/imgs/password.jpg';
import navigationImg1 from '../../assets/imgs/navigation.png';
import navigationImg2 from '../../assets/imgs/navigation.png';
import editImg from '../../assets/imgs/edit.png';
import hiddenImg from '../../assets/imgs/hidden.png';
import visibilityImg from '../../assets/imgs/visibility.png';
import { subjects, group, literal } from '../../data/data';
import './GeneralProfile.css';

import { Modal, Button, Form, Input, Select } from 'antd';

const GeneralProfile = () => {
  const [data, setData] = useState({});
  const [parsedData, setParsedData] = useState('');

  const [activeSection, setActiveSection] = useState('personalInfo');
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visibility, setVisibility] = useState({
    pass1: { visible: false },
    pass2: { visible: false },
    pass3: { visible: false }
  });
  const [focused, setFocused] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedLiteral, setSelectedLiteral] = useState(null);
  const [subject, setSubject] = useState(null);

  let parsed;
  const profession_id = parsedData.secondId;

  useEffect(() => {
    const user_data = localStorage.getItem('user_data');
    setParsedData(JSON.parse(user_data));
    parsed = JSON.parse(user_data);
    console.log('parsed', parsed);

    let response;

    async function getData() {
      try {
        switch (parsed.role) {
          case 'admin':
            response = await axios.get(`https://ubt-server.vercel.app/admins/${parsed.secondId}`);
            setData(response.data);
            break;
          case 'teacher':
            response = await axios.get(
              `https://ubt-server.vercel.app/adminTeacher/${parsed.secondId}`
            );
            const { user, class: classInfo } = response.data;

            // const responseSubject = await axios.get(
            //   `https://ubt-server.vercel.app/subjects/${response.data.subject}`
            // );
            // console.log('subject', responseSubject.data);
            setData({
              email: user.email,
              name: user.name,
              surname: user.surname,
              password: user.password,
              class: classInfo.class,
              literal: classInfo.literal,
              subject: response.data.subject
            });
            localStorage.setItem('teacherSubject', response.data.subject);
            break;
          case 'student':
            response = await axios.get(
              `https://ubt-server.vercel.app/adminStudent/${parsed.secondId}`
            );
            const { user: studentUser, class: studentClassInfo } = response.data;
            console.log('response');
            setData({
              email: studentUser.email,
              name: studentUser.name,
              surname: studentUser.surname,
              password: studentUser.password,
              class: studentClassInfo.class,
              literal: studentClassInfo.literal,
              subject: response.data.subject,
              inn: response.data.inn
            });
            break;
          default:
            console.error('There is an error when parsing the role');
        }

        // const response = await axios.get(`https://ubt-server.vercel.app/users/${JSON.parse(user_data)._id}`)
        // setData(response.data)

        // if (parsedData.role === 'teacher') {
        //   const response2 = await axios.get(`https://ubt-server.vercel.app/adminTeacher/${JSON.parse(user_data)._id}`)
        //   setData2(response.data)
        // }
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);

  async function handleUpdateProfile() {
    let updatedUserData;

    console.log('parsedRole', parsedData.role);

    switch (parsedData.role) {
      case 'admin':
        updatedUserData = {
          name: name,
          surname: surname,
          email: email
        };
        break;
      case 'teacher':
        updatedUserData = {
          name: name,
          surname: surname,
          email: email,
          classNum: selectedGroup,
          literal: selectedLiteral,
          subject: subject
        };
        break;
      case 'student':
        updatedUserData = {
          name: name,
          surname: surname,
          email: email
        };
      default:
        break;
    }

    console.log(updatedUserData);

    let response;

    try {
      switch (parsedData.role) {
        case 'admin':
          response = await axios.put(
            `https://ubt-server.vercel.app/admins/profile/${profession_id}`,
            updatedUserData
          );
          console.log('Profile updated successfully', response.data);
          setModalOpen(false);
          break;
        case 'teacher':
          response = await axios.put(
            `https://ubt-server.vercel.app/adminTeacher/${profession_id}`,
            updatedUserData
          );
          console.log('Profile updated successfully', response.data);
          setModalOpen(false);
          break;
        case 'student':
          response = await axios.put(
            `https://ubt-server.vercel.app/adminStudent/${profession_id}`,
            updatedUserData
          );
          console.log('Profile updated successfully', response.data);
          setModalOpen(false);
          break;
        default:
          console.error('Your role is not defined');
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdatePassword() {
    const updatedPassword = {
      oldPassword: currentPassword,
      newPassword: newPassword
    };

    try {
      const response = await axios.put(
        `https://ubt-server.vercel.app/admins/password/${profession_id}`,
        updatedPassword
      );
      console.log('Password updated successfully', response.data);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
    }
  }

  const handleVisibility = (inputName) => {
    setVisibility((prevPasswords) => ({
      ...prevPasswords,
      [inputName]: {
        ...prevPasswords[inputName],
        visible: !prevPasswords[inputName].visible
      }
    }));
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      handleUpdatePassword();
    } else {
      console.log('Passwords do not match!');
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const profileSubmit = () => {
    isModalOpen(false);
  };

  return (
    <>
      <Modal title="Обновить профиль" visible={isModalOpen} onCancel={closeModal} footer={[]}>
        <Form
          variant="filled"
          onFinish={handleUpdateProfile}
          style={{
            padding: '2rem 0'
          }}
        >
          <Form.Item
            name="name"
            label="Имя"
            rules={[
              {
                required: true,
                message: 'Please input your full name!'
              }
            ]}
          >
            <div className="input_group">
              <Input
                id="name_input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
                className="form_input"
              />
            </div>
          </Form.Item>

          <Form.Item
            name="surname"
            label="Фамилия"
            rules={[
              {
                required: true,
                message: 'Please input your surname!'
              }
            ]}
          >
            <div className="input_group">
              <Input
                id="surname_input"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder=""
                className="form_input"
              />
            </div>
          </Form.Item>

          <Form.Item
            name="email"
            label="Почта"
            rules={[
              {
                required: true,
                message: 'Please input your email!'
              }
            ]}
          >
            <div className="input_group">
              <Input
                id="email_input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                className="form_input"
              />
            </div>
          </Form.Item>
          {parsedData.role === 'teacher' ? (
            <div className="class_literal">
              <Form.Item
                name="class"
                rules={[
                  {
                    required: true,
                    message: 'Please input!'
                  }
                ]}
                className="form_select"
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder="Выберите группу"
                  allowClear
                  value={selectedGroup}
                  onChange={setSelectedGroup}
                >
                  {group.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="literal"
                rules={[
                  {
                    required: true,
                    message: 'Please input!'
                  }
                ]}
                className="form_select"
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder="Выберите литерал"
                  allowClear
                  value={selectedLiteral}
                  onChange={setSelectedLiteral}
                >
                  {literal.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className="form_item"
                name="subject1"
                label="Выберите предмет"
                rules={[
                  {
                    required: true,
                    message: 'Please input!'
                  }
                ]}
                labelCol={{ span: 24 }}
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder="Предмет"
                  value={subject}
                  onChange={(value) => setSubject(value)}
                  allowClear
                >
                  {subjects.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          ) : (
            ''
          )}

          <Form.Item>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button onClick={closeModal} className="submit" type="" htmlType="cancel">
                Cancel
              </Button>
              <Button className="submit" type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <div className="general">
        <nav>
          <div className="nav1">
            <button onClick={() => setActiveSection('personalInfo')}>
              <img src={accountCircleImg} />
              <p>Персональная информация</p>
              <img src={navigationImg1} />
            </button>
          </div>
          <div className="nav2">
            <button onClick={() => setActiveSection('updatePassword')}>
              <img src={passwordImg} />
              <p>Обновить пароль</p>
              <img src={navigationImg2} />
            </button>
          </div>
        </nav>

        {activeSection === 'personalInfo' && (
          <div>
            <div className="personal-info-container">
              <hr />
              <div className="personal">
                <div className="personal-info-header">
                  <p>Персональная информация</p>
                  <img onClick={openModal} src={editImg} />
                </div>
                <div className="personal-info-grid">
                  <div className="info-box">
                    <div className="info-label">Имя-фамилия</div>
                    <div className="info-value">
                      {data.name} {data.surname}
                    </div>
                  </div>
                  <div className="info-box">
                    <div className="info-label">Почта</div>
                    <div className="info-value">{data.email}</div>
                  </div>
                  {parsedData.role === 'admin' ? (
                    ''
                  ) : (
                    <>
                      {parsedData.role === 'teacher' ? (
                        ''
                      ) : (
                        <div className="info-box">
                          <div className="info-label">ИИН</div>
                          <div className="info-value">{data.inn}</div>
                        </div>
                      )}
                      <div className="info-box">
                        <div className="info-label">Класс</div>
                        <div className="info-value">{data.class}</div>
                      </div>
                      <div className="info-box">
                        <div className="info-label">Литерал</div>
                        <div className="info-value">{data.literal}</div>
                      </div>
                      <div className="info-box">
                        <div className="info-label">Предмет</div>
                        <div className="info-value">{data.subject}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'updatePassword' && (
          <div className="updatePasswordGeneral">
            <hr />
            <div className="password-update-container">
              <p className="password-update-header">Обновить пароль</p>
              <form onSubmit={handleSubmitPassword} className="password-update-form">
                <div
                  className={`form-group ${
                    focused.currentPassword || currentPassword ? 'focused' : ''
                  }`}
                >
                  <input
                    id="current-password"
                    type={visibility.pass1.visible ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <img
                    onClick={() => handleVisibility('pass1')}
                    src={visibility.pass1.visible == false ? hiddenImg : visibilityImg}
                  />
                  <label htmlFor="current-password">Текущий пароль*</label>
                </div>
                <div
                  className={`form-group ${focused.newPassword || newPassword ? 'focused' : ''}`}
                >
                  <input
                    id="new-password"
                    type={visibility.pass2.visible ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <img
                    onClick={() => handleVisibility('pass2')}
                    src={visibility.pass2.visible == false ? hiddenImg : visibilityImg}
                  />
                  <label htmlFor="newPassword">Новый пароль*</label>
                </div>
                <div
                  className={`form-group ${
                    focused.confirmPassword || confirmPassword ? 'focused' : ''
                  }`}
                >
                  <input
                    id="confirm-password"
                    type={visibility.pass3.visible ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <img
                    onClick={() => handleVisibility('pass3')}
                    src={visibility.pass3.visible == false ? hiddenImg : visibilityImg}
                  />
                  <label htmlFor="confirmPassword">Подтвердите пароль* </label>
                </div>
                <button type="submit">Изменить</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GeneralProfile;
