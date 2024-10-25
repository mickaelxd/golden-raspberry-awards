
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 200px;
  background-color: #f1f1f1;
  min-height: 100vh;
  padding-top: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: block;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: #ddd;
  }
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <ul>
        <li>
          <StyledLink to="/">Dashboard</StyledLink>
        </li>
        <li>
          <StyledLink to="/movies">Movies</StyledLink>
        </li>
      </ul>
    </SidebarContainer>
  );
}

export default Sidebar;
