import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';

import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <h1>Welcome to the survey</h1>
      <Footer route={'/survey-one'} title={'Start'}></Footer>
    </div>
  );
}

export default App;
