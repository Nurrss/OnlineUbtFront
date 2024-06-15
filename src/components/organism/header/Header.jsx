import React, { useState, useEffect } from 'react';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import userLogo from '../../../assets/img/icons/user_logo.svg';
import Logo from '../../../assets/img/icons/Logo.svg';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import config from '../../../../config';
import LanguageSwitcher from '../LanguageSwitcher';

const Header = ({ toggleSidebar, sidebarExpanded }) => {
  // const [language, setLanguage] = useState(localStorage.getItem('siteLanguage') || 'kz');
  const [data, setData] = useState([]);

  const toggleIcon = sidebarExpanded ? (
    <CloseOutlined style={{ marginLeft: '10rem' }} />
  ) : (
    <MenuOutlined className={styles.menu_icon} />
  );

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    console.log('user_data: ', user_data);
    if (user_data) {
      async function getData() {
        try {
          const response = await axios.get(`https://ubt-server.vercel.app/users/${user_data._id}`);
          console.log('fetched_user_data: ', response.data);
          setData(response.data);

          if (response.data.role == 'teacher') {
            const response1 = await axios.get(
              `https://ubt-server.vercel.app/teachers/${user_data.secondId}`
            );
            console.log('subject: ', response1.data);
            localStorage.setItem('teachersSubject', response1.data.subject);
          }
        } catch (error) {
          console.error(error);
        }
      }

      getData();
    }
  }, []);

  // const toggleLanguage = () => {
  //   const newLanguage = language === 'kz' ? 'ru' : 'kz';
  //   setLanguage(newLanguage);
  //   localStorage.setItem('siteLanguage', newLanguage);
  // };

  return (
    <div className={styles.header}>
      <div className={styles.burger_icon}>
        <div onClick={toggleSidebar}>{toggleIcon}</div>
        <img className={styles.logo} src={Logo} alt="" />
      </div>
      <div className={styles.header_part2}>
        <span className={`${styles.user_name} ${sidebarExpanded ? styles.expanded : ''}`}></span>
        <p>
          {data.name} {data.surname}
        </p>
        {/* <button className={styles.languageSwitcher} onClick={toggleLanguage}>
          {language === 'kz' ? 'RU' : 'KZ'}
        </button> */}
        <LanguageSwitcher />
        <Link to="/profile">
          <img src={userLogo} className={styles.userLogo} alt="account" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
