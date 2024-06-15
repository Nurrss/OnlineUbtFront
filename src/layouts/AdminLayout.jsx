import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

import AdminSidebar from '../components/sidebars/AdminSidebar'
import Header from '../components/organism/header/Header';


const ContentWrapper = styled.div`
  // margin-right: 320px;
  padding: 40px 0 0 130px;
  transition: 0.5s;
  position: relative;

  &.expanded {
    pointer-events: none; /* Disable clicking on the main content */
    opacity: 0.5; /* Lower opacity */
  }
  
  @media screen and (max-width: 800px) {
    padding: 40px 0 0 60px;
  }
`;

const AdminLayout = ({ children, navigateToLogin }) => {
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
      <AdminSidebar expanded={sidebarExpanded} navigateToLogin={navigateToLogin} closeSidebar={closeSidebar}/>
      <ContentWrapper className={sidebarExpanded ? 'expanded' : ''} 
        // style={{ marginRight: isRightBarClosed ? '0px' : '320px' }}
      >
        {/* <Overlay expanded={sidebarExpanded} /> */}
        {children}
      </ContentWrapper>
    </>
  );
};

export default AdminLayout;