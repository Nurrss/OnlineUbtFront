import { useEffect, useState, useContext } from 'react';
import Exam from '../components/exam/Exam';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';

import { LanguageContext } from '../contexts/LanguageContext';

const ExamContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const MainTitle = styled.div`
  font-size: 36px;
  font-weight: bold;

  @media screen and (max-width: 1000px) {
    font-size: 28px;
  }

  @media screen and (max-width: 500px) {
    font-size: 24px;
  }
`;

const ExamsList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Exams = () => {
  const [upExams, setUpExams] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    async function fetchExams() {
      try {
        const response = await axios.get('https://ubt-server.vercel.app/exams/');
        setUpExams(response.data);
        console.log('exams:', response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchExams();
  }, []);

  const handleExamClick = (examId) => {
    setSelectedExamId(examId);
  };

  return (
    <>
      <ExamContainer>
        <MainTitle>{language === 'kz' ? 'Алдағы емтихандар' : 'Предстоящие экзамены'}</MainTitle>
        <ExamsList>
          {upExams ? (
            upExams.map((exam) => (
              <Exam
                key={exam._id}
                startedAt={moment(exam.startedAt).format('HH:mm DD/MM/YY')}
                examId={exam._id}
                finishedAt={moment(exam.finishedAt).format('HH:mm DD/MM/YY')}
                onClick={handleExamClick}
                isSelected={exam._id === selectedExamId}
              />
            ))
          ) : (
            <p>{language === 'kz' ? 'Емтихандар жоқ...' : 'Экзаменов нет...'}</p>
          )}
        </ExamsList>
      </ExamContainer>
    </>
  );
};

export default Exams;
