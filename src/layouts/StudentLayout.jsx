import React, { useState } from 'react'
import styled from 'styled-components';

import StudentSidebar from '../components/sidebars/StudentSidebar'
import Header from '../components/organism/header/Header';


const ContentWrapper = styled.div`
  // margin-right: 320px;
  padding: 40px 0 0 130px;
  transition: 0.5s;

  @media screen and (max-width: 800px) {
    padding: 40px 0 0 60px;
  }
`;

const StudentLayout = ({ children, navigateToLogin }) => {
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
      <StudentSidebar expanded={sidebarExpanded} navigateToLogin={navigateToLogin} closeSidebar={closeSidebar}/>
      
      <ContentWrapper 
        style={sidebarExpanded ? {opacity: '0.3'} : {opacity: '1'}}
      >
        {children}
      </ContentWrapper>
    </>
  );
};

export default StudentLayout;