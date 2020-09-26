import React from "react";
import "./App.css";
import Article from "./components/article";
import News from "./components/news";
import Sources from "./components/sources";
import { NewsProvider } from "./context/NewsContext";
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/brands.css";
import "@fortawesome/fontawesome-free/css/solid.css";

function App() {
  return (
    <NewsProvider>
      <div className="App">
        <Sources />
        <News />
        <Article />
      </div>
    </NewsProvider>
  );
}

export default App;
