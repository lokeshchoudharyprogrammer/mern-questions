import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ResultPage from './Components/ResultPage';
// import ResultPage from './ResultPage';
// ResultPage
function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/questions');
      setQuestions(response.data.slice(0, 10)); // Only first 10 questions
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setShowResult(false);
      setIsCorrect(false);
      setError(null);
      setScore(0);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) {
      alert('Please select an option');
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswerIndex) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowResult(false);
    setIsCorrect(false);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      setCurrentQuestionIndex(0); // Reset to start the quiz again
      alert('Quiz Completed!');
    }
  };

  const restartQuiz = () => {
    fetchQuestions();
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Quiz App</h1>
        {isLoading && <p>Loading questions...</p>}
        {error && <p className="error">{error}</p>}
        {!isLoading && !error && questions.length > 0 && currentQuestionIndex < questions.length && (
          <div className="question">
            <h2>Question {currentQuestionIndex + 1}</h2>
            <h3>{questions[currentQuestionIndex].question}</h3>
            <div className="options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="option">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="options"
                    value={index}
                    checked={selectedOption === index}
                    onChange={() => handleOptionSelect(index)}
                  />
                  <label htmlFor={`option-${index}`}>{option}</label>
                </div>
              ))}
            </div>
            {!showResult && (
              <button className="btn" onClick={handleSubmit}>Submit</button>
            )}
            {showResult && (
              <div className="result">
                {isCorrect ? (
                  <p>Correct!</p>
                ) : (
                  <p>Incorrect. The correct answer is: {questions[currentQuestionIndex].options[questions[currentQuestionIndex].correctAnswerIndex]}</p>
                )}
                <button className="btn next" onClick={handleNextQuestion}>Next Question</button>
              </div>
            )}
          </div>
        )}
        {currentQuestionIndex === questions.length - 1 && showResult && (
          <ResultPage score={score} totalQuestions={questions.length} restartQuiz={restartQuiz} />
        )}
      </div>
    </div>
  );
}

export default App;
