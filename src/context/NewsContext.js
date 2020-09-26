import React, { useState, createContext } from "react";

export const NewsContext = createContext();

export const NewsProvider = (props) => {
  const [sourceID, setSoureID] = useState("");
  const [headline, setHeadline] = useState({});

  return (
    <NewsContext.Provider value={[sourceID, setSoureID, headline, setHeadline]}>
      {props.children}
    </NewsContext.Provider>
  );
};
