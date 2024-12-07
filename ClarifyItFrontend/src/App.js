import React, { useState } from "react";
import DragAndDrop from "./components/DragAndDrop";
import ScoreDistribution from "./components/ScoreDistribution";
import StudentCard from "./components/StudentCard";
import "./App.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [highlightedRange, setHighlightedRange] = useState(null);

  const handleFileUpload = (parsedData) => {
    const studentData = parsedData.reduce((acc, row) => {
      const { StudentName, CorrectAnswer, StudentResponse } = row;
      const isCorrect = CorrectAnswer === StudentResponse;

      if (!acc[StudentName]) {
        acc[StudentName] = { name: StudentName, score: 0, responses: [] };
      }

      acc[StudentName].score += isCorrect ? 1 : 0;
      acc[StudentName].responses.push(row);

      return acc;
    }, {});

    setStudents(Object.values(studentData));
  };

  const handleHoverRange = (range) => {
    setHighlightedRange(range);
  };

  return (
    <div className="app">
      <header>
        <h1>ClarifyIt</h1>
      </header>
      <DragAndDrop onFileUpload={handleFileUpload} />
      <ScoreDistribution students={students} onHoverRange={handleHoverRange} />
      <div className="student-cards">
        {students.map((student) => (
          <StudentCard
            key={student.name}
            student={student}
            isHighlighted={
              highlightedRange &&
              student.score >= highlightedRange[0] &&
              student.score <= highlightedRange[1]
            }
          />
        ))}
      </div>
    </div>
  );
};

export default App;
