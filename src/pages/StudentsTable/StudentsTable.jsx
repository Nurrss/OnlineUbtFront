import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { colors } from '../../base/colors';
import { EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { Modal, Button, Form, Input, Select } from 'antd';
import excelIcon from '../../assets/img/excel.png';
import styles from './StudentsTable.module.css';
import axios from 'axios';

import { LanguageContext } from '../../contexts/LanguageContext';

import { Link } from 'react-router-dom';

const { Option } = Select;

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

const ActiveButton = styled.button`
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  color: ${(props) => (props.active ? '#fff' : '#000')};
  background-color: ${(props) => (props.active ? '#091' : '#fff')};
  border: solid 1px gray;
  cursor: pointer;
`;

export const Students = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [excelModalVisible, setExcelModalVisible] = useState(false);

  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const [link, setLink] = useState('');

  const [searchMode, setSearchMode] = useState('fullname');

  //
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [inn, setInn] = useState('');
  const [email, setEmail] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedLiteral, setSelectedLiteral] = useState(null);

  const { language } = useContext(LanguageContext);

  const itemsPerPage = 10;

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
      classNum: selectedGroup,
      literal: selectedLiteral
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

  const handleReload = async () => {
    try {
      const response = await axios.get('https://ubt-server.vercel.app/adminStudent/');
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSendExcel() {
    const excelLink = {
      fileUrl: link
    };

    console.log('Excel link: ', excelLink);

    try {
      const response = await axios.post('https://ubt-server.vercel.app/students/excel', excelLink);
      console.log('Excel link send successfully', response.data);
      const StudentExcel = await fetchStudents();
      setStudents(StudentExcel);
    } catch (error) {
      console.error(error);
    }
    setExcelModalVisible(false);
  }

  const filteredStudents = students.filter((student) => {
    if (searchMode === 'fullname') {
      const fullName = `${student.name} ${student.surname}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    } else if (searchMode === 'group') {
      return student.group.toLowerCase().includes(searchQuery.toLowerCase());
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

  const searchByMode = (mode) => {
    setSearchMode(mode);
  };

  const handleInputSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const generateClassNumbers = () => {
    return Array.from({ length: 7 }, (_, index) => ({
      value: (11 - index).toString(),
      label: (11 - index).toString()
    }));
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
      setSelectedGroup(selectedStudent.classNum);
      setSelectedLiteral(selectedStudent.literal);
    }
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const openModalExcel = () => {
    setExcelModalVisible(true);
  };

  const handleExcelCancel = () => {
    setExcelModalVisible(false);
  };

  async function handleSubmit() {
    // Use the state variables to submit the form data or perform other actions
    const newStudent = {
      name: name,
      surname: surname,
      inn: inn,
      email: email,
      classNum: selectedGroup,
      literal: selectedLiteral
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

    // Clear input fields after submission if needed
    clearInputFields();
  }

  const clearInputFields = () => {
    setName('');
    setSurname('');
    setInn('');
    setEmail('');
    setSelectedGroup(null);
    setSelectedLiteral(null);
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
                Email
              </label>
            </div>
          </Form.Item>

          <div className={styles.class_literal}>
            <Form.Item
              name="class"
              rules={[
                {
                  required: true,
                  message: 'Please input!'
                }
              ]}
              className={styles.form_select}
            >
              <Select
                style={{ width: '100%' }}
                value={selectedGroup}
                onChange={setSelectedGroup}
                placeholder="Выберите группу"
                allowClear
                dropdownStyle={{ maxHeight: 200, overflowY: 'auto' }}
              >
                {generateClassNumbers().map((option) => (
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
                  message: 'Please input a single letter!'
                },
                {
                  pattern: /^[a-z]$/,
                  message: 'Literal must be a single lowercase letter!'
                }
              ]}
              className={styles.form_select}
            >
              <Input
                style={{ width: '100%' }}
                placeholder="Выберите литерал"
                value={selectedLiteral}
                onChange={(e) => setSelectedLiteral(e.target.value.toLowerCase())}
                maxLength={1}
              />
            </Form.Item>
          </div>
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
              <Button className={styles.submit} type="primary" htmlType="submit">
                {language == 'kz' ? 'Қабылдау' : 'Принять'}
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
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '2rem 0'
          }}
          onFinish={handleUpdateStudent}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: language == 'kz' ? 'Атыңызды жазыңыз!' : 'Напишите имя!'
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

          <div className={styles.class_literal}>
            <Form.Item
              name="class"
              rules={[
                {
                  required: true,
                  message: 'Please input!'
                }
              ]}
              className={styles.form_select}
            >
              <Select
                style={{ width: '100%' }}
                value={selectedGroup}
                onChange={setSelectedGroup}
                placeholder="Выберите группу"
                allowClear
                dropdownStyle={{ maxHeight: 200, overflowY: 'auto' }}
              >
                {generateClassNumbers().map((option) => (
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
                  message: 'Please input a single letter!'
                },
                {
                  pattern: /^[a-z]$/,
                  message: 'Literal must be a single lowercase letter!'
                }
              ]}
              className={styles.form_select}
            >
              <Input
                style={{ width: '100%' }}
                placeholder="Выберите литерал"
                value={selectedLiteral}
                onChange={(e) => setSelectedLiteral(e.target.value.toLowerCase())}
                maxLength={1}
              />
            </Form.Item>
          </div>
          <Form.Item>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'end' }}>
              <Button
                onClick={handleAddModalCancel}
                className={styles.submit}
                type=""
                htmlType="cancel"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateStudent}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={language == 'kz' ? 'Google Sheets сілтемесін қою' : 'Ставить ссылку Google Sheets'}
        visible={excelModalVisible}
        onCancel={handleExcelCancel}
        footer={null}
      >
        <Form
          variant="filled"
          style={{
            padding: '2rem 0'
          }}
          onFinish={handleSendExcel}
        >
          <Form.Item
            name="link"
            rules={[
              {
                required: true,
                message: 'Please input link!'
              }
            ]}
          >
            <div className={styles.input_group}>
              <Input
                id="link_input"
                placeholder=""
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className={styles.form_input}
              />
              <label htmlFor="link_input" className={styles.form_input_label}>
                {language == 'kz' ? 'Сілтеме' : 'Ссылка'}
              </label>
            </div>
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button
                onClick={handleExcelCancel}
                className={styles.submit}
                type=""
                htmlType="cancel"
              >
                {language == 'kz' ? 'Бас тарту' : 'Отмена'}
              </Button>
              <Button
                onClick={handleSendExcel}
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
                placeholder={
                  language == 'kz' ? `${searchMode} арқылы іздеу` : `Искать по ${searchMode}`
                }
              />
              <div className={styles.searchContainer}>
                <ActiveButton
                  className={styles.searchBtn}
                  active={searchMode === 'fullname'} // Check if the button is active
                  onClick={() => searchByMode('fullname')} // Handle button click
                >
                  {language == 'kz' ? 'Толық аты-жөні' : 'Полное имя-фамилия'}
                </ActiveButton>
                <ActiveButton
                  className={styles.searchBtn}
                  active={searchMode === 'group'}
                  onClick={() => searchByMode('group')}
                >
                  {language == 'kz' ? 'Группа' : 'Группа'}
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
            <div className={styles.excelReloadCont}>
              <button onClick={openModalExcel} className={styles.excelBtn}>
                <img src={excelIcon} alt="" />
                Google Sheets
              </button>
              <ReloadOutlined onClick={handleReload} />
            </div>
          </div>
          <div className={styles.tableCont}>
            {students.length <= 0 ? (
              <p>{language == 'kz' ? 'Әлі студент жоқ' : 'Студентов еще нет'}</p>
            ) : (
              <div className={`${styles.studentsTable}`}>
                <div className={`row table_row ${styles.studentsRow}`}>
                  {/* <div class="col-2 table_items">ID</div> */}
                  <div className="col-2 table_items">{language == 'kz' ? 'Аты' : 'Имя'}</div>
                  <div className="col-2 table_items">{language == 'kz' ? 'Тегі' : 'Фамилия'}</div>
                  <div className="col-1 table_items">{language == 'kz' ? 'Группа' : 'Группа'}</div>
                  <div className="col-2 table_items">{language == 'kz' ? 'ЖСН' : 'ИИН'}</div>
                  <div className="col-3 table_items">Gmail</div>
                </div>
                {visibleData.map((student, index) => (
                  <div key={index} className={`row table_row ${styles.studentsRow}`}>
                    {/* <div class="col-2 table_items">{student.id}</div> */}
                    <div className="col-2 table_items">{student.name}</div>
                    <div className="col-2 table_items">{student.surname}</div>
                    <div className="col-1 table_items">{student.group}</div>
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
