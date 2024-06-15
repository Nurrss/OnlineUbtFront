import React from 'react';
import './Sidebar.css';

import analyseExam from './../../assets/img/icons/analyse_exam.png';
import analyseExamDark from './../../assets/img/icons/analyse_exam_black.png';

import students from './../../assets/img/icons/students.png';
import studentsDark from './../../assets/img/icons/students_black.png';

import teachers from './../../assets/img/icons/teachers.png';
import teachersDark from './../../assets/img/icons/teachers_black.png';

import signOut from './../../assets/img/icons/sign_out.png';
import signOutDark from './../../assets/img/icons/sign_out_black.png';

import book from './../../assets/img/icons/book.png';
import bookDark from './../../assets/img/icons/book_black.png';

import { Link } from 'react-router-dom';

const AdminSideBar = ({ expanded, navigateToLogin, closeSidebar }) => {
  return (
    <>
      <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-icons">
            <Link to="/exams_admin" className="icon" onClick={closeSidebar}>
              {expanded ? <img src={analyseExamDark} /> : <img src={analyseExam} />}
              {expanded && <div className="title">Анализ экзамена</div>}
            </Link>
            <Link to="/students" className="icon" onClick={closeSidebar}>
              {expanded ? <img src={studentsDark} /> : <img src={students} />}
              {expanded && <div className="title">Ученики</div>}
            </Link>
            <Link to="/teachers" className="icon" onClick={closeSidebar}>
              {expanded ? <img src={teachersDark} /> : <img src={teachers} />}
              {expanded && <div className="title">Учителя</div>}
            </Link>
            <Link to="/subjects" className="icon" onClick={closeSidebar}>
              {expanded ? <img src={bookDark} /> : <img src={book} />}
              {expanded && <div className="title">Предметы</div>}
            </Link>
            <hr className="hr" />
            <Link to="/" onClick={navigateToLogin} className="icon">
              {expanded ? <img src={signOutDark} /> : <img src={signOut} />}
              {expanded && <div className="title">Выйти</div>}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
