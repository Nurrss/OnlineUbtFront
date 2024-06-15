import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { colors } from '../../base/colors';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal, Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import styles from './MyClass.module.css';

import config from '../../../config';

import { LanguageContext } from '../../contexts/LanguageContext';

import { Link } from 'react-router-dom';

const { Option } = Select;

const ActiveButton = styled.button`
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  color: ${(props) => (props.active ? '#fff' : '#000')};
  background-color: ${(props) => (props.active ? '#091' : '#fff')};
  border: solid 1px gray;
  cursor: pointer;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${colors.gray};
`;

const ChangePageButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${colors.white};
  color: ${colors.black};
  border: 1px solid ${colors.gray};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const user_data = localStorage.getItem('user_data');

const MyClassTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const [groupNum, setGroupNum] = useState(null);
  const [literalNum, setLiteralNum] = useState(null);
  const [classStudents, setClassStudents] = useState([]);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [inn, setInn] = useState('');
  const [email, setEmail] = useState('');

  const [userData, setUserData] = useState(null);

  const [searchMode, setSearchMode] = useState('fullname');

  const { language } = useContext(LanguageContext);

  async function fetchStudents() {
    try {
      const response = await axios.get('https://ubt-server.vercel.app/adminStudent/');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetchStudents();
      setStudents(data);
    }

    fetchData();
  }, []);

  async function handleUpdateStudent(event) {
    event.preventDefault();
    const updatedStudentData = {
      name: name,
      surname: surname,
      inn: inn,
      email: email,
      classNum: groupNum,
      literal: literalNum
    };

    console.log('studentId: ', selectedStudentId);
    console.log(updatedStudentData);

    try {
      const response = await axios.put(
        `https://ubt-server.vercel.app/adminStudent/${selectedStudentId}`,
        updatedStudentData
      );
      console.log('Exam updated successfully', response.data);
      const updatedData = await fetchStudents();
      setStudents(updatedData);
      setEditModalVisible(false);
      setSelectedStudentId(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteStudent(studentId) {
    try {
      const response = await axios.delete(
        `https://ubt-server.vercel.app/adminStudent/${studentId}`
      );
      console.log('Student deleted successfully', response.data);
      const updatedData = await fetchStudents();
      setStudents(updatedData);
      setEditModalVisible(false);
      setSelectedStudentId(null);
      getClassId(userData);
    } catch (error) {
      console.error(error);
    }
  }

  const itemsPerPage = 10;

  const filteredStudents = students.filter((student) => {
    if (searchMode === 'fullname') {
      const fullName = `${student.name} ${student.surname}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    } else if (searchMode === 'иин') {
      return student.inn.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchMode === 'gmail') {
      return student.email.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredStudents.length);
  const visibleData = filteredStudents.slice(startIndex, endIndex);

  async function getClassId(user_data) {
    try {
      const response = await axios.get(
        `https://ubt-server.vercel.app/adminTeacher/${user_data.secondId}`
      );
      const class_id = response.data.class._id;
      setGroupNum(response.data.class.class);
      setLiteralNum(response.data.class.literal);

      const response2 = await axios.get(`https://ubt-server.vercel.app/teachers/class/${class_id}`);
      console.log(response2.data);
      setClassStudents(response2.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Check if data exists in localStorage
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    setUserData(user_data);
    if (user_data) {
      getClassId(user_data);
    } else {
      console.log('There is no user data');
    }
  }, []);

  const searchByMode = (mode) => {
    setSearchMode(mode);
  };

  const handleInputSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const showAddModal = () => {
    clearInputFields();
    setAddModalVisible(true);
  };

  const handleAddModalCancel = () => {
    setAddModalVisible(false);
  };

  const showEditStudent = (studentId) => {
    setSelectedStudentId(studentId);
    setEditModalVisible(true);

    const selectedStudent = students.find((student) => student.id === studentId);

    // Update the state with the data of the selected student
    if (selectedStudent) {
      setName(selectedStudent.name);
      setSurname(selectedStudent.surname);
      setInn(selectedStudent.inn);
      setEmail(selectedStudent.email);
    }
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  async function handleSubmit() {
    // Use the state variables to submit the form data or perform other actions
    const newStudent = {
      name: name,
      surname: surname,
      inn: inn,
      email: email,
      classNum: groupNum,
      literal: literalNum
    };

    console.log(newStudent);

    const { data } = await axios.post(
      'https://ubt-server.vercel.app/adminStudent/add',
      newStudent,
      {
        headers: {
          'Content-Type': 'application/json' // Set content type header
        }
      }
    );
    const updatedData = await fetchStudents();
    setStudents(updatedData);
    console.log(data);
    setAddModalVisible(false);
    getClassId(userData);

    // Clear input fields after submission if needed
    clearInputFields();
  }

  const clearInputFields = () => {
    setName('');
    setSurname('');
    setInn('');
    setEmail('');
  };

  return (
    <>
      <Modal
        title={language == 'kz' ? 'Студент қосу' : 'Добавить студента'}
        visible={addModalVisible}
        onCancel={handleAddModalCancel}
        footer={null}
      >
        <Form
          variant="filled"
          style={{
            padding: '2rem 0'
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your full name!'
              }
            ]}
          >
            <div className={styles.input_group}>
              <Input
                id="name_input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                className={styles.form_input}
              />
              <label htmlFor="name_input" className={styles.form_input_label}>
                {language == 'kz' ? 'Аты' : 'Имя'}
              </label>
            </div>
          </Form.Item>

          <Form.Item
            name="surname"
            rules={[
              {
                required: true,
                message: 'Please input your surname!'
              }
            ]}
          >
            <div className={styles.input_group}>
              <Input
                id="surname_input"
                value={surname}
                placeholder=""
                onChange={(e) => setSurname(e.target.value)}
                className={styles.form_input}
              />
              <label htmlFor="surname_input" className={styles.form_input_label}>
                {language == 'kz' ? 'Тегі' : 'Фамилия'}
              </label>
            </div>
          </Form.Item>

          <Form.Item
            name="ИИН"
            rules={[
              {
                required: true,
                message: 'Please input your iin!'
              }
            ]}
          >
            <div className={styles.input_group}>
              <Input
                id="inn"
                placeholder=""
                value={inn}
                onChange={(e) => setInn(e.target.value)}
                className={styles.form_input}
                required
                // pattern="\d{12}"
              />
              <label htmlFor="inn" className={styles.form_input_label}>
                {language == 'kz' ? 'ЖСН' : 'ИИН'}
              </label>
            </div>
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!'
              }
            ]}
          >
            <div className={styles.input_group}>
              <Input
                id="email_input"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.form_input}
              />
              <label htmlFor="email_input" className={styles.form_input_label}>
                Email*
              </label>
            </div>
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button
                onClick={handleAddModalCancel}
                className={styles.submit}
                type=""
                htmlType="cancel"
              >
                Cancel
              </Button>
              <Button className={styles.submit} type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={language == 'kz' ? 'Студент өзгерту' : 'Изменить студента'}
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        footer={[]}
      >
        <Form
          variant="filled"
          style={{
            padding: '2rem 0'
          }}
          onFinish={handleUpdateStudent}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your full name!'
              }
            ]}
          >
            <div className={styles.input_group}>
              <Input
                id="name_input"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.form_input}
              />
              <label htmlFor="name_input" className={styles.form_input_label}>
                {language == 'kz' ? 'Аты' : 'Имя'}
              </label>
            </div>
          </Form.Item>

          <Form.Item
            name="surname"
            rules={[
              {
                required: true,
                message: 'Please input your surname!'
              }
            ]}
          >
            <div className={styles.input_group}>
              <Input
                id="surname_input"
                placeholder=""
                className={styles.form_input}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              <label htmlFor="surname_input" className={styles.form_input_label}>
                {language == 'kz' ? 'Тегі' : 'Фамилия'}
              </label>
            </div>
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!'
              }
            ]}
          >
            <div className={styles.input_group}>
              <Input
                id="email_input"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.form_input}
              />
              <label htmlFor="email_input" className={styles.form_input_label}>
                Email
              </label>
            </div>
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button
                onClick={handleAddModalCancel}
                className={styles.submit}
                type=""
                htmlType="cancel"
              >
                {language == 'kz' ? 'Бас тарту' : 'Отмена'}
              </Button>
              <Button
                onClick={handleUpdateStudent}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                {language == 'kz' ? 'Қабылдау' : 'Принять'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <div>
        <Button onClick={showAddModal}>
          {language == 'kz' ? 'Студент қосу' : 'Добавить студента'}
        </Button>
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <div className={styles.searchContainer}>
              <SearchInput
                className={styles.searchInput}
                type="text"
                value={searchQuery}
                onChange={handleInputSearchChange}
                placeholder={`Search by ${searchMode}`}
              />
              <div className={styles.searchContainer}>
                <ActiveButton
                  className={styles.searchBtn}
                  active={searchMode === 'fullname'} // Check if the button is active
                  onClick={() => searchByMode('fullname')} // Handle button click
                >
                  {language == 'kz' ? 'Аты жөні' : 'Имя-фамилия'}
                </ActiveButton>
                <ActiveButton
                  className={styles.searchBtn}
                  active={searchMode === 'иин'}
                  onClick={() => searchByMode('иин')}
                >
                  {language == 'kz' ? 'ЖСН' : 'ИИН'}
                </ActiveButton>
                <ActiveButton
                  className={styles.searchBtn}
                  active={searchMode === 'gmail'}
                  onClick={() => searchByMode('gmail')}
                >
                  Gmail
                </ActiveButton>
              </div>
            </div>
          </div>
          <div className={styles.tableCont}>
            {students.length <= 0 ? (
              <p>{language == 'kz' ? 'Студенттер әлі жоқ' : 'Здесь до сих пор нету '}</p>
            ) : (
              <div className="container">
                <div className="row table_row">
                  {/* <div className="col-1 table_items">ID</div> */}
                  <div className="col-2 table_items">{language == 'kz' ? 'И' : 'Фамилия'}</div>
                  <div className="col-2 table_items">{language == 'kz' ? 'Тегі' : 'Фамилия'}</div>
                  <div className="col-2 table_items">{language == 'kz' ? 'ЖСН' : 'ИИН'}</div>
                  <div className="col-3 table_items">Gmail</div>
                </div>
                {visibleData.map((student, index) => (
                  <div key={index} className="row table_row">
                    {/* <div className="col-1 table_items">{student.id}</div> */}
                    <div className="col-2 table_items">{student.name}</div>
                    <div className="col-2 table_items">{student.surname}</div>
                    <div className="col-2 table_items">{student.inn}</div>
                    <div className="col-3 table_items">{student.email}</div>
                    <div className="col-1 table_items">
                      <Link to="/done_exams">{language == 'kz' ? 'Толығырақ' : 'Подробнее'}</Link>
                    </div>
                    <div className="col-1 table_items">
                      <div style={{ display: 'flex', gap: '2rem' }}>
                        <EditOutlined onClick={() => showEditStudent(student.id)} />
                        <DeleteOutlined onClick={() => handleDeleteStudent(student.id)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.pageController}>
            <ChangePageButton onClick={handlePrevPage} disabled={currentPage === 0}>
              {'<'}
            </ChangePageButton>
            <span>{`${currentPage + 1} / ${totalPages}`}</span>
            <ChangePageButton onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
              {'>'}
            </ChangePageButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyClassTable;
