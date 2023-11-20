// types
import { Difficulty, QuestionState } from "./API";
import { GlobalStyle, Wrapper } from "./App.styles";
import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions } from "./API";
// for bible quiz
import { Question } from "./API";
import { shuffleArray } from "./Utils";
import { easyQuestions, mediumQuestions, hardQuestions } from "./questions";
const TOTAL_QUESTIONS = 10;
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function Main() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    // const newQuestions = await fetchQuizQuestions(
    //   TOTAL_QUESTIONS,
    //   Difficulty.EASY
    // );
    const newQuestions=shuffleArray([...easyQuestions]).map((question: Question)=>(
    {
      ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer ])
    }
  ))
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // get user's answer
      const answer = e.currentTarget.value;
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      //  save answer in array of user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };
  const nextQuestion = () => {
    // move to the next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>

      <Wrapper>
        <h1>TRIVIA</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver && <p className="score">Score:{score}</p>}
        {loading && <p>Loading questions....</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS && (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          )}
      </Wrapper>
    </>
  );
}

export default Main
