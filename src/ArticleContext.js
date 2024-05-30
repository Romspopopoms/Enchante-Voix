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

//     const addArticle = async (article) => {
//         setLoading(true); // Définir loading à true avant de commencer la requête
//         try {
//             const formData = new FormData();
//             formData.append('title', article.title);
//             formData.append('description', article.description);
//             if (article.imageFile) {
//                 formData.append('imageFile', article.imageFile, article.imageFile.name);
//             }
//             formData.append('videoUrl', article.videoUrl);
//             formData.append('link', article.link);

//<<<<<<< HEAD
//             alert('test avec fetch');
//             /*const response = await fetch('/api', {
//                 method: 'AddArticle',
//                 body: formData,
//             });*/
//             fetch('/api', {
//               method: 'POST',
//               body: article.imageFile,
//             });
//             alert('end test avec fetch');
        //=======
       // const addArticle = async (article) => {
         //   try {
        //        const formData = new FormData();
        //        formData.append('title', article.title);
        //        formData.append('description', article.description);
        //        if (article.imageFile) {
        //            formData.append('imageFile', article.imageFile, article.imageFile.name);
        //        }
         //       formData.append('videoUrl', article.videoUrl);
         //       formData.append('link', article.link);

         //       alert('test avec fetch');
                /*const response = await fetch('/api', {
                    method: 'AddArticle',
                    body: formData,
         //       });*/
         //       const response = await fetch('/api/addArticle');
         //       alert('end test avec fetch');
   // >>>>>>> e32eb280637b2473347406c106e04b0a5f78d1fa
            
//     //         if (response.ok) {
//     //             const newArticle = await response.json();
//     //             setArticles(prev => [...prev, newArticle]);
//     //         } else {
//     //             const errorResponse = await response.text();
//     //             throw new Error('Failed to add article: ' + errorResponse);
//     //         }
//     //     } catch (error) {
//     //         console.error('Error adding article:', error);
//     //         setError(error);
//     //     } finally {
//     //         setLoading(false); // Définir loading à false après la requête, qu'elle ait réussi ou échoué
//     //     }
//     // };

        useEffect(() => {
                fetchArticles();
        }, []);

        return (
                <ArticleContext.Provider value={{ articles, addArticle, fetchArticles, loading, error }}>
                        {children}
                </ArticleContext.Provider>
        );
};
