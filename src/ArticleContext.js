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
    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('description', article.description);
    if (article.imageFile) {
        formData.append('imageFile', article.imageFile, article.imageFile.name);
    }
    formData.append('videoUrl', article.videoUrl);
    formData.append('link', article.link);

    try {
        const response = await fetch('/api/addArticle', {
            method: 'POST',
            body: formData, // Pas besoin de spécifier 'Content-Type', car il est automatiquement défini par le navigateur lors de l'utilisation de FormData
        });
        if (response.ok) {
            const newArticle = await response.json();
            setArticles(prev => [...prev, newArticle]);
        } else {
            const errorResponse = await response.text();  // Gérer le cas où la réponse n'est pas en JSON
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
