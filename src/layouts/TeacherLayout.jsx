import React, { useState } from 'react'
import styled from 'styled-components';

import TeacherSidebar from '../components/sidebars/TeacherSidebar'
import Header from '../components/organism/header/Header';


const ContentWrapper = styled.div`
  // margin-right: 320px;
  padding: 40px 0 0 130px;
  transition: 0.5s;
  
  @media screen and (max-width: 800px) {
    padding: 40px 0 0 60px;
  }
`;

const TeacherLayout = ({ children, navigateToLogin }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

	const toggleSidebar = () => {
		setSidebarExpanded(!sidebarExpanded);
	};

  const closeSidebar = () => {
    setSidebarExpanded(false);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} sidebarExpanded={sidebarExpanded} />
      <TeacherSidebar expanded={sidebarExpanded} navigateToLogin={navigateToLogin} closeSidebar={closeSidebar}/>
      <ContentWrapper 
        // style={{ marginRight: isRightBarClosed ? '0px' : '320px' }}
      >
        {children}
      </ContentWrapper>
    </>
  );
};

export default TeacherLayout;