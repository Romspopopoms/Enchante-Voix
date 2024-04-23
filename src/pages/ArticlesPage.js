import React, { useEffect } from 'react';
import { useArticles } from '../ArticleContext';

const ArticlePage = () => {
  const { articles, fetchArticles } = useArticles();

  useEffect(() => {
    const fetchData = async () => {
      await fetchArticles();
      console.log('Articles fetched:', articles);  // Afficher après le fetch pour voir les données chargées
    };
    fetchData();
  }, [articles, fetchArticles]);

  return (
    <div className="flex flex-col items-center justify-center mt-40 xl:mt-36 gap-y-8">
      <h2 className='text-center text-3xl font-bold text-white mb-10'>Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((article, index) => {
            console.log('Article data:', article); // Vérifier les données de chaque article lors du rendu
            return (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center space-y-4">
                <h3 className='text-xl font-semibold'>{article.title}</h3>
                <p className='text-gray-700 text-center'>{article.description}</p>
                {article.imageUrl && (
                  <img src={article.imageUrl} alt={article.title} className="max-h-40 w-auto object-cover rounded-md mt-2"/>
                )}
                {article.videoUrl && (
                  <iframe 
                    width="100%" 
                    height="315" 
                    src={article.videoUrl} 
                    title="Embedded YouTube video" 
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
                
                {article.link && (
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">En savoir plus</a>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-white col-span-3">Aucun article trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
