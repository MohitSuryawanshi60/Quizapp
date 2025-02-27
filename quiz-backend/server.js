const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["https://quizapp-frontend-mu.vercel.app"], 
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Quiz API!');
});

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Quiz Schema
const quizSchema = new mongoose.Schema({
    question: String,
    options: [String],
    answer: String
});

const Quiz = mongoose.model('Quiz', quizSchema);

// API to get quizzes
app.get('/api/quizzes', async (req, res) => {
    const quizzes = await Quiz.find();
    res.json(quizzes);
});

// API to add a new quiz
app.post('/api/quizzes', async (req, res) => {
    const { question, options, answer } = req.body;
    const newQuiz = new Quiz({ question, options, answer });
    await newQuiz.save();
    res.status(201).json(newQuiz);
});

// API to submit answers
app.post('/api/submit', (req, res) => {
    const { answers } = req.body;
    let score = 0;
    answers.forEach(answer => {
        if (answer.selected === answer.correct) {
            score++;
        }
    });
    res.json({ score });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});