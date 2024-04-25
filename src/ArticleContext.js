import React, { createContext, useContext, useState, useEffect } from 'react';

const ArticleContext = createContext();

export const useArticles = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        try {
            const response = await fetch('/api/getArticles');
            if (response.ok) {
                const data = await response.json();
                setArticles(data);
            } else {
                throw new Error('Failed to fetch articles');
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const addArticle = async (article) => {
        alert('je vais envoyer article : ArticleCOntext');
        try {
            const formData = new FormData();
            formData.append('title', article.title);
            formData.append('description', article.description);
            if (article.imageFile) {
                formData.append('imageFile', article.imageFile, article.imageFile.name);
            }
            formData.append('videoUrl', article.videoUrl);
            formData.append('link', article.link);
            alert('je vais envoyer article : ArticleCOntext : formData.append');

            const response = await fetch('/api/addArticle', {
                method: 'POST',
                body: formData,
            });
            alert('je vais envoyer article : ArticleCOntext : api/addArticle');

            if (response.ok) {
                const newArticle = await response.json();
                setArticles(prev => [...prev, newArticle]);
            } else {
                const errorResponse = await response.text();
                throw new Error('Failed to add article: ' + errorResponse);
            }
            alert('je vais envoyer article : ArticleCOntext : if');
        } catch (error) {
            console.error('Error adding article:', error);
            alert('Error adding article');
        }
        alert('je vais envoyer article : ArticleCOntext fin');
    };

    return (
        <ArticleContext.Provider value={{ articles, addArticle, fetchArticles }}>
            {children}
        </ArticleContext.Provider>
    );
};
