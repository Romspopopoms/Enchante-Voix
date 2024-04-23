import React, { useState } from 'react';
import { useArticles } from "../ArticleContext"; // Make sure this path is correct

const ArticleForm = () => {
    const { addArticle } = useArticles();
    const [article, setArticle] = useState({
        title: '',
        description: '',
        imageUrl: '', // Initialize imageUrl here to be consistent
        Link: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setArticle({ ...article, imageUrl });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addArticle(article);
        setArticle({ title: '', description: '', imageUrl: '', Link: ''}); // Reset the form fields
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000); // Reset the submission indicator
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-10 border-2 border-slate-700 rounded-md p-4 shadow-2xl bg-transparent shadow-black h-auto mt-40 xl:mt-28">
            {submitted && <p className="text-green-500">Article créé avec succès !</p>}
            <h2 className="text-4xl text-center">Créer un article</h2>
            <input type="text" name="title" value={article.title} onChange={handleChange} placeholder="Titre de l'article" className='h-10 w-40 rounded-xl text-center shadow-black shadow-2xl' required />
            <textarea name="description" value={article.description} onChange={handleChange} placeholder="Description" className='h-10 w-40 rounded-xl text-center shadow-black shadow-2xl' required />
            <input type="file" onChange={handleImageChange} className='file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-yellow-600 hover:file:bg-violet-100'/>
            <input type="text" name="Link" value={article.Link} onChange={handleChange} placeholder="Lien https://" className='h-10 w-40 rounded-xl text-center shadow-black shadow-2xl' />
            <button type="submit" className='h-10 w-40 rounded-xl text-center bg-slate-300 hover:bg-red-200'>Créer l'article</button>
        </form>
    );
};

export default ArticleForm;
