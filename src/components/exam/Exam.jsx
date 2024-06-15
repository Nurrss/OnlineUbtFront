import timeIcon from '../../assets/img/icons/time-icon.svg';
import dateIcon from '../../assets/img/icons/date-icon.svg';
import { Link } from 'react-router-dom';
import './Exam.css';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useContext } from 'react';

const Exam = ({ examId, startedAt, finishedAt, isSelected, onClick }) => {
  const { language } = useContext(LanguageContext);

  return (
    <li className={`exams__card ${isSelected ? 'selected' : ''}`} onClick={() => onClick(examId)}>
      <div className="exams__card-title">ЕНТ</div>
      <div className="exams__card__list">
        <div className="exams__card__list-text">{language == 'kz' ? 'Басталуы' : 'Начало'}</div>
        <div className="exams_card__list-container">
          <img className="exams__card__list-img" src={timeIcon} alt="" />
          <p className="exams__card__list-text">{startedAt}</p>
        </div>
      </div>
      <div className="exams__card__list">
        <div className="exams__card__list-text">{language == 'kz' ? 'Аяқталуы' : 'Конец'}</div>
        <div className="exams_card__list-container">
          <img className="exams__card__list-img" src={dateIcon} alt="" />
          <p className="exams__card__list-text">{finishedAt}</p>
        </div>
      </div>
      <Link to={`/filter?selectedExamId=${examId}`} className="exams__card__button">
        <button className="exams__card__button-btn main__btn">
          {language == 'kz' ? 'Бастау' : 'Начать'}
        </button>
      </Link>
    </li>
  );
};

export default Exam;
