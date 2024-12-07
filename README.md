# ClarifyIt: AI-Powered Student Feedback Platform

**ClarifyIt** is an AI-driven platform designed to revolutionize how students receive feedback and understand their learning progress. By analyzing student responses in real time, **ClarifyIt** identifies misconceptions, explains distractors, and provides personalized feedback. At its core is **Clarifi**, an AI chatbot that interacts conversationally with students to help them learn more effectively.
[![ClarifyIt Demo Video]![image](https://github.com/user-attachments/assets/1dd04705-4666-436e-9914-a446a1590625)
](https://youtu.be/oiiCe-rSOts)



---
## Medium
[Blog](https://medium.com/@ninadchaudharioffice/clarifyit-revolutionizing-student-feedback-with-ai-51195536e4e4)
---
## Features
- **Real-Time Feedback**: Instant analysis and feedback on student responses.
- **Distractor Insights**: Explains why distractors are chosen and resolves misunderstandings.
- **Conversational AI**: Chatbot interaction to clarify misconceptions and improve understanding.
- **Interactive Dashboard**: A sleek, dark-themed user interface for educators and students.
- **Batch Processing**: Analyze large datasets of student responses efficiently.

---

## Tech Stack
- **Frontend**: React.js
  - Drag-and-drop file upload.
  - Real-time student analytics.
  - ChatGPT-like interface for interactive learning.
- **Backend**: Flask (optional, if integrated backend is required for API communication)
  - Handles file uploads and response analysis.
  - Context-aware chat management.
- **AI Integration**: Cerebras LLM API
  - Powers fast inference for real-time feedback and conversational AI.

---

## How It Works
1. Educators upload student responses via a drag-and-drop interface.
2. The platform analyzes responses, identifying correct answers, misconceptions, and distractors.
3. Students receive instant feedback through **Clarifi**, the AI chatbot.
4. Educators can access detailed performance insights for the entire class.

---

## Future Roadmap
- **Enhanced Distractor Insights**: Advanced analytics to track distractor trends for better teaching strategies.
- **Voice Chat**: Real-time voice interaction with the Cerebras API.
- **Resource Recommendation**: AI-recommended resources tailored to students' needs using LangChain and Pinecone.
- **"SELF-REFINE"**: AI reflection to dynamically improve response quality.
- **Streamed Responses**: Friendly, chunked replies for a more conversational chat experience.
- **Processing Theoretical Exams**: Expanding capabilities to analyze written, theoretical responses for comprehensive feedback.

---
## Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd ClarifyItBackend
2. Set up a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate    # On Windows: venv\Scripts\activate

3. Install required Python dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate    # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
4. Run the Flask server:
   ```bash
   python app.py

5. Set your Cerebras API key as an environment variable:
   ```bash
   export CEREBRAS_API_KEY=your_api_key

---

## Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ClarifyItFrontend
2. Install dependencies:
   ```bash
   npm install

   
3. Start the development server:
   ```bash
   npm start
---
## Usage
- **Upload Student Responses**: Upload .csv or .xlsx files containing student responses through the drag-and-drop interface.
- **View Analytics**: View real-time performance analytics for students, including total scores and wrong answers.
- **Analyze Responses**: Click on the "Analyze" button to receive instant feedback on wrong answers through the AI-powered chatbot.
- **Chat with Clarifi**: Use the conversational interface to interact with Clarifi and understand misconceptions.

