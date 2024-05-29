import React, { useState } from 'react';
import { useArticles } from "../ArticleContext";
import { put } from '@vercel/blob';

const ArticleForm = () => {
    //const { addArticle } = useArticles();
    const [article, setArticle] = useState({
        title: '',
        description: '',
        videoUrl: '',
        link: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!article.title || !article.description) {
            setError('Le titre et la description sont requis.');
            return;
        }

        const formData = new FormData(e.target);
        formData.append('title', article.title);
        formData.append('description', article.description);
        if (imageFile) {
            formData.append('imageFile', imageFile);
        }
        formData.append('videoUrl', article.videoUrl);
        formData.append('link', article.link);
        
        setLoading(true);
        try {
            alert("Launch Blob");
            //await addArticle(formData);
            await fetch('/api', {
                    method: 'AddArticle',
                    body: formData,
            });
            const file = formData.get('imageFile');
            //const { url } = await put("test", file, { access: 'public', token: 'vercel_blob_rw_s4TyBQ5DfffM3JDe_Z2HiBFDcrz9YY2dZlZQBhGKjdYXf9o' });
            const { url2 } = await put('articles/blob.txt', 'Hello World!', { access: 'public' });
            alert(url);
           
            setArticle({ title: '', description: '', videoUrl: '', link: '' });
            setImageFile(null);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
        } catch (error) {
            setError('Échec de la création de l\'article: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-10 border-2 border-slate-700 rounded-md p-4 bg-transparent shadow-black h-auto w-1/2" encType="multipart/form-data">
            {submitted && <p className="text-green-500">Article créé avec succès!</p>}
            {error && <p className="text-red-500">{error}</p>}
            <h2 className="text-4xl text-center">Créer un article</h2>
            <input type="text" name="title" value={article.title} onChange={handleChange} placeholder="Titre de l'article" className='h-10 w-full rounded-xl text-center shadow-black' required />
            <textarea name="description" value={article.description} onChange={handleChange} placeholder="Description" className='h-40 w-full rounded-xl text-center shadow-black' required />
            <input type="file" onChange={handleImageChange} disabled={loading} className='file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-yellow-600 hover:file:bg-violet-100'/>
            <input type="text" name="videoUrl" value={article.videoUrl} onChange={handleChange} placeholder="Lien vidéo YouTube/Vimeo" className='h-10 w-full rounded-xl text-center shadow-black' />
            <input type="text" name="link" value={article.link} onChange={handleChange} placeholder="Lien https://" className='h-10 w-full rounded-xl text-center shadow-black' />
            <button type="submit" disabled={loading} className='h-10 w-full rounded-xl text-center bg-slate-300 hover:bg-red-200'>Créer l'article</button>
        </form>
    );
};

export default ArticleForm;
