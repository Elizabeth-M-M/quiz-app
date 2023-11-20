import React from "react";
import { AnswerObject } from "../Main";
import { ButtonWrapper, Wrapper } from "./QuestionCard.styles";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  questionNr: number;
  totalQuestions: number;
  userAnswer: AnswerObject | undefined;
};
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  totalQuestions,
  callback,
  userAnswer,
  questionNr,
}) => (
  <>
  {/* <ButtonWrapper/> */}
  <Wrapper>
    <p>
      Question: {questionNr}/ {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }}></p>
    <div>
      {answers.map((answer) => (
        <ButtonWrapper key={answer} correct={userAnswer?.correctAnswer===answer}
        userClicked={userAnswer?.answer===answer}>
          <button disabled={!!userAnswer} onClick={callback} value={answer}>
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
  </>

);
export default QuestionCard;
