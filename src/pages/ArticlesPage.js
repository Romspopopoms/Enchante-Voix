import React, { useEffect } from 'react';
import { useArticles } from '../ArticleContext';

const ArticlePage = () => {
  const { articles, fetchArticles } = useArticles();

  useEffect(() => {
    if (articles.length === 0) {
      fetchArticles();
    }
  }, [articles.length, fetchArticles]);

  const VideoContainer = ({ src, title }) => (
    <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg shadow-lg max-w-[800px]">
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
    <div className="flex flex-col items-center justify-center min-h-screen overflow-y-auto mt-40 xl:mt-28 gap-y-8">
      <h2 className='text-center text-3xl font-bold text-[#c6941A] mb-5'>Articles</h2>
      <div className="flex flex-col w-[90%] space-y-6 items-center">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4 max-w-[800px] w-full">
              <h3 className='text-2xl font-semibold text-center'>{article.title}</h3>
              <p className='text-gray-700 text-center'>{article.description}</p>
              {article.imageurl && (
                <img src={article.imageurl} alt={article.title} className="w-full max-h-[450px] object-cover rounded-md"/>
              )}
              {article.videourl && (
                <VideoContainer src={article.videourl} title={`Embedded YouTube video: ${article.title}`} />
              )}
              {article.link && (
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-center">En savoir plus</a>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-700 w-full text-center">Aucun article trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
