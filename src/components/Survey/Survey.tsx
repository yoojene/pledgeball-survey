import React, { useState } from "react";
import { doc, getDoc } from "firebase/firestore/lite";
import { useFirestore } from "reactfire";
import Slider from "@mui/material/Slider";
import "./Survey.scss";
import { useSurveyData } from "../../hooks/useSurveyData";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

interface SurveyProps {
  questionFinished: (
    questionId: string,
    question: string,
    value: number
  ) => void;
}
const Survey: React.FC<SurveyProps> = ({ questionFinished }) => {
  const [question, setQuestion] = useState<string | undefined>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const navigate = useNavigate();

  const [sliderValue, setSliderValue] = useState<number>(1);

  const { getMarks, getOtherMarks } = useSurveyData();

  const firestore = useFirestore();
  const location = useLocation();

  let document: string;
  let nextRoute: string;
  let questionScale: string;
  if (location.pathname.endsWith("1")) {
    document = "question-1";
    nextRoute = "/survey/2";
    questionScale =
      "1. Not at all concerned, 2. Fairly concerned, 3. Neither unconcerned or concerned, 4. Very concerned, 5. ";
  } else if (location.pathname.endsWith("2")) {
    document = "question-2";
    nextRoute = "/survey/3";
    questionScale = "1. Strongly disagree - 5. Strongly agree";
  } else {
    document = "question-3";
    nextRoute = "/finish";
    questionScale = "1. Strongly disagree  - 5. Strongly agree";
  }

  const questionsRef = doc(firestore, "survey-questions", document);

  getDoc(questionsRef).then((res) => {
    setQuestion(res.data()!.question);
  });

  const handleOnChange = (ev: any) => {
    setSliderValue(ev.target.value);
    // setDisabled(false);
  };

  return (
    <>
      <div className="question-header">
        <h1>{question}</h1>
      </div>

      <div className="question-slider">
        <Slider
          aria-label="Always visible"
          valueLabelDisplay="off"
          defaultValue={0}
          value={sliderValue}
          marks={document === "question-1" ? getMarks() : getOtherMarks()}
          min={1}
          max={5}
          track={false}
          onChange={handleOnChange}
        />
      </div>
      {/* <div className="question-scale">{questionScale}</div> */}
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          navigate(nextRoute);
          questionFinished(document, question!, sliderValue);
          setSliderValue(1);
          // setDisabled(true);
        }}
        disabled={disabled}
      >
        Next
      </Button>
    </>
  );
};

export default Survey;
