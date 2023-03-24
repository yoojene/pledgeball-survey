import { getFirestore } from "firebase/firestore/lite";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import "./App.css";
import Footer from "./components/Footer/Footer";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Survey from "./components/Survey/Survey";

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
                <h1>first page</h1>
                <Survey />
                <Footer route={"/survey/2"} title={"Next"}></Footer>
              </div>
            }
          />
          <Route
            path="/survey/2"
            element={
              <div className="App">
                <Header />
                <h1>second page</h1>
                <Survey />
                <Footer route={"/survey/3"} title={"Next"}></Footer>
              </div>
            }
          />
          <Route
            path="/survey/3"
            element={
              <div className="App">
                <Header></Header>
                <h1>third page</h1>
                <Survey />
                <Footer route={"/finish"} title={"Finish"}></Footer>
              </div>
            }
          />
          <Route
            path="/finish"
            element={
              <div className="App">
                <Header></Header>
                <h1>All Done</h1>
                <Survey />
                <Footer route={"/"} title={"Start Again?"}></Footer>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </FirestoreProvider>
  );
}

export default App;
