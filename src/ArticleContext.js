import React, { createContext, useContext, useState, useEffect } from 'react';
import { put } from '@vercel/blob';

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
        try {
            const formData = new FormData();
            formData.append('title', article.title);
            formData.append('description', article.description);
            if (article.imageFile) {
                formData.append('imageFile', article.imageFile, article.imageFile.name);
            }
            formData.append('videoUrl', article.videoUrl);
            formData.append('link', article.link);

            /*const response = await fetch('/api/addArticle/handler', {
                method: 'POST',
                body: formData,
            });*/
            const file = formData.get('imageFile');
            const filename = file.name;

            const url = await put(file, filename, { access: 'public' });
            alert(url);

            if (response.ok) {
                const newArticle = await response.json();
                setArticles(prev => [...prev, newArticle]);
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
