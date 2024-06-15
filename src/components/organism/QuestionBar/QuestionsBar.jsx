import React from 'react';
import styled from 'styled-components';
import { Text } from '../../atoms/CustomText/CustomText';
import { TextWithBg } from '../../atoms/TextBg';
import styles from './QuestionBar.module.css';

const QuestionSetContainer = styled.div`
  overflow: auto; /* Enable scrolling if content exceeds the container */
`;

const QuestionBar = ({
  subjects,
  text,
  onSelect,
  selectedQuestions,
  handleQuestionButtonClick,
  isAnswered,
  currentIndex
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.textnSelectContainer}>
        <Text type="chooseSubject">Выберите предмет:</Text>
        <select className={styles.choose_subj_select} onChange={(e) => onSelect(e.target.value)}>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.answeredContainer}>
        <Text>Отвеченные вопросы</Text>
        <TextWithBg bgColor="#009172" color="#ffffff">
          {text}
        </TextWithBg>
      </div>
      <div className={styles.questionSetContainer}>
        <div className={styles.wrapper}>
          <div className={styles.gridContainer}>
            {selectedQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => handleQuestionButtonClick(index)}
                className={`${styles.button} ${isAnswered(index) ? styles.answered : ''} ${currentIndex === index ? styles.focused : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBar;
