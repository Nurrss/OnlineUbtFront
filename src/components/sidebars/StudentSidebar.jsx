import React from 'react';
import './Sidebar.css'; // Import your sidebar CSS file

import myExams from './../../assets/img/icons/exam.png';
import myExamsDark from './../../assets/img/icons/exam_black.png';

import results from './../../assets/img/icons/results.png';
import resultsDark from './../../assets/img/icons/results_black.png';

import signOut from './../../assets/img/icons/sign_out.png';
import signOutDark from './../../assets/img/icons/sign_out_black.png';

import { Link } from 'react-router-dom';

const StudentSideBar = ({ expanded, navigateToLogin, closeSidebar }) => {
  return (
    <>
      <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-icons">
            <Link to="/exams" className="icon" onClick={closeSidebar}>
              {expanded ? <img src={myExamsDark} /> : <img src={myExams} />}
              {expanded && <div className="title">Мои экзамены</div>}
            </Link>
            <Link to="/done_exams" className="icon" onClick={closeSidebar}>
              {expanded ? <img src={resultsDark} /> : <img src={results} />}
              {expanded && <div className="title">Результаты</div>}
            </Link>
            <hr className="hr" />
            <Link style={{ marginTop: '-2rem' }} to="/" onClick={navigateToLogin} className="icon">
              {expanded ? <img src={signOutDark} /> : <img src={signOut} />}
              {expanded && <div className="title">Выйти</div>}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSideBar;
