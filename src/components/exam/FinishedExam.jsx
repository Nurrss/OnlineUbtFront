import './Exam.css';
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import timeIcon from '../../assets/img/icons/time-icon.svg';
import dateIcon from '../../assets/img/icons/date-icon.svg';
import { LanguageContext } from '../../contexts/LanguageContext';

const FinishedExam = ({ time, day, points }) => {
  const { language } = useContext(LanguageContext);

  return (
    <>
      <li className="exams__card">
        <div className="exams__card-title">ЕНТ</div>
        <div className="exams__card__list">
          <div className="exams__card__list-text">{language == 'kz' ? 'Уақыты' : 'Время'}</div>
          <div className="exams_card__list-container">
            <img className="exams__card__list-img" src={timeIcon} alt="" />
            <p>{time}</p>
          </div>
        </div>
        <div className="exams__card__list">
          <div className="exams__card__list-text">{language == 'kz' ? 'Күн' : 'День'}</div>
          <div className="exams_card__list-container">
            <img className="exams__card__list-img" src={dateIcon} alt="" />
            <p>{day}</p>
          </div>
        </div>
        <div className="exams__card__list">
          <div className="exams__card__list-text">{language == 'kz' ? 'Баллдар' : 'Баллы'}</div>
          <div className="exams_card__list-container">
            <img className="exams__card__list-img" src={dateIcon} alt="" />
            <p>{points} балл</p>
          </div>
        </div>
        <div className="exams__card__button">
          <Link to="/exam_results" className="exams__card__button-btn main__btn">
            {language == 'kz' ? 'Қосымша' : 'Подробнее'}
          </Link>
        </div>
      </li>
    </>
  );
};

export default FinishedExam;
