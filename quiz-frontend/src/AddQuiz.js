import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddQuiz.css'; // Import the CSS file

const AddQuiz = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const quizData = { question, options, answer };
        await axios.post('http://localhost:5000/api/quizzes', quizData);
        navigate('/quizzes');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a New Quiz</h2>
            <div>
                <label>Question:</label>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                />
            </div>
            {options.map((option, index) => (
                <div className="option-container" key={index}>
                    <label>Option {index + 1}:</label>
                    <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        required
                    />
                </div>
            ))}
            <div>
                <label>Correct Answer:</label>
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Quiz</button>
        </form>
    );
};

export default AddQuiz;