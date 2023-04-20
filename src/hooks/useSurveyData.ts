export const useSurveyData = () => {
  const getMarks = () => {

  const marks = [
    {
      value: 1,
      label: "1. Not at all concerned",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5. Extremely concerned",
    },
  ];

  return marks

  }

  const getOtherMarks = () => {

  const marks = [
    {
      value: 1,
      label: "1. Strongly disagree",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5. Strongly agree",
    },
  ];

  return marks;

  }

  return { getMarks, getOtherMarks };
}