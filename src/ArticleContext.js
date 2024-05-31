import React, { createContext, useContext, useState, useEffect } from 'react';
import { put } from '@vercel/blob';

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

    const addArticle = async (formData) => {
        setLoading(true);
        console.log('Adding article:', formData);
        try {            
            //A changer pour passer par ici
            /*const formData = new FormData();
            formData.append('title', article.title);
            formData.append('description', article.description);
            if (article.imageFile) {
                formData.append('imageFile', article.imageFile, article.imageFile.name);
            }
            formData.append('videoUrl', article.videoUrl);
            formData.append('link', article.link);*/

            const apiKey = process.env.REACT_APP_BLOB_KEY;
            const file = formData.get('imageFile');
            //const blob = await put(article.title, file, { access: 'public', token: apiKey });
            //const retour = JSON.stringify(blob);
            //const datablob = JSON.parse(retour);
            const obj = {title: formData.title, description: formData.description,imageUrl: "", videoUrl: formData.videoUrl, link: formData.link};
            console.log('Adding obj: (addArticle)', obj);
        
            const response = await fetch('/api/addArticle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            
            const data = await response.json();
            //A changer pour passer par ici

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
