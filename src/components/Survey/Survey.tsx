import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore/lite';
import { useFirestore } from 'reactfire';
import Slider from '@mui/material/Slider';
import './Survey.scss';
import { useSurveyData } from '../../hooks/useSurveyData';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

interface SurveyProps {
  questionFinished: (questionId: string, question: string, value: number) => void;
}
const Survey: React.FC<SurveyProps> = ({ questionFinished }) => {
  const [question, setQuestion] = useState<string | undefined>();
  const [disabled, setDisabled] = useState<boolean>(true);

  const navigate = useNavigate();

  const [sliderValue, setSliderValue] = useState<number>(0);

  const { getMarks } = useSurveyData();

  const firestore = useFirestore();
  const location = useLocation();

  let document: string;
  let nextRoute: string;
  if (location.pathname.endsWith('1')) {
    document = 'question-1';
    nextRoute = '/survey/2';
  } else if (location.pathname.endsWith('2')) {
    document = 'question-2';
    nextRoute = '/survey/3';
  } else {
    document = 'question-3';
    nextRoute = '/finish';
  }

  const questionsRef = doc(firestore, 'survey-questions', document);

  getDoc(questionsRef).then((res) => {
    setQuestion(res.data()!.question);
  });

  const handleOnChange = (ev: any) => {
    setSliderValue(ev.target.value);
    setDisabled(false)

  };

  return (
    <>
      <div className="question-header"> 
        <h1>{question}</h1>
      </div>

      <div className="question-slider">
        <Slider
          aria-label="Always visible"
          valueLabelDisplay="auto"
          defaultValue={0}
          value={sliderValue}
          marks={getMarks()}
          min={0}
          max={5}
          onChange={handleOnChange}
        />
      </div>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          navigate(nextRoute);
          questionFinished(document, question!, sliderValue);
          setSliderValue(0);
          setDisabled(true)
        }}
        disabled={disabled}
      >
        Next
      </Button>
    </>
  );
};

export default Survey;
