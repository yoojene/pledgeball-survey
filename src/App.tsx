import { Button } from '@mui/material';
import { getFirestore } from 'firebase/firestore/lite';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import './App.css';
import Footer from './components/Footer/Footer';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Survey from './components/Survey/Survey';

function App() {
  const app = useFirebaseApp();

  const firestore = getFirestore(app);

  return (
    <FirestoreProvider sdk={firestore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/survey/1"
            element={
              <div className="App">
                <Header />
                <Survey />
                <Footer route={'/survey/2'} title={'Next'}></Footer>
              </div>
            }
          />
          <Route
            path="/survey/2"
            element={
              <div className="App">
                <Header />
                <Survey />
                <Footer route={'/survey/3'} title={'Next'}></Footer>
              </div>
            }
          />
          <Route
            path="/survey/3"
            element={
              <div className="App">
                <Header></Header>
                <Survey />
                <Footer route={'/finish'} title={'Finish'}></Footer>
              </div>
            }
          />
          <Route
            path="/finish"
            element={
              <div className="App">
                <Header></Header>
                <h1>All Done, submit your answers?</h1>
                {/* <Survey /> */}
                <div className="buttons">
                  <Button
                    className={'submit-button'}
                    variant="contained"
                    onClick={() => console.log('submit data')}
                  >
                    Submit Answers
                  </Button>

                  <Footer route={'/'} title={'Start Again?'}></Footer>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </FirestoreProvider>
  );
}

export default App;
