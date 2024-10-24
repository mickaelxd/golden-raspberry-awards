
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from '../routes';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Container, Content } from './styles';

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Sidebar />
        <Content>
          <RoutesComponent />
        </Content>
      </Container>
    </Router>
  );
}

export default App;
