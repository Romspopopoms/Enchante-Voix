import React, { useState } from 'react';
import { useArticles } from "../ArticleContext";
import { put } from '@vercel/blob';

const ArticleForm = () => {
    //a changer pour passer par Context
    const { addArticle } = useArticles();
    //a changer pour passer par Context
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
            //a changer pour passer par Context
            /*const apiKey = process.env.REACT_APP_BLOB_KEY;
            const file = formData.get('imageFile');
            var obj = {title: article.title, description: article.description, videoUrl: article.videoUrl, link: article.link};
            //,imageUrl: datablob.url
            if (imageFile) {
                const blob = await put(article.title, file, { access: 'public', token: apiKey });
                const retour = JSON.stringify(blob);
                const datablob = JSON.parse(retour);
                const key = "imageUrl";
                obj[key] = datablob.url ;
            }
        
            const response = await fetch('/api/addArticle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            
            const data = await response.json();*/
            var obj = {title: formData.get('title'), description: formData.get('description'), videoUrl: formData.get('videoUrl'), link: formData.get('link')};
            console.log('Adding obj: (form)', obj);
            
            await addArticle(formData);
            //a changer pour passer par Context
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
