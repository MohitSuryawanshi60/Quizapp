import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quiz from './Quiz';
import AddQuiz from './AddQuiz';
import './App.css'; // Import the CSS file

const App = () => {
    return (
        <Router>
            <div>
                <h1>Quiz Application</h1>
                <nav>
                    <a href="/">Add Quiz</a>
                    <a href="/quizzes">Start Exam</a>
                </nav>
                <Routes>
                    <Route path="/" element={<AddQuiz />} />
                    <Route path="/quizzes" element={<Quiz />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;