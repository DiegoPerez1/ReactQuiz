import { useState, useEffect } from 'react';
import './Questionary.css';
import confetti from 'canvas-confetti';

interface Question {
  question: string;
  category: string;
  type: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function decodeHtml(html: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function Testeando() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const maxQuestions = 10;
  const apiUrl = "https://opentdb.com/api.php?amount=10&category=9";

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setQuestion(data.results[0]);
    } catch (error) {
      console.log('Error:', error);
    }
    setLoading(false);
  };

  const checkAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === question?.correct_answer) {
      setCorrectAnswers(correctAnswers + 1);
      handleConfetti();
      handleConfetti2();
    }
    if (questionNumber < maxQuestions) {
      setQuestionNumber(questionNumber + 1);
      fetchQuestion();
    } else {
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (!gameOver) {
      fetchQuestion();
    }
  }, [gameOver]);

  const restartGame = () => {
    setCorrectAnswers(0);
    setQuestionNumber(1);
    setGameOver(false);
  };

  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      angle: 10,
      origin: { y: 0.9 },
    });
  };
  const handleConfetti2 = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      angle: 100,
      origin: { y: 0.9 },
    });
  };
  return (

    <div className="App">
      <h2 className='scoreTitle'>Score: {correctAnswers}/{maxQuestions}</h2>
      {gameOver ? (
        <div className='finalResult'>
          <h2 className='gameOver'>Game Over</h2>
          <p className='scoreResult'>Your Final Score: {correctAnswers}/{maxQuestions}</p>
          <button className='playAgainButton' onClick={restartGame}>Play Again</button>
        </div>
      ) : (
        <div className='centerContent'>
          {loading ? (
            <p className='loading'>Loading Questions...</p>
          ) : (
            <>
              <h3 className='questionNumber'>Question {questionNumber}</h3>
              {question && (
                <>
                  <h4 className='question'>{decodeHtml(question.question)}</h4>
                  <ul className='answersContainer'>
                    {shuffleArray([...question.incorrect_answers, question.correct_answer]).map((option, index) => (
                      <li className='buttonLi' key={index}>
                        <button className='answerButton' onClick={() => checkAnswer(option)}>{decodeHtml(option)}</button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>

      )}

    </div>
  );
}

export default Testeando;