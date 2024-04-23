import React from 'react';
import { useParams } from 'react-router-dom';
import { useArticles } from '../ArticleContext';

const ArticlePage = () => {
  const { categoryName } = useParams();
  const { articles } = useArticles();

  const filteredArticles = articles.filter(article => article.category === categoryName);

  return (
    <div className='flex flex-col min-h-screen p-10'>
      <h2 className='text-center text-3xl font-bold text-white mb-10'>{categoryName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center space-y-4">
              {/* Titre et prix à côté l'un de l'autre */}
              <div className="flex flex-row justify-center items-baseline gap-2 w-full">
                <h3 className='text-xl font-semibold'>{article.title}</h3>
                <p className='text-lg font-bold'>{article.price} €</p>
              </div>
              <p className='text-gray-700 text-center'>{article.description}</p>
              {/* Image en bas */}
              {article.imageUrl && (
                <img src={article.imageUrl} alt={article.title} className="max-h-40 w-auto object-cover rounded-md mt-2"/>
              )}
            </div>
          ))
        ) : (
          <p className="text-white col-span-3">Aucun article dans cette catégorie pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
