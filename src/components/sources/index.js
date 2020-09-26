import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { NewsContext } from "../../context/NewsContext";

function Sources() {
  const [sources, setSources] = useState([]);
  const [sourceID, setSourceID] = useContext(NewsContext);
  const [toggle, setToggle] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favBtn, setFavBtn] = useState(false);

  const getSourcesData = () => {
    axios
      .get(
        "https://newsapi.org/v2/sources?apiKey=dfc5dac2231743408ae7131e85470401"
      )
      .then((response) => {
        const arr = response.data.sources.map((source) => {
          return { ...source, like: false };
        });
        setSources(arr);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSourcesData();
  }, []);

  const handleFavourite = (source) => {
    source.like = !source.like;
    let arr = sources.filter((ele) => ele.like === true);
    setFavorites(arr);
    setFavBtn(!favBtn);
  };

  // console.log(toggle);
  // console.log(sources);

  console.log(favorites);

  let activeSource = toggle === false ? "active" : null;
  let activeFavourite = toggle === true ? "active" : null;
  return (
    <div className="source-list section">
      <div className="header">
        <div
          className={`head-1 head ${activeSource}`}
          onClick={() => {
            setToggle(false);
            setSourceID("");
          }}
        >
          <h2>Source: {sources.length}</h2>
        </div>
        <div
          className={`head-2 head ${activeFavourite}`}
          onClick={() => {
            setToggle(true);
            setSourceID("");
          }}
        >
          <h2>Favorites: {favorites.length}</h2>
        </div>
      </div>

      {toggle === false
        ? sources &&
          sources.map((source) => {
            return (
              <div className="source-container"  key={source.id}> 
                <div
                 
                  className="single-source"
                  onClick={() => setSourceID({id: source.id, like: source.like})}
                >
                  <h3>{source.name}</h3>
                </div>
                <button className="outer-btn" >
                  <i
                  onClick={() => handleFavourite(source)}
                    className="fas fa-star fa-2x fav-button"
                    style={{
                      color: source.like
                        ? "rgb(207, 91, 101)"
                        : "rgb(160, 156, 156)",
                    }}
                  ></i>
                </button>
              </div>
            );
          })
        : favorites.map((source) => {
            return (
              <div className="source-container">
              <div
                key={source.id}
                className="single-source"
                onClick={() => setSourceID(source.id)}
              >
                <h3>{source.name}</h3>
              </div>
              <button className="outer-btn" >
                <i
                onClick={() => handleFavourite(source)}
                  className="fas fa-star fa-2x fav-button"
                  style={{
                    color: source.like
                      ? "rgb(207, 91, 101)"
                      : "rgb(160, 156, 156)",
                  }}
                ></i>
              </button>
            </div>
            );
          })}
    </div>
  );
}

export default Sources;
