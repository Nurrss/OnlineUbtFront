import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import FinishedExam from '../components/exam/FinishedExam';
import { DoneExamList } from '../data/data';
import axios from 'axios';

import { LanguageContext } from '../contexts/LanguageContext';

const ExamContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const MainTitle = styled.text`
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

const DoneExam = () => {
  const [doneExams, setDoneExams] = useState(null);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchDoneExams = async () => {
      const user_data = JSON.parse(localStorage.getItem('user_data'));

      const studentId = {
        studentId: user_data.secondId
      };

      const response = await axios.post(
        `https://ubt-server.vercel.app/students/getAllResultsForStudent`,
        studentId
      );

      console.log(response.data);
      setDoneExams(response.data);
    };

    fetchDoneExams();
  }, []);

  return (
    <>
      <ExamContainer>
        <MainTitle>
          {language == 'kz' ? 'Студент тапсырған емтихандар' : 'Сданные экзамены студента'}
        </MainTitle>
        <ExamsList>
          {doneExams.map((exam) => {
            return <FinishedExam time={exam.time} day={exam.day} points={exam.overallPoints} />;
          })}
        </ExamsList>
      </ExamContainer>
    </>
  );
};

export default DoneExam;
