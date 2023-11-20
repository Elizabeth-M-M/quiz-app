import React, { ReactHTMLElement } from "react";
import { Category } from "./API";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const categoryChosen = (e: React.MouseEvent) => {
    const chosen = e.currentTarget.innerHTML;
    navigate(`/quiz?category=${Category.ANIMALS}`);
    console.log();
  };
  // console.log(Category.MYTHOLOGY);
  return (
    <div>
      <h2>Trivia World</h2>
      <h5>Choose a category</h5>
      {(Object.keys(Category) as (keyof typeof Category)[]).map(
        (key, index) => (
          <p
            onClick={categoryChosen}
            key={key}
            dangerouslySetInnerHTML={{ __html: key }}
          ></p>
        )
      )}
    </div>
  );
};
export default Home;
