import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [score, setScore] = useState(0); // Pontuação do jogador
  const [questionIndex, setQuestionIndex] = useState(0); // Índice da pergunta atual
  const [gameOver, setGameOver] = useState(false); // Se o jogo acabou ou não
  const [timeLeft, setTimeLeft] = useState(20); // Tempo para responder a cada pergunta

  const questions = [
    {
      country: "Brasil",
      options: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
      answer: "Brasília",
    },
    {
      country: "França",
      options: ["Paris", "Lyon", "Marselha", "Nice"],
      answer: "Paris",
    },
    {
      country: "Japão",
      options: ["Pequim", "Tóquio", "Seul", "Bangcoc"],
      answer: "Tóquio",
    },
    {
      country: "Espanha",
      options: ["Barcelona", "Madrid", "Valência", "Sevilha"],
      answer: "Madrid",
    },
    {
      country: "Argentina",
      options: ["Buenos Aires", "Córdoba", "Rosário", "Mendoza"],
      answer: "Buenos Aires",
    },
    // Mais perguntas podem ser adicionadas aqui
  ];

  // Função para verificar a resposta e atualizar o estado
  const handleAnswer = (answer) => {
    if (answer === questions[questionIndex].answer) {
      setScore(score + 1); // Incrementa a pontuação
    }
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1); // Avança para a próxima pergunta
    } else {
      setGameOver(true); // Se não houver mais perguntas, o jogo termina
    }
    setTimeLeft(20); // Reseta o tempo para a próxima pergunta
  };

  useEffect(() => {
    if (timeLeft === 0) {
      // Se o tempo acabar, move para a próxima pergunta
      if (questionIndex + 1 < questions.length) {
        setQuestionIndex(questionIndex + 1);
        setTimeLeft(20);
      } else {
        setGameOver(true);
      }
    }
    const timer = setInterval(() => {
      if (!gameOver) {
        setTimeLeft((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, questionIndex, gameOver]);

  const restartGame = () => {
    setScore(0);
    setQuestionIndex(0);
    setGameOver(false);
    setTimeLeft(20);
  };

  return (
    <div className="App">
      <h1>Jogo de Geografia: Capitais do Mundo</h1>
      {gameOver ? (
        <div>
          <h2>Fim do Jogo!</h2>
          <p>Você acertou {score} de {questions.length} perguntas.</p>
          <button onClick={restartGame}>Recomeçar</button>
        </div>
      ) : (
        <div>
          <div className="timer">
            <h3>Tempo restante: {timeLeft}s</h3>
          </div>
          <div className="question-container">
            <h2>Qual é a capital de {questions[questionIndex].country}?</h2>
            <div className="options">
              {questions[questionIndex].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
