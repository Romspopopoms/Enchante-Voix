import React, { createContext, useContext, useState } from 'react';

const ArticleContext = createContext();

export const useArticles = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  const addArticle = (article) => {
    setArticles([...articles, { ...article, id: Date.now() }]);
  };

  return (
    <ArticleContext.Provider value={{ articles, addArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};