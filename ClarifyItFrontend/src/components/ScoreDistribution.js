import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const ScoreDistribution = ({ students, onHoverRange }) => {
  const totalMarks = 10;
  const scores = students.map((student) => student.score);
  const distribution = Array(totalMarks + 1).fill(0);

  scores.forEach((score) => {
    distribution[score]++;
  });

  const data = {
    labels: Array.from({ length: totalMarks + 1 }, (_, i) => i),
    datasets: [
      {
        label: "Number of Students",
        data: distribution,
        backgroundColor: "#4caf50",
        borderColor: "#388e3c",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `Score: ${context.label}, Students: ${context.raw}`,
        },
      },
    },
    onHover: (event, chartElement) => {
      if (chartElement.length) {
        const index = chartElement[0].index;
        onHoverRange([index, index]);
      } else {
        onHoverRange(null);
      }
    },
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "20px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ScoreDistribution;
