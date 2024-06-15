import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReloadOutlined, FormOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Input, DatePicker, Modal } from 'antd';
import moment from 'moment';
import styles from './AnalysisExam.module.css';
import exitImg from '../../assets/imgs/exit.png';
import { LanguageContext } from '../../contexts/LanguageContext';

const { Search } = Input;

const ChangeButton = styled.button`
  color: #000;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  width: min-content;
  background-color: unset;
`;

export const AnalysisExam = () => {
  const { language } = useContext(LanguageContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [exam, setExam] = useState({ examType: 'random' });
  const [selectedOption, setSelectedOption] = useState('random');

  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  const [createExamVisible, setCreateExamVisible] = useState(false);
  const [editExamVisible, setEditExamVisible] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);

  const [startSearchDate, setStartSearchDate] = useState(null);
  const [endSearchDate, setEndSearchDate] = useState(null);

  useEffect(() => {
    async function fetchExams() {
      try {
        const response = await axios.get('https://ubt-server.vercel.app/exams/');
        setExams(response.data);
        setFilteredExams(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchExams();
  }, []);

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    console.log(user_id);
  }, []);

  const handleReload = async () => {
    try {
      const response = await axios.get('https://ubt-server.vercel.app/exams/');
      setExams(response.data);
      setFilteredExams(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const showEditExam = (examId) => {
    const examToEdit = exams.find((exam) => exam._id === examId);
    setSelectedExamId(examId);
    setExam({
      examType: examToEdit.examType,
      started_at: moment(examToEdit.startedAt),
      finished_at: moment(examToEdit.finishedAt)
    });
    setStartDateTime(moment(examToEdit.startedAt));
    setEndDateTime(moment(examToEdit.finishedAt));
    setEditExamVisible(true);
  };

  async function handleUpdateExam(event) {
    event.preventDefault();
    const formattedStartDate = startDateTime.toISOString();
    const formattedEndDate = endDateTime.toISOString();

    const updatedExamData = {
      examType: exam.examType,
      started_at: formattedStartDate,
      finished_at: formattedEndDate
    };

    try {
      const response = await axios.put(
        `https://ubt-server.vercel.app/exams/${selectedExamId}`,
        updatedExamData
      );
      console.log('Exam updated successfully', response.data);
      setEditExamVisible(false);
      setSelectedExamId(null);
      handleReload(); // Reload the exams after updating
    } catch (error) {
      console.error(error);
    }
  }

  const handleStartDateTimeChange = (date) => {
    setStartDateTime(date);
  };

  const handleEndDateTimeChange = (date) => {
    setEndDateTime(date);
  };

  const isButtonDisabled = () => {
    return !startDateTime || !endDateTime || endDateTime.isBefore(startDateTime);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterExams(event.target.value, startSearchDate, endSearchDate);
  };

  const handleStartSearchDateChange = (date) => {
    setStartSearchDate(date);
    filterExams(searchTerm, date, endSearchDate);
  };

  const handleEndSearchDateChange = (date) => {
    setEndSearchDate(date);
    filterExams(searchTerm, startSearchDate, date);
  };

  const filterExams = (searchTerm, startSearchDate, endSearchDate) => {
    let filtered = exams;

    if (searchTerm) {
      filtered = filtered.filter((exam) =>
        exam.examType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (startSearchDate) {
      filtered = filtered.filter((exam) =>
        moment(exam.startedAt).isSameOrAfter(moment(startSearchDate), 'day')
      );
    }

    if (endSearchDate) {
      filtered = filtered.filter((exam) =>
        moment(exam.finishedAt).isSameOrBefore(moment(endSearchDate), 'day')
      );
    }

    setFilteredExams(filtered);
  };

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setExam({ ...exam, examType: selectedValue });
    setSelectedOption(selectedValue);
    console.log('Selected Exam Type:', selectedValue);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const formattedStartDate = startDateTime.toISOString();
    const formattedEndDate = endDateTime.toISOString();
    const newExamData = {
      examType: exam.examType,
      started_at: formattedStartDate,
      finished_at: formattedEndDate
    };

    const { data } = await axios.post('https://ubt-server.vercel.app/exams/add', newExamData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(data);
    handleCreateExamCancel();
    handleReload(); // Reload the exams after creating a new one
  }

  const showCreateExam = () => {
    setCreateExamVisible(true);
  };

  const handleCreateExamCancel = () => {
    setCreateExamVisible(false);
  };

  const handleEditExamCancel = () => {
    setEditExamVisible(false);
  };

  const itemsPerPage = 10;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredExams.length);
  const visibleData = filteredExams.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
  };

  return (
    <>
      <Modal
        visible={createExamVisible}
        onCancel={handleCreateExamCancel}
        footer={[
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'end' }} key="buttons">
            <button onClick={handleCreateExamCancel} className={styles.cancelButton}>
              {language == 'kz' ? 'Жою' : 'Отмена'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isButtonDisabled()}
              className={styles.saveButton}
            >
              {language == 'kz' ? 'Сақтау' : 'Сохранить'}
            </button>
          </div>
        ]}
      >
        <div className={styles.modal_container}>
          <h2>{language == 'kz' ? 'Экзамен құру' : 'Создать экзамен'}</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              placeholder={language == 'kz' ? 'Күн/уақыт бастауы' : 'Начало дата/время'}
              onChange={handleStartDateTimeChange}
              format="YYYY-MM-DD HH:mm"
              value={startDateTime}
            />
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              placeholder={language == 'kz' ? 'Күн/уақыт соңы' : 'Конец дата/время'}
              onChange={handleEndDateTimeChange}
              format="YYYY-MM-DD HH:mm"
              value={endDateTime}
            />

            <h2>{language == 'kz' ? 'Сұрақ типтері' : 'Тип вопросов'}</h2>
            <label>
              <input
                type="radio"
                value="random"
                checked={selectedOption === 'random'}
                onChange={handleOptionChange}
              />
              {language == 'kz' ? 'Рандомлы сұрақтар' : 'Рандомные вопросы'}
            </label>

            <label>
              <input
                type="radio"
                value="last"
                checked={selectedOption === 'last'}
                onChange={handleOptionChange}
              />
              {language == 'kz' ? 'Соңғы сұрақтар' : 'Последние вопросы '}
            </label>
          </form>
        </div>
      </Modal>

      <Modal
        visible={editExamVisible}
        onCancel={handleEditExamCancel}
        footer={[
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'end' }} key="buttons">
            <button onClick={handleEditExamCancel} className={styles.cancelButton}>
              Отмена
            </button>
            <button
              onClick={handleUpdateExam}
              disabled={isButtonDisabled()}
              className={styles.saveButton}
            >
              Сохранить
            </button>
          </div>
        ]}
      >
        <div className={styles.modal_container}>
          <h2>Редактировать экзамен</h2>
          <form onSubmit={handleUpdateExam} className={styles.form}>
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              placeholder="Начало дата/время*"
              onChange={handleStartDateTimeChange}
              format="YYYY-MM-DD HH:mm"
              value={startDateTime}
            />
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              placeholder="Конец дата/время*"
              onChange={handleEndDateTimeChange}
              format="YYYY-MM-DD HH:mm"
              value={endDateTime}
            />

            <h2>Тип вопросов</h2>
            <label>
              <input
                type="radio"
                value="random"
                checked={selectedOption === 'random'}
                onChange={handleOptionChange}
              />
              Рандомные вопросы
            </label>

            <label>
              <input
                type="radio"
                value="last"
                checked={selectedOption === 'last'}
                onChange={handleOptionChange}
              />
              Последние вопросы
            </label>
          </form>
        </div>
      </Modal>

      <div className={styles.examContainer}>
        <div className={styles.first_container}>
          <h3>{language == 'kz' ? 'Экзамендер' : 'Экзамены'}</h3>
          <div className={styles.searchBar}>
            <DatePicker
              placeholder={language == 'kz' ? 'Басталу уаұыт' : 'Поиск по начальной дате'}
              onChange={handleStartSearchDateChange}
              style={{ marginLeft: '10px' }}
            />
            <DatePicker
              placeholder="Поиск по конечной дате"
              onChange={handleEndSearchDateChange}
              style={{ marginLeft: '10px' }}
            />
            <ReloadOutlined onClick={handleReload} />
          </div>
        </div>
        <div className={styles.tableContainer}>
          {exams.length <= 0 ? (
            <p>{language == 'kz' ? 'Экзамен жоқ' : 'Нет экзаменов'}</p>
          ) : (
            <div className="container" style={{ padding: '0' }}>
              <div className={`row table_row ${styles.headerRow}`}>
                <div className="col-3 table_items">{language == 'kz' ? 'Атауы' : 'Название'}</div>
                <div className="col-3 table_items">
                  {language == 'kz' ? 'Басталу күні' : 'Дата начала'}
                </div>
                <div className="col-3 table_items">
                  {language == 'kz' ? 'Біту күні' : 'Дата окончания'}
                </div>
                <div className="col-1 table_items">
                  {language == 'kz' ? 'Тапсырағандар' : 'Сдавших'}
                </div>
              </div>
              {visibleData.map((exams, index) => (
                <div className="row table_row" key={index}>
                  <div className="col-3 table_items">Online UBT</div>
                  <div className="col-3 table_items">
                    {moment(exams.startedAt).format('YYYY-MM-DD HH:mm')}
                  </div>
                  <div className="col-3 table_items">
                    {moment(exams.finishedAt).format('YYYY-MM-DD HH:mm')}
                  </div>
                  <div className="col-1 table_items">{exams.amountOfPassed}</div>
                  <div className="col-2 table_items">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <FormOutlined
                        style={{ fontSize: '2rem' }}
                        onClick={() => showEditExam(exams._id)}
                      />
                      <Link to="/exam_analyse">
                        <img src={exitImg} alt="exit" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'end',
              padding: '1rem'
            }}
          >
            <ChangeButton onClick={handlePrevPage} disabled={currentPage === 0}>
              {'<'}
            </ChangeButton>
            <p>{currentPage + 1}</p>
            <ChangeButton
              onClick={handleNextPage}
              disabled={endIndex >= exams.length || visibleData.length === 0}
            >
              {'>'}
            </ChangeButton>
          </div>
        </div>
        <button onClick={showCreateExam} className={styles.createButton}>
          {language == 'kz' ? 'Емтихан жасау' : 'Создать экзамен'}
        </button>
      </div>
    </>
  );
};
