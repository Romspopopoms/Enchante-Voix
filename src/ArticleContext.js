import React, { createContext, useContext, useState, useEffect } from 'react';

const ArticleContext = createContext();

export const useArticles = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchArticles = async () => {
        setLoading(true);
        console.log('Fetching articles from API');
        try {
            const response = await fetch('/api/getArticles');
            console.log('Response status:', response.status);
            if (response.ok) {
                const data = await response.json();
                console.log('Articles fetched:', data);
                setArticles(data);
            } else {
                const errorText = await response.text();
                throw new Error('Failed to fetch articles: ' + errorText);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const addArticle = async (article) => {
        setLoading(true);
        console.log('Adding article:', article);
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

            console.log('Response status for adding article:', response.status);
            if (response.ok) {
                const newArticle = await response.json();
                console.log('Article added:', newArticle);
                setArticles(prev => [...prev, newArticle]);
            } else {
                const errorText = await response.text();
                throw new Error('Failed to add article: ' + errorText);
            }
        } catch (error) {
            console.error('Error adding article:', error);
            setError(error);
        } finally {
            setLoading(false);
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
