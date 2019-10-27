import React from 'react';
import './App.css';
import BoardContainer from './Backlog/Interface/Item/BoardContainer';
import AppBar from './Backlog/Interface/AppBar';
import Container from '@material-ui/core/Container';



function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
      <AppBar />
        <BoardContainer />
        </Container>
    </div>
  );
}

export default App;
