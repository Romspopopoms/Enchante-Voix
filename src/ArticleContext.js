import React, { createContext, useContext, useState, useEffect } from 'react';

const ArticleContext = createContext();

export const useArticles = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  
  // Chargement initial des articles
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/getArticles');
      const data = await response.json();
      if (response.ok) {
        setArticles(data);
      } else {
        throw new Error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const addArticle = async (article) => {
    try {
      const response = await fetch('/api/addArticle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      });
      const newArticle = await response.json();
      if (response.ok) {
        setArticles([...articles, newArticle]);
      } else {
        throw new Error('Failed to add article');
      }
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  return (
    <ArticleContext.Provider value={{ articles, addArticle, fetchArticles }}>
      {children}
    </ArticleContext.Provider>
  );
};
