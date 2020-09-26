import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../../context/NewsContext";
import axios from "axios";
import "./style.css";

function News() {
  const [sourceID, setSourceID, headline, setHeadline] = useContext(
    NewsContext
  );
  const [newsList, setNewsList] = useState([]);
  const [fav, setFav] = useState({})


  useEffect(() => {
    if (sourceID) {
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?q=${sourceID.id}&apiKey=dfc5dac2231743408ae7131e85470401`
        )
        .then((response) => setNewsList(response.data.articles))
        .catch((error) => console.log(error));
    }
  }, [sourceID]);

  const onClickHandler = (article) => {
    setHeadline(article);
  };
  return (
    <div className="section headline-list">
      {newsList && newsList.length > 0 ? (
        <>
          <h2>{newsList && newsList[0] && newsList[0].source.name}</h2>
          {newsList &&
            newsList.map((article, index) => {
              return (
                <div
                  className="headline"
                  key={`${index}-${article.source.name}`}
                  onClick={() => onClickHandler(article)}
                >
                  <table>
                    <tbody>
                      <tr>
                        <th>
                          <img
                            style={{ width: "150px" }}
                            key={article.publishedAt}
                            alt={article.author}
                            src={article.urlToImage}
                          />
                        </th>
                        <th>
                          <p>{article.title}</p>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  <div className="footer">
                    <div>
                      <p>{Date(article.publishedAt)}</p>
                    </div>
                    <div>
                      <i
                      key={Date.now()}
                        onClick={() => setFav({...fav, [index]: !fav[index]})}
                        className="fas fa-star"
                        style={{
                          color: fav[index]
                            ? "rgb(207, 91, 101)"
                            : "rgb(160, 156, 156)",
                        }}
                      ></i>
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      ) : (
        <h1> No news available, select a new source</h1>
      )}
    </div>
  );
}

export default News;
