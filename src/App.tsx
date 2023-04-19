import { collection, addDoc, getFirestore } from "firebase/firestore/lite";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import "./App.scss";
import Footer from "./components/Footer/Footer";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Survey from "./components/Survey/Survey";
import Chart from "./components/Chart/Chart";
import ButtonNav from "./components/ButtonNav/ButtonNav";

function App() {
  const [surveyAnswer, setSurveyAnswer] = useState<
    { questionId: string; question: string; value: number }[] | []
  >([]);

  const app = useFirebaseApp();

  const firestore = getFirestore(app);

  const handleQuestionFinished = (
    questionId: string,
    question: string,
    slider: number
  ) => {
    setSurveyAnswer([
      ...surveyAnswer,
      ...[{ questionId, question, value: slider }],
    ]);
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
                <Footer></Footer>
              </div>
            }
          />
          <Route
            path="/survey/2"
            element={
              <div className="App">
                <Header />
                <Survey questionFinished={handleQuestionFinished} />
                <Footer></Footer>
              </div>
            }
          />
          <Route
            path="/survey/3"
            element={
              <div className="App">
                <Header></Header>
                <Survey questionFinished={handleQuestionFinished} />
                <Footer></Footer>
              </div>
            }
          />
          <Route
            path="/finish"
            element={
              <div className="App">
                <Header></Header>
                <div className="title">
                  <h1>All done, submit your answers?</h1>
                </div>
                <div className="buttons">
                  <ButtonNav
                    route={"/"}
                    title={"Submit Answers?"}
                    footerClicked={handleSubmitAnswers}
                  ></ButtonNav>
                  <ButtonNav
                    route={"/"}
                    title={"Start Again?"}
                    footerClicked={handleSurveyFinished}
                  ></ButtonNav>
                </div>
                <Footer></Footer>
              </div>
            }
          />
          <Route path="/results" element={<Chart />}></Route>
        </Routes>
      </BrowserRouter>
    </FirestoreProvider>
  );
}

export default App;
