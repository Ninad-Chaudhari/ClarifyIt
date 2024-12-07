import React, { useState } from "react";
import axios from "axios";
import "../styles/StudentDetail.css";

const StudentDetail = ({ responses }) => {
  const [chatHistory, setChatHistory] = useState([]); // Stores the chat messages
  const [currentMessage, setCurrentMessage] = useState(""); // For user's current input
  const [isChatOpen, setIsChatOpen] = useState(false); // Toggles the chat modal
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls

  const handleAnalyze = async (response) => {
    try {
      const {
        QuestionText,
        StudentResponse,
        CorrectAnswer,
        AnswerAText,
        AnswerBText,
        AnswerCText,
        AnswerDText,
      } = response;

      // Map answer choices to their corresponding text
      const answerMap = {
        A: AnswerAText,
        B: AnswerBText,
        C: AnswerCText,
        D: AnswerDText,
      };

      // Validate required fields
      if (!QuestionText || !StudentResponse || !CorrectAnswer || !answerMap[StudentResponse] || !answerMap[CorrectAnswer]) {
        throw new Error("Incomplete or invalid response data.");
      }

      // Initial prompt to send to the backend
      const initialPrompt = `
        Question: ${QuestionText}
        Correct Answer: ${answerMap[CorrectAnswer]}
        Student's Wrong Answer: ${answerMap[StudentResponse]}

        What might be the student's misconception for selecting the wrong answer? Please explain and offer a detailed clarification.
      `;

      setIsLoading(true);

      // Send initial prompt to the backend
      const apiResponse = await axios.post("http://localhost:5000/api/analyze", {
        question: QuestionText,
        studentAnswer: answerMap[StudentResponse],
        correctAnswer: answerMap[CorrectAnswer],
      });

      // Update chat history with the initial exchange
      setChatHistory([
        { role: "user", content: initialPrompt },
        { role: "assistant", content: apiResponse.data.misconception },
      ]);
      setIsChatOpen(true);
    } catch (error) {
      console.error("Error during Analyze:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    try {
      // Add the user's message to the chat history
      const updatedHistory = [
        ...chatHistory,
        { role: "user", content: currentMessage },
      ];

      setChatHistory(updatedHistory); // Update chat history in the UI
      setIsLoading(true);

      // Send the updated history to the backend
      const apiResponse = await axios.post("http://localhost:5000/api/chat", {
        message: currentMessage,
        chatHistory: updatedHistory,
      });

      // Add the AI's response to the chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "assistant", content: apiResponse.data.response },
      ]);
      setCurrentMessage(""); // Clear the input box
    } catch (error) {
      console.error("Error during chat:", error.message);
      alert("Error sending message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setChatHistory([]);
    setCurrentMessage("");
  };

  return (
    <>
      <table className="student-detail-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Correct Answer</th>
            <th>Student Response</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response, index) => {
            const isCorrect = response.CorrectAnswer === response.StudentResponse;

            return (
              <tr
                key={index}
                className={`student-detail-row ${
                  isCorrect ? "correct" : "incorrect"
                }`}
              >
                <td>{response.QuestionText}</td>
                <td>{response.CorrectAnswer}</td>
                <td>{response.StudentResponse}</td>
                <td>
                  <button
                    onClick={() => handleAnalyze(response)}
                    disabled={isCorrect || isLoading}
                  >
                    {isLoading ? "Analyzing..." : "Analyze with AI"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="modal-overlay">
          <div className="chat-window">
            <div className="chat-header">
              <h3>Clarifi</h3>
            </div>
            <div className="chat-body">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-message ${
                    msg.role === "user" ? "chat-user" : "chat-assistant"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
            <div className="chat-footer">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your question..."
                disabled={isLoading}
              />
              <button onClick={sendMessage} disabled={isLoading}>
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
            <button className="close-modal" onClick={closeChat}>
              Close Chat
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentDetail;
