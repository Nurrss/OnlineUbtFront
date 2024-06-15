import React, { useEffect, useState, useContext } from 'react';
import styles from './QuestonsBase.module.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Form, Input, Button, Select } from 'antd';

import { LanguageContext } from '../../contexts/LanguageContext';

const ChangeButton = styled.button`
  color: #000;
  font-size: 1.5rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  width: min-content;
  background-color: unset;
`;

const QuestionDatabase = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [topics, setTopics] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [kzTopicName, setKzTopicName] = useState('');
  const [rusTopicName, setRusTopicName] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);

  const [topicLanguage, setTopicLanguage] = useState('kz');

  const { language } = useContext(LanguageContext);

  async function fetchTopics() {
    const teachersSubject = localStorage.getItem('teachersSubject');
    console.log('teachersSubject', teachersSubject);
    try {
      const response = await axios.get(`https://ubt-server.vercel.app/subjects/${teachersSubject}`);
      console.log('topics: ', response.data.topics);
      setTopics(response.data.topics);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTopics();
  }, []);

  const itemsPerPage = 10;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, topics.length);
  const visibleData = topics.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
  };

  const handleAddModalCancel = () => {
    setAddModalVisible(false);
    setSelectedSubjectId('');
    setKzTopicName('');
    setRusTopicName('');
  };

  const toggleLanguage = () => {
    switch (topicLanguage) {
      case 'kz':
        setTopicLanguage('ru');
        break;
      case 'ru':
        setTopicLanguage('kz');
        break;
      default:
        setTopicLanguage('kz');
    }
  };

  const handleSubmit = async () => {
    const teachersSubject = localStorage.getItem('teachersSubject');
    console.log('teachersSubject', teachersSubject);

    if (!teachersSubject || !kzTopicName || !rusTopicName) {
      alert('Please select a subject and enter the topic names in both languages.');
      return;
    }

    try {
      const response = await axios.post('https://ubt-server.vercel.app/topics/add/', {
        subjectId: teachersSubject,
        kz_title: kzTopicName,
        ru_title: rusTopicName
      });

      console.log('Topic added:', response.data);
      setAddModalVisible(false);
      setSelectedSubjectId('');
      setKzTopicName('');
      setRusTopicName('');
      fetchTopics();
    } catch (error) {
      console.error('Error adding topic:', error);
    }
  };

  return (
    <>
      <Modal
        title="Add Topic"
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
          {/* <Form.Item
            name="subject"
            rules={[
              {
                required: true,
                message: 'Please select a subject!'
              }
            ]}
          >
            <Select
              placeholder="Select a subject"
              value={selectedSubjectId}
              onChange={(value) => setSelectedSubjectId(value)}
            >
              {subjects.map((subject) => (
                <Select.Option key={subject._id} value={subject._id}>
                  {subject.kz_subject}
                </Select.Option>
              ))}
            </Select>
          </Form.Item> */}
          <Form.Item
            name="kzTopicName"
            rules={[
              {
                required: true,
                message: 'Please input the topic name in Kazakh!'
              }
            ]}
          >
            <div className={styles.input_group}>
              <label htmlFor="kz_topic_name_input" className={styles.form_input_label}>
                Topic Name (Kazakh)*
              </label>
              <Input
                id="kz_topic_name_input"
                value={kzTopicName}
                onChange={(e) => setKzTopicName(e.target.value)}
                placeholder="Topic Name (Kazakh)"
                className={styles.form_input}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="rusTopicName"
            rules={[
              {
                required: true,
                message: 'Please input the topic name in Russian!'
              }
            ]}
          >
            <div className={styles.input_group}>
              <label htmlFor="rus_topic_name_input" className={styles.form_input_label}>
                Topic Name (Russian)*
              </label>
              <Input
                id="rus_topic_name_input"
                value={rusTopicName}
                onChange={(e) => setRusTopicName(e.target.value)}
                placeholder="Topic Name (Russian)"
                className={styles.form_input}
              />
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
      <div className={styles.add_page_container}>
        <h1 className="text-lg font-bold mb-4">
          {language == 'kz' ? 'Сұрақтар базасы' : 'База вопросов'}
        </h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2rem'
          }}
        >
          <Link to="/new_task" className={styles.add_question}>
            {language == 'kz' ? 'Сұрақ қосу' : 'Добавить вопрос'}
          </Link>
          <button
            style={{
              padding: '.7rem 1rem',
              backgroundColor: '#009172',
              color: '#fff',
              borderRadius: '.5rem'
            }}
            onClick={toggleLanguage}
          >
            {topicLanguage === 'kz' ? 'kz' : 'ru'}
          </button>
        </div>

        <div className="app-container">
          <div className={styles.base_container}>
            <div className="container">
              <div className="row table_row">
                <div className="col-1 table_items">#</div>
                <div className="col-6 table_items">
                  {language == 'kz' ? 'Тақырып аты' : 'Имя темы'}
                </div>
                <div className="col-2 table_items">
                  {language == 'kz' ? '1 баллдық сұрақтар' : 'Вопросы 1 балл'}
                </div>
                <div className="col-2 table_items">
                  {language == 'kz' ? '2 баллдық сұрақтар' : 'Вопросы 2 балл'}
                </div>
              </div>
              {visibleData.map((topic, index) => (
                <div className="row table_row" key={index}>
                  <div className="col-1 table_items">{index + 1}</div>
                  <div className="col-6 table_items">
                    {topicLanguage === 'kz' ? topic.kz_title : topic.ru_title}
                  </div>
                  <div className="col-2 table_items">
                    {topicLanguage === 'kz'
                      ? topic.kz_onePointQuestionIds?.length ?? 0
                      : topic.ru_onePointQuestionIds?.length ?? 0}
                  </div>
                  <div className="col-2 table_items">
                    {topicLanguage === 'kz'
                      ? topic.kz_twoPointsQuestionIds?.length ?? 0
                      : topic.ru_twoPointsQuestionIds?.length ?? 0}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ChangeButton onClick={handlePrevPage} disabled={currentPage === 0}>
                {'<'}
              </ChangeButton>
              <ChangeButton
                onClick={handleNextPage}
                disabled={endIndex >= topics.length || visibleData.length === 0}
              >
                {'>'}
              </ChangeButton>
            </div>
          </div>
        </div>
        <div className={styles.add_question} onClick={() => setAddModalVisible(true)}>
          {language == 'kz' ? 'Тақырып қосу' : 'Добавить тему'}
        </div>
      </div>
    </>
  );
};

export default QuestionDatabase;
