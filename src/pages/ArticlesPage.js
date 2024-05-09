import React, { useEffect } from 'react';
import { useArticles } from '../ArticleContext';

const ArticlePage = () => {
  const { articles, fetchArticles } = useArticles(); // Utilisation de fetchArticles défini dans ArticleContext

  useEffect(() => {
    if (articles.length === 0) {
      fetchArticles();
    }
  }, [articles.length, fetchArticles]);  // Dépendance ajoutée pour suivre les changements correctement

  const VideoContainer = ({ src, title }) => (
    <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg shadow-lg">
      <iframe
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center mt-40 xl:mt-28 gap-y-8">
      <h2 className='text-center text-3xl font-bold text-[#c6941A] mb-5'>Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex flex-col space-y-3">
              <h3 className='text-xl font-semibold'>{article.title}</h3>
              <p className='text-gray-700'>{article.description}</p>
              {article.imageUrl && (
                <img src={article.imageUrl} alt={article.title} className="max-h-40 w-full object-cover rounded-md"/>
              )}
              {article.videoUrl && (
                <VideoContainer src={article.videoUrl} title={`Embedded YouTube video: ${article.title}`} />
              )}
              {article.link && (
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">En savoir plus</a>
              )}
            </div>
          ))
        ) : (
          <p className="text-white w-full text-center">Aucun article trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
