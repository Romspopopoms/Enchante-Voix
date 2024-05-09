import React, { createContext, useContext, useState, useEffect } from 'react';

const ArticleContext = createContext();

export const useArticles = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchArticles = async () => {
        setLoading(true); // Définir loading à true avant de commencer la requête
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
            setError(error);
        } finally {
            setLoading(false); // Définir loading à false après la requête, qu'elle ait réussi ou échoué
        }
    };

    const addArticle = async (article) => {
        setLoading(true); // Définir loading à true avant de commencer la requête
        try {
            const formData = new FormData();
            formData.append('title', article.title);
            formData.append('description', article.description);
            if (article.imageFile) {
                formData.append('imageFile', article.imageFile, article.imageFile.name);
            }
            formData.append('videoUrl', article.videoUrl);
            formData.append('link', article.link);

            const response = await fetch('/api/addArticle', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const newArticle = await response.json();
                setArticles(prev => [...prev, newArticle]);
            } else {
                const errorResponse = await response.text();
                throw new Error('Failed to add article: ' + errorResponse);
            }
        } catch (error) {
            console.error('Error adding article:', error);
            setError(error);
        } finally {
            setLoading(false); // Définir loading à false après la requête, qu'elle ait réussi ou échoué
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <ArticleContext.Provider value={{ articles, addArticle, fetchArticles, loading, error }}>
            {children}
        </ArticleContext.Provider>
    );
};