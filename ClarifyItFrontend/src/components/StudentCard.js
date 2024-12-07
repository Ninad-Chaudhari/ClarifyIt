import React, { useState } from "react";
import StudentDetail from "./StudentDetail";
import "../styles/StudentCard.css";

const StudentCard = ({ student, isHighlighted }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <div
        className={`student-card ${isHighlighted ? "highlighted" : ""}`}
        onClick={toggleDetails}
      >
        <h3>{student.name}</h3>
        <p>Total Score: {student.score}</p>
      </div>
      {showDetails && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{student.name}'s Responses</h2>
            <StudentDetail responses={student.responses} />
            <button className="close-modal" onClick={toggleDetails}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentCard;
