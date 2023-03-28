import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore/lite';
import { useFirestore } from 'reactfire';
import Slider from '@mui/material/Slider';
import './Survey.css';
import { useSurveyData } from '../../hooks/useSurveyData';
import { useLocation } from 'react-router-dom';
export default function Survey() {
  const [question, setQuestion] = useState<string | undefined>();
  const { getMarks } = useSurveyData();
  const firestore = useFirestore();

  const location = useLocation();

  console.log(location.pathname);

  let document;
  if (location.pathname.endsWith('1')) {
    document = 'question-1';
  } else if (location.pathname.endsWith('2')) {
    document = 'question-2';
  } else {
    document = 'question-3';
  }

  const questionsRef = doc(firestore, 'survey-questions', document);

  getDoc(questionsRef).then((res) => {
    console.log(res.data()!.question);
    setQuestion(res.data()!.question);
  });

  const handleOnChange = (ev: any) => {
    console.log(ev.target.value);
  };

  return (
    <>
      <h1>{question}</h1>
      <div className="question-slider">
        <Slider
          aria-label="Always visible"
          valueLabelDisplay="auto"
          defaultValue={0}
          // getAriaValueText={valuetext}

          marks={getMarks()}
          min={0}
          max={5}
          onChange={handleOnChange}
        />
      </div>
    </>
  );
}
