import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ArticleContext = createContext();

export const useArticles = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = useCallback(async () => {
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
  }, []); // Assurez-vous que les dépendances ici sont correctement configurées

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const addArticle = async (article) => {
    try {
      const response = await fetch('/api/addArticle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
      });
      if (response.ok) {
        const newArticle = await response.json();
        setArticles(prev => [...prev, newArticle]); // Utilisez une fonction de mise à jour pour garantir l'intégrité de l'état
      } else {
        const errorResponse = await response.text();
        throw new Error('Failed to add article: ' + errorResponse);
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
