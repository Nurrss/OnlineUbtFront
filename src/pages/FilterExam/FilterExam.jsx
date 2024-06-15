import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './FilterExam.module.css';

const FilterExam = () => {
  const [examLanguage, setExamLanguage] = useState('ru'); // 'kazakh' or 'russian'
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [secondId, setSecondId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve selectedExamId from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const selectedExamId = searchParams.get('selectedExamId');

  useEffect(() => {
    async function fetchSubject() {
      const user_data = JSON.parse(localStorage.getItem('user_data'));
      setSecondId(user_data.secondId);

      try {
        const response = await axios.get('https://ubt-server.vercel.app/subjects/');
        console.log('response:', response.data);
        setSubjects(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSubject();
  }, []);

  const handleLanguageChange = (lang) => {
    setExamLanguage(lang);
  };

  const toggleSubject = (subjectId) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter((id) => id !== subjectId));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  async function handleSubmit() {
    if (selectedSubjects.length < 5) {
      alert('Выберите как минимум пять предметов, включая обязательные и выборочные.');
      return;
    }

    const startExam = {
      examId: selectedExamId,
      selectedSubjectIds: selectedSubjects,
      studentId: secondId,
      language: examLanguage
    };

    console.log('startExam', startExam);

    try {
      const response = await axios.post(
        'https://ubt-server.vercel.app/students/startExam/',
        startExam
      );
      console.log('response:', response);
      navigate('/test', { state: { examData: response.data, startExam: startExam } });
    } catch (error) {
      console.error(error);
    }
  }

  const mandatorySubjects = subjects.filter((subject) =>
    ['Грамотность чтения', 'Математическая грамотность', 'История Қазахстана'].includes(
      subject.ru_subject
    )
  );

  const optionalSubjects = subjects.filter(
    (subject) =>
      !['Грамотность чтения', 'Математическая грамотность', 'История Қазахстана'].includes(
        subject.ru_subject
      )
  );

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.heading}>
        <h1>Сдать экзамен</h1>
      </div>
      <div className={styles.container}>
        <div className={`row table_row ${styles.titleButtonsContainer}`}>
          <h4 className="col-3 table_item">Выберите язык экзамена</h4>
          <div className={`col-8 table_item ${styles.chosingBtns}`}>
            <button
              className={`${styles.languageButton} ${examLanguage === 'kz' && styles.languageButtonActive}`}
              onClick={() => handleLanguageChange('kz')}
            >
              На казахском
            </button>
            <button
              className={`${styles.languageButton} ${examLanguage === 'ru' && styles.languageButtonActive}`}
              onClick={() => handleLanguageChange('ru')}
            >
              На русском
            </button>
          </div>
        </div>
        <div className={`row table_row ${styles.titleButtonsContainer}`}>
          <h4 className="col-3 table_item">Обязательные предметы</h4>
          <div className={`col-8 table_item ${styles.chosingBtns}`}>
            {mandatorySubjects.map((subject) => (
              <button
                key={subject._id}
                className={styles.subjectButton}
                onClick={() => toggleSubject(subject._id)}
                disabled={selectedSubjects.includes(subject._id)}
              >
                {subject.ru_subject}
              </button>
            ))}
          </div>
        </div>
        <div className={`row table_row ${styles.titleButtonsContainer}`}>
          <h4 className="col-2 table_item">Выборочные предметы</h4>
          <div className={`col-8 table_item ${[styles.chosingBtns, styles.btnGap].join(' ')}`}>
            {optionalSubjects.map((subject) => (
              <button
                key={subject._id}
                onClick={() => toggleSubject(subject._id)}
                disabled={selectedSubjects.length === 5 && !selectedSubjects.includes(subject._id)}
                className={`${styles.subjectButton} ${selectedSubjects.includes(subject._id) ? styles.selected : styles.unselected}`}
              >
                {subject.ru_subject}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.btnCont}>
        <button className={styles.startButton} onClick={handleSubmit}>
          Начать
        </button>
      </div>
    </div>
  );
};

export default FilterExam;
