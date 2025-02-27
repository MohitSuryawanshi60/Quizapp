import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Quiz.css'; // Import the CSS file

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Corrected line

    useEffect(() => {
        const fetchQuizzes = async () => {
            const response = await axios.get('http://localhost:5000/api/quizzes');
            setQuizzes(response.data);
        };
        fetchQuizzes();
    }, []);

    const handleChange = (question, selected) => {
        setAnswers(prev => ({
            ...prev,
            [question]: selected
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizzes.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleSubmit = async () => {
        const formattedAnswers = quizzes.map(quiz => ({
            question: quiz.question,
            selected: answers[quiz.question],
            correct: quiz.answer
        }));

        const response = await axios.post('http://localhost:5000/api/submit', { answers: formattedAnswers });
        setScore(response.data.score);
    };

    return (
        <div className="quiz-container">
            <h1>Quiz</h1>
            {quizzes.length === 0 ? (
                <p>No quizzes available.</p>
            ) : (
                <div>
                    <div className="quiz-question">
                        <h3>{quizzes[currentQuestionIndex].question}</h3>
                        {quizzes[currentQuestionIndex].options.map((option, i) => (
                            <div className="option-container" key={i}>
                                <input
                                    type="radio"
                                    name={quizzes[currentQuestionIndex].question}
                                    value={option}
                                    onChange={() => handleChange(quizzes[currentQuestionIndex].question, option)}
                                />
                                {option}
                            </div>
                        ))}
                    </div>
                    <div className="navigation-buttons">
                        {currentQuestionIndex > 0 && (
                            <button onClick={handlePrevious}>Previous</button>
                        )}
                        {currentQuestionIndex < quizzes.length - 1 ? (
                            <button onClick={handleNext}>Next</button>
                        ) : (
                            <button onClick={handleSubmit}>Submit Answers</button>
                        )}
                    </div>
                </div>
            )}
            {score !== null && <h2 className="score">Your score: {score}</h2>}
        </div>
    );
};

export default Quiz;