import React, { useState } from 'react';
import { useArticles } from "../ArticleContext"; // Assurez-vous que le chemin d'importation est correct

const ArticleForm = () => {
  const { addArticle } = useArticles(); // Utiliser useArticles pour accéder à addArticle
  const [article, setArticle] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    imageUrl: '' // Ajout de l'URL de l'image

  });
  const [submitted, setSubmitted] = useState(false); // État pour suivre si le formulaire a été soumis


  const categories = [
    { name: "Bracelets", value: "bracelets",  price: "20Euros"},
    {  name: "Colliers", value: "colliers", price: "40Euros" },
    { name: "Bagues", value: "bagues", price: "30Euros" },
    { name: "Baguette", value: "baguette", price: "50Euros" },
  ];

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (article.category) {
      addArticle(article); // Utilise addArticle du contexte
      setArticle({ title: '', description: '', category: '' }); // Réinitialiser le formulaire
      setSubmitted(true); // Mettre à jour l'état pour indiquer que le formulaire a été soumis
      setTimeout(() => setSubmitted(false), 5000); // Réinitialiser l'indicateur après quelques secondes
    } else {
      alert("Veuillez sélectionner une catégorie");
    }
  };
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      // Générer un URL local pour l'image sélectionnée. Notez que cela ne télécharge pas l'image nulle part.
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setArticle({ ...article, imageUrl });
    }
  };
  
  


  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-10 border-2 border-slate-700 rounded-md p-4 shadow-2xl bg-transparent shadow-black h-auto w-1/3"> 
        {submitted && <p className="text-green-500 ">Article créé avec succès !</p>} {/* Message de confirmation */}
      <h2 className="text-4xl text-center  ">Créer un article</h2>
      <input type="text" name="title" value={article.title} onChange={handleChange} placeholder="Titre de l'article" className='h-10 w-40 rounded-xl text-center shadow-black shadow-2xl'required />
      <textarea name="description" value={article.description} onChange={handleChange} placeholder="Description" className='h-10 w-40 rounded-xl text-center shadow-black shadow-2xl' required />
      <input type="price" name="price" value={article.price} onChange={handleChange} placeholder="Prix de l'article" className='h-10 w-40 rounded-xl text-center shadow-black shadow-2xl'required />
      <input type="file" onChange={handleImageChange} className='file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100'/>
      <select name="category" value={article.category} onChange={handleChange} className='h-10 w-40 rounded-xl text-center ' required>
        
    
        {categories.map((option, index) => (
          <option key={index} value={option.value}>{option.name}</option>
          
        ))}
      </select>
      <button type="submit" className='h-10 w-40 rounded-xl text-center bg-slate-300 hover:bg-red-200'>Créer l'article</button>
    </form>
  );
};


export default ArticleForm;
