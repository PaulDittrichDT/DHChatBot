from flask import Flask, render_template, request, jsonify
import chainlit as cl
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Define routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.form.get('user_input')

    # Process user input using chainlit
    response = process_user_input(user_input)

    return jsonify({'response': response})

# Function to process user input using chainlit
def process_user_input(user_input):
    # Use chainlit to process the user's input
    # Replace this with your specific implementation using chainlit
    # For example:
    # response = "You said: " + user_input
    # return response

    # Example using chainlit for PDF QA (replace with your own implementation)
    chain = cl.load_chain("pdf_qa.py")
    response = chain.acall(user_input).get('answer')
    return response

if __name__ == '__main__':
    app.run(debug=True)
