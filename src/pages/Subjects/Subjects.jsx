import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { colors } from '../../base/colors';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal, Button, Form, Input } from 'antd';
import axios from 'axios';
import styles from './Subjects.module.css';

import { LanguageContext } from '../../contexts/LanguageContext';

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

const MyClassTable = () => {
  const [viewMode, setViewMode] = useState('subjects');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const [kzName, setKzName] = useState('');
  const [ruName, setRuName] = useState('');
  const [classNumber, setClassNumber] = useState('');
  const [classLiteral, setClassLiteral] = useState('');

  const [subjectSearchMode, setSubjectSearchMode] = useState('kz_subject');
  const [classSearchMode, setClassSearchMode] = useState('class');

  const { language } = useContext(LanguageContext);

  async function fetchSubjects() {
    try {
      const response = await axios.get(`https://ubt-server.vercel.app/subjects/`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function fetchClasses() {
    try {
      const response = await axios.get(`https://ubt-server.vercel.app/class`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (viewMode === 'subjects') {
        const data = await fetchSubjects();
        setSubjects(data);
      } else {
        const data = await fetchClasses();
        setClasses(data);
      }
    }

    fetchData();
  }, [viewMode]);

  async function handleUpdateSubject() {
    const updatedSubjectData = {
      kz_subject: kzName,
      ru_subject: ruName
    };

    try {
      const response = await axios.put(
        `https://ubt-server.vercel.app/subjects/${selectedSubjectId}`,
        updatedSubjectData
      );
      console.log('Subject updated successfully', response.data);
      const updatedData = await fetchSubjects();
      setSubjects(updatedData);
      setEditModalVisible(false);
      setSelectedSubjectId(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateClass() {
    const updatedClassData = {
      class: classNumber,
      literal: classLiteral
    };

    try {
      const response = await axios.put(
        `https://ubt-server.vercel.app/class/${selectedClassId}`,
        updatedClassData
      );
      console.log('Class updated successfully', response.data);
      const updatedData = await fetchClasses();
      setClasses(updatedData);
      setEditModalVisible(false);
      setSelectedClassId(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteSubject(subjectId) {
    try {
      const response = await axios.delete(`https://ubt-server.vercel.app/subjects/${subjectId}`);
      console.log('Subject deleted successfully', response.data);
      const updatedData = await fetchSubjects();
      setSubjects(updatedData);
      setEditModalVisible(false);
      setSelectedSubjectId(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteClass(classId) {
    try {
      const response = await axios.delete(`https://ubt-server.vercel.app/class/${classId}`);
      console.log('Class deleted successfully', response.data);
      const updatedData = await fetchClasses();
      setClasses(updatedData);
      setEditModalVisible(false);
      setSelectedClassId(null);
    } catch (error) {
      console.error(error);
    }
  }

  const itemsPerPage = 10;

  const filteredSubjects = subjects.filter((subject) => {
    if (subjectSearchMode === 'kz_subject') {
      return subject.kz_subject.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (subjectSearchMode === 'ru_subject') {
      return subject.ru_subject.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  const filteredClasses = classes.filter((cls) => {
    if (classSearchMode === 'class') {
      return cls.class && cls.class.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (classSearchMode === 'literal') {
      return cls.literal && cls.literal.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  const totalPages = Math.ceil(
    viewMode === 'subjects'
      ? filteredSubjects.length / itemsPerPage
      : filteredClasses.length / itemsPerPage
  );
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    viewMode === 'subjects' ? filteredSubjects.length : filteredClasses.length
  );
  const visibleData =
    viewMode === 'subjects'
      ? filteredSubjects.slice(startIndex, endIndex)
      : filteredClasses.slice(startIndex, endIndex);

  const handleSearch = () => {
    setCurrentPage(0);
    setSearchQuery(e.target.value);
  };

  const searchByMode = (mode) => {
    if (viewMode === 'subjects') {
      setSubjectSearchMode(mode);
    } else {
      setClassSearchMode(mode);
    }
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

  const showEditSubject = (subjectId) => {
    setSelectedSubjectId(subjectId);
    setEditModalVisible(true);

    const selectedSubject = subjects.find((subject) => subject._id === subjectId);

    if (selectedSubject) {
      setKzName(selectedSubject.kz_subject);
      setRuName(selectedSubject.ru_subject);
    }
  };

  const showEditClass = (classId) => {
    setSelectedClassId(classId);
    setEditModalVisible(true);

    const selectedClass = classes.find((cls) => cls._id === classId);

    if (selectedClass) {
      setClassNumber(selectedClass.class);
      setClassLiteral(selectedClass.literal);
    }
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  async function handleSubmitSubject() {
    const newSubject = {
      kz_subject: kzName,
      ru_subject: ruName
    };

    const { data } = await axios.post(`https://ubt-server.vercel.app/subjects/add`, newSubject, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const updatedData = await fetchSubjects();
    setSubjects(updatedData);
    console.log(data);
    setAddModalVisible(false);

    clearInputFields();
  }

  async function handleSubmitClass() {
    const newClass = {
      class: classNumber,
      literal: classLiteral
    };

    const { data } = await axios.post(`https://ubt-server.vercel.app/class/add`, newClass, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const updatedData = await fetchClasses();
    setClasses(updatedData);
    console.log(data);
    setAddModalVisible(false);

    clearInputFields();
  }

  const clearInputFields = () => {
    setKzName('');
    setRuName('');
    setClassNumber('');
    setClassLiteral('');
  };

  const SubjectsTable = () => (
    <>
      <div style={{ padding: '0 1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
          <thead>
            <tr>
              <th style={{ padding: '1rem', border: '1px solid #ddd' }}>
                {language == 'kz' ? 'Қазақша аты' : 'Казахское имя'}
              </th>
              <th style={{ padding: '1rem', border: '1px solid #ddd' }}>
                {language == 'kz' ? 'Орысша аты' : 'Русское имя'}
              </th>
              <th style={{ padding: '1rem', border: '1px solid #ddd' }}>
                {language == 'kz' ? 'Өзгерту' : 'Изменить'}
              </th>
              <th style={{ padding: '1rem', border: '1px solid #ddd' }}>
                {language == 'kz' ? 'Жою' : 'Удалить'}
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((subject, index) => (
              <tr key={index}>
                <td style={{ padding: '1rem', border: '1px solid #ddd' }}>{subject.kz_subject}</td>
                <td style={{ padding: '1rem', border: '1px solid #ddd' }}>{subject.ru_subject}</td>
                <td style={{ padding: '1rem', border: '1px solid #ddd' }}>
                  <Button
                    type="default"
                    onClick={() => showEditSubject(subject._id)}
                    style={{ border: 'none' }}
                  >
                    <EditOutlined />
                  </Button>
                </td>
                <td style={{ padding: '1rem', border: '1px solid #ddd' }}>
                  <Button
                    type="danger"
                    onClick={() => handleDeleteSubject(subject._id)}
                    style={{ border: 'none' }}
                  >
                    <DeleteOutlined />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const ClassesTable = () => (
    <>
      <div style={{ padding: '0 1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
          <thead>
            <tr>
              <th style={{ padding: '1rem', border: '1px solid #ddd' }}>
                {language == 'kz' ? 'Класс нөмері' : 'Номер класса'}
              </th>
              <th style={{ padding: '1rem', border: '1px solid #ddd' }}>
                {language == 'kz' ? 'Класс қаріпі' : 'Литерал класса'}
              </th>
              <th style={{ padding: '1rem', border: '1px solid #ddd' }}>
                {language == 'kz' ? 'Өзгерту' : 'Изменить'}
              </th>
              <th style={{ padding: '1rem', border: '1px solid #ddd' }}>
                {language == 'kz' ? 'Жою' : 'Удалить'}
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((cls, index) => (
              <tr key={index}>
                <td style={{ padding: '1rem', border: '1px solid #ddd' }}>{cls.class}</td>
                <td style={{ padding: '1rem', border: '1px solid #ddd' }}>{cls.literal}</td>
                <td style={{ padding: '1rem', border: '1px solid #ddd' }}>
                  <Button
                    type="default"
                    onClick={() => showEditClass(cls._id)}
                    style={{ border: 'none' }}
                  >
                    <EditOutlined />
                  </Button>
                </td>
                <td style={{ padding: '1rem', border: '1px solid #ddd' }}>
                  <Button
                    type="danger"
                    onClick={() => handleDeleteClass(cls._id)}
                    style={{ border: 'none' }}
                  >
                    <DeleteOutlined />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
        <ActiveButton active={viewMode === 'subjects'} onClick={() => setViewMode('subjects')}>
          {language == 'kz' ? 'Пәндер' : 'Предметы'}
        </ActiveButton>
        <ActiveButton active={viewMode === 'classes'} onClick={() => setViewMode('classes')}>
          {language == 'kz' ? 'Класстар' : 'Классы'}
        </ActiveButton>
      </div>

      <div style={{ display: 'flex', justifyContent: 'start', padding: '0 0 2rem 0', gap: '1rem' }}>
        <SearchInput
          onChange={handleInputSearchChange}
          placeholder={language == 'kz' ? 'Іздеуде...' : 'В поисках...'}
          value={searchQuery}
        />
        <div style={{ display: 'flex', gap: '1rem' }}>
          {viewMode === 'subjects' ? (
            <>
              <ActiveButton
                active={subjectSearchMode === 'kz_subject'}
                onClick={() => searchByMode('kz_subject')}
              >
                {language == 'kz' ? 'Қазақша аты' : 'Казахское имя'}
              </ActiveButton>
              <ActiveButton
                active={subjectSearchMode === 'ru_subject'}
                onClick={() => searchByMode('ru_subject')}
              >
                {language == 'kz' ? 'Орысша аты' : 'Русское имя'}
              </ActiveButton>
            </>
          ) : (
            <>
              <ActiveButton
                active={classSearchMode === 'class'}
                onClick={() => searchByMode('class')}
              >
                {language == 'kz' ? 'Класс нөмері' : 'Номер класса'}
              </ActiveButton>
              <ActiveButton
                active={classSearchMode === 'literal'}
                onClick={() => searchByMode('literal')}
              >
                {language == 'kz' ? 'Класс қаріпі' : 'Литерал класса'}
              </ActiveButton>
            </>
          )}
        </div>
      </div>

      {viewMode === 'subjects' ? <SubjectsTable /> : <ClassesTable />}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '1rem 0',
          padding: '0 1rem'
        }}
      >
        <Button onClick={showAddModal} className={styles.submit} type="default" htmlType="submit">
          {viewMode === 'subjects' ? 'Добавить предмет' : 'Добавить класс'}
        </Button>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ChangePageButton onClick={handlePrevPage} disabled={currentPage === 0}>
            {language == 'kz' ? 'Алдыңғы' : 'Предыдущий'}
          </ChangePageButton>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
            {currentPage + 1} / {totalPages}
          </div>
          <ChangePageButton onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
            {language == 'kz' ? 'Келесі' : 'Следущий'}
          </ChangePageButton>
        </div>
      </div>

      <Modal
        title={
          viewMode === 'subjects'
            ? selectedSubjectId
              ? 'Edit Subject'
              : 'Add Subject'
            : selectedClassId
              ? 'Edit Class'
              : 'Add Class'
        }
        visible={addModalVisible || editModalVisible}
        onCancel={handleAddModalCancel}
        footer={null}
      >
        <Form
          variant="filled"
          style={{ padding: '2rem 0' }}
          onFinish={
            viewMode === 'subjects'
              ? selectedSubjectId
                ? handleUpdateSubject
                : handleSubmitSubject
              : selectedClassId
                ? handleUpdateClass
                : handleSubmitClass
          }
        >
          {viewMode === 'subjects' ? (
            <>
              <Form.Item
                name="kz_subject"
                rules={[{ required: true, message: 'Please input the Kazakh subject name!' }]}
              >
                <div className={styles.input_group}>
                  <Input
                    id="kz_subject_input"
                    value={kzName}
                    onChange={(e) => setKzName(e.target.value)}
                    placeholder=""
                    className={styles.form_input}
                  />
                  <label htmlFor="kz_subject_input" className={styles.form_input_label}>
                    {language == 'kz' ? 'Қазақша пән атауы' : 'Имя предмета по казахский'}
                  </label>
                </div>
              </Form.Item>

              <Form.Item
                name="ru_subject"
                rules={[{ required: true, message: 'Please input the Russian subject name!' }]}
              >
                <div className={styles.input_group}>
                  <Input
                    id="ru_subject_input"
                    value={ruName}
                    placeholder=""
                    onChange={(e) => setRuName(e.target.value)}
                    className={styles.form_input}
                  />
                  <label htmlFor="ru_subject_input" className={styles.form_input_label}>
                    {language == 'kz' ? 'Орысша пән атауы' : 'Имя предмета по русский'}
                  </label>
                </div>
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                name="class"
                rules={[{ required: true, message: 'Please input the class number!' }]}
              >
                <div className={styles.input_group}>
                  <Input
                    id="class_input"
                    value={classNumber}
                    onChange={(e) => setClassNumber(e.target.value)}
                    placeholder=""
                    className={styles.form_input}
                  />
                  <label htmlFor="class_input" className={styles.form_input_label}>
                    {language == 'kz' ? 'Класс нөмері' : 'Класс номера'}
                  </label>
                </div>
              </Form.Item>

              <Form.Item
                name="literal"
                rules={[
                  { required: true, message: 'Внесите литерал класса' },
                  { pattern: /^[a-zA-Z]$/, message: 'Литерал должен быть одно буквенным!' }
                ]}
              >
                <div className={styles.input_group}>
                  <Input
                    id="literal_input"
                    value={classLiteral}
                    onChange={(e) => setClassLiteral(e.target.value)}
                    placeholder=""
                    className={styles.form_input}
                    maxLength={1}
                  />
                  <label htmlFor="literal_input" className={styles.form_input_label}>
                    {language == 'kz' ? 'Класс қаріпі' : 'Литерал класса'}
                  </label>
                </div>
              </Form.Item>
            </>
          )}

          <Form.Item>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button
                onClick={handleAddModalCancel}
                className={styles.submit}
                type=""
                htmlType="cancel"
              >
                {language == 'kz' ? 'Бас тарту' : 'Отменить'}
              </Button>
              <Button className={styles.submit} type="primary" htmlType="submit">
                {selectedSubjectId || selectedClassId ? 'Update' : 'Submit'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MyClassTable;
