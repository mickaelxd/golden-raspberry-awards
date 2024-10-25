
import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: black;
  color: white;
  padding: 12px;
`;

function Navbar() {
  return (
    <NavbarContainer>
      <h1>Frontend React Test</h1>
    </NavbarContainer>
  );
}

export default Navbar;
