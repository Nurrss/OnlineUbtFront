import React from 'react';
import './Sidebar.css';

import myClass from './../../assets/img/icons/my_class.png';
import myClassDark from './../../assets/img/icons/my_class_black.png';

import questionBase from './../../assets/img/icons/question_base.png';
import questionBaseDark from './../../assets/img/icons/question_base_black.png';

import subjAnalyse from './../../assets/img/icons/subj_analyse.png';
import subjAnalyseDark from './../../assets/img/icons/subj_analyse_black.png';

import signOut from './../../assets/img/icons/sign_out.png';
import signOutDark from './../../assets/img/icons/sign_out_black.png';

import { Link } from 'react-router-dom';

const TeacherSideBar = ({ expanded, navigateToLogin, closeSidebar }) => {
  return (
    <>
      <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-icons">
            <Link to="/my_class" className="icon" onClick={closeSidebar}>
              {expanded ? <img src={myClassDark} /> : <img src={myClass} />}
              {expanded && <div className="title">Мой класс</div>}
            </Link>
            <Link to="/question_base" className="icon" onClick={closeSidebar}>
              {expanded ? <img src={questionBaseDark} /> : <img src={questionBase} />}
              {expanded && <div className="title">База вопросов</div>}
            </Link>
            {/* <Link to='/subject_analyse' className="icon" onClick={closeSidebar}>
                            {expanded ? <img src={subjAnalyseDark}/> : <img src={subjAnalyse}/>}
                            {expanded && <div className="title">Анализ предмета</div>}
                        </Link> */}
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

export default TeacherSideBar;
