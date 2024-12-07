from flask import Flask, request, jsonify
import requests
from cerebras.cloud.sdk import Cerebras
from flask_cors import CORS

# Initialize Cerebras client
API = '{Your Cerebras API KEY}'
client = Cerebras(api_key=API)

app = Flask(__name__)

# Enable CORS for frontend-backend communication
CORS(app)

# Endpoint for the initial analysis
@app.route("/api/analyze", methods=["POST"])
def analyze():
    try:
        data = request.json
        question = data.get("question")
        correct_answer = data.get("correctAnswer")
        student_answer = data.get("studentAnswer")

        if not question or not correct_answer or not student_answer:
            return jsonify({"error": "Missing required fields"}), 400

        # Refined prompt for a conversational LLM response
        prompt = f"""
        Hello! Let's discuss your answer to the question below.

        Question: {question}

        The correct answer is: {correct_answer}.
        However, you selected: {student_answer}.

        I understand why {student_answer} might seem like the right answer. Let me explain the reasoning behind the correct answer, {correct_answer}, and clarify any misconceptions that might have occurred.

        [Provide a conversational and empathetic explanation to help the student understand.]

        Can I assist you further in understanding this concept?
        """

        # Query the LLM
        chat_completion = client.chat.completions.create(
            response_format={"type": "text"},
            messages=[{"role": "user", "content": prompt}],
            model="llama3.1-8b",
        )
        
        misconception = chat_completion.choices[0].message.content

        # Return the response to the frontend
        return jsonify({"misconception": misconception})
    
    except Exception as e:
        print("Error calling Cerebras API:", e)
        return jsonify({"error": "Failed to analyze the response."}), 500


# Endpoint for ongoing chat functionality
@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        message = data.get("message")  # Current user message
        chat_history = data.get("chatHistory", [])  # Full chat history

        if not message or not isinstance(chat_history, list):
            return jsonify({"error": "Invalid chat data"}), 400

        # Build the prompt from the chat history
        messages = []
        for chat in chat_history:
            role = chat["role"]  # Either 'user' or 'assistant'
            content = chat["content"]
            messages.append({"role": role, "content": content})

        # Add the current user message to the prompt
        messages.append({"role": "user", "content": message})

        # Query the LLM
        chat_completion = client.chat.completions.create(
            response_format={"type": "text"},
            messages=messages,
            model="llama3.1-8b",
        )

        # Extract AI's response
        ai_response = chat_completion.choices[0].message.content

        # Return AI response to the frontend
        return jsonify({"response": ai_response})
    
    except Exception as e:
        print("Error during chat interaction:", e)
        return jsonify({"error": "Failed to process chat message."}), 500


# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True, port=5000)
