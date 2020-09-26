import React, { useContext } from "react";
import { NewsContext } from "../../context/NewsContext";
import "./style.css"

function Article() {
  let context = useContext(NewsContext);
  let headline = context[2];


  return (
    <div className="section article">
      {headline.title ? (
        <div className="article-container">
          <h2>{headline.title}</h2>
          <img
            style={{ width: "400px" }}
            src={headline.urlToImage}
            alt={headline.source}
          />
          <h5>{headline.content}</h5>
        </div>
      ) : (
        <h1>Select any Article</h1>
      )}
    </div>
  );
}

export default Article;
