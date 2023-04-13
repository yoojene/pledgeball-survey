import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  LinearScale,
  Legend,
  Tooltip,
  Title,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import fetch from "cross-fetch";
import { Button } from "@mui/material";
import "./Chart.scss";
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Title
);

interface SurveyAnswer {
  questionNo: string;
  answerValue: number;
  questionCount: number;
}

const Chart: React.FC = () => {
  const [answers, setAnswers] = useState<SurveyAnswer[]>([]);
  const [chartDataSet, setChartDataSet] = useState<any>([
    {
      label: "Answered 1",
      data: [1, 2],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Answered 2",
      data: [4, 5],
      backgroundColor: "rgb(53, 162, 235)",
    },
    {
      label: "Answered 3",
      data: [6, 7],
      backgroundColor: "rgb(53, 162, 55)",
    },
    {
      label: "Answered 4",
      data: [8, 9],
      backgroundColor: "rgb(53, 162, 2)",
    },
  ]);

  console.log(process.env);

  useEffect(() => {
    fetch(process.env.REACT_APP_FUNCTIONS_URL!, {
      mode: "no-cors",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAnswers(data);
      });
  }, []);

  // Chart JS config
  const options = {
    font: {
      size: 16,
    },
    plugins: {
      tootip: {
        enabled: true,
      },
      legend: {
        display: true,
        position: "bottom" as any,
        font: {
          size: 16,
        },
        title: {
          display: true,
          text: "Answers",
          font: {
            size: 16,
          },
        },
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 16,
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
        },
        ticks: {
          font: {
            size: 16, //this change the font size
          },
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Number of question responses",
          font: {
            size: 16,
          },
        },
      },
    },
    responsive: true,
  };

  useEffect(() => {
    if (answers !== undefined) {
      // Question 1
      const chartDataSet1 = getChartDataSet(
        "question-1",
        1,
        "rgb(255, 99, 132)"
      );
      const chartDataSet2 = getChartDataSet(
        "question-1",
        2,
        "rgb(53, 162, 235)"
      );
      const chartDataSet3 = getChartDataSet(
        "question-1",
        3,
        "rgb(53, 162, 55)"
      );
      const chartDataSet4 = getChartDataSet("question-1", 4, "rgb(53, 253, 2)");
      const chartDataSet5 = getChartDataSet("question-1", 5, "rgb(1, 5, 235)");

      setChartDataSet([
        ...chartDataSet1,
        ...chartDataSet2,
        ...chartDataSet3,
        ...chartDataSet4,
        ...chartDataSet5,
      ]);
    }
  }, [answers]);

  // Refresh data from firestore
  const getChartDataSet = (
    questionNo: string,
    answerValue: number,
    colorRgb?: string
  ) => {
    const dataVal: number[] = [];

    const chartDataSet = answers
      .map((ans: SurveyAnswer, idx: number) => {
        console.log(ans);

        if (ans.answerValue === answerValue) {
          dataVal.push(ans.questionCount);
        }

        if (ans.questionNo === questionNo && ans.answerValue === answerValue) {
          return {
            label: `${ans.answerValue}`,
            data: dataVal,
            backgroundColor: colorRgb,
          };
        }
        return null;
      })
      .filter((ans: any) => ans !== null);
    return chartDataSet;
  };

  const getLatestData = () => {
    fetch(process.env.REACT_APP_FUNCTIONS_URL!, {
      mode: "no-cors",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAnswers(data);
      });
  };

  const chartLabels = [
    "How concerned are you about climate change?",
    "I prioritise the environment in all my decision-making in my personal life",
    "I prioritise the environment in all my decision-making in my professional life",
  ];

  return (
    <>
      <div className="chart-title">Survey Results</div>
      <Bar
        data={{
          // labels: ["Question 1", "Question 2", "Question 3"],
          labels: chartLabels,
          datasets: chartDataSet,
        }}
        options={options}
      ></Bar>
      <div className="update-data-btn">
        <Button variant="contained" size="large" onClick={getLatestData}>
          Update data
        </Button>
      </div>
    </>
  );
};

export default Chart;
