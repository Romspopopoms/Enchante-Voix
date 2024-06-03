import React, { createContext, useContext, useState, useEffect } from 'react';
import { put } from '@vercel/blob';

const ArticleContext = createContext();

export const useArticles = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }) => {
    const [sections, setSections] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSections = async () => {
        setLoading(true);
        console.log('Fetching sections from API');
        try {
            const response = await fetch('/api/getSection');
            console.log('Response status:', response.status);
            if (response.ok) {
                const data = await response.json();
                console.log('Sections fetched:', data);
                setSections(data);
            } else {
                const errorText = await response.text();
                throw new Error('Failed to fetch sections: ' + errorText);
            }
        } catch (error) {
            console.error('Error fetching sections:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    
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
            const apiKey = process.env.REACT_APP_BLOB_KEY;
            const file = formData.get('imageFile');
            var obj = {section: formData.get('section'), title: formData.get('title'), description: formData.get('description'), videoUrl: formData.get('videoUrl'), link: formData.get('link')};
            if (file) {
                const blob = await put(formData.get('title'), file, { access: 'public', token: apiKey });
                const retour = JSON.stringify(blob);
                const datablob = JSON.parse(retour);
                const key = "imageUrl";
                obj[key] = datablob.url ;
            }
            console.log('debugsection:', obj);
        
            const response = await fetch('/api/addArticle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
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
