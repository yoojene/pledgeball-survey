import { Button } from "@mui/material";
import { collection, addDoc, getFirestore } from "firebase/firestore/lite";
import { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import "./App.scss";
import Footer from "./components/Footer/Footer";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Survey from "./components/Survey/Survey";

function App() {
  const [surveyAnswer, setSurveyAnswer] = useState<
    { question: string; value: number }[] | []
  >([]);


    // const navigate = useNavigate();

  const app = useFirebaseApp();

  const firestore = getFirestore(app);

  const handleQuestionFinished = (question: string, slider: number) => {
    setSurveyAnswer([...surveyAnswer, ...[{ question, value: slider }]]);
  };

  const handleSubmitAnswers = async () => {
    console.log(surveyAnswer);
    surveyAnswer.forEach(async (ans) => {
      const docRef = await addDoc(collection(firestore, "survey-answers"), ans);

      console.log("Answer written with ID: " + docRef.id);
    });
    setSurveyAnswer([]);
  };

  const handleSurveyFinished = () => {
    setSurveyAnswer([]);
  };

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
                <Survey questionFinished={handleQuestionFinished} />
              </div>
            }
          />
          <Route
            path="/survey/2"
            element={
              <div className="App">
                <Header />
                <Survey questionFinished={handleQuestionFinished} />
              </div>
            }
          />
          <Route
            path="/survey/3"
            element={
              <div className="App">
                <Header></Header>
                <Survey questionFinished={handleQuestionFinished} />
              </div>
            }
          />
          <Route
            path="/finish"
            element={
              <div className="App">
                <Header></Header>
                <div className="title">
                  <h1>All Done, submit your answers?</h1>
                </div>
                <div className="buttons">
                  <Footer
                    route={"/"}
                    title={"Submit Answers?"}
                    footerClicked={handleSubmitAnswers}
                  ></Footer>
                  <Footer
                    route={"/"}
                    title={"Start Again?"}
                    footerClicked={handleSurveyFinished}
                  ></Footer>
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
