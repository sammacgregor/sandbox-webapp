import React from 'react';
import './App.css';
import Backlog from './Backlog/Interface/Backlog';
import Container from '@material-ui/core/Container';



function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <Backlog />
        </Container>
    </div>
  );
}

export default App;
