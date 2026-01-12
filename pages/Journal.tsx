import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllArticles } from '../services/api';
import { Article } from '../types';
import { ArrowUpRight, Loader2 } from 'lucide-react';

const Journal: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllArticles();
      setArticles(data);
      setIsLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="pt-32 min-h-screen bg-paper px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-display text-5xl md:text-7xl text-ink mb-16">Journal</h1>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-ink/30" size={32} />
          </div>
        ) : (
          <div className="space-y-12">
            {articles.map((article, index) => (
              <motion.article 
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group border-b border-ink/10 pb-12 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="md:w-1/4">
                    <span className="text-sm font-mono text-ink/50 block mb-2">{article.publish_date}</span>
                    <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${
                      article.type === 'Tech' ? 'bg-blue-100 text-blue-800' : 'bg-cinnabar/10 text-cinnabar'
                    }`}>
                      {article.type}
                    </span>
                  </div>
                  
                  <div className="md:w-3/4">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 group-hover:text-cinnabar transition-colors flex items-center gap-2">
                      {article.title}
                      <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </h2>
                    {/* Simplified excerpt rendering */}
                    <div 
                      className="text-ink/70 leading-relaxed mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: article.content.substring(0, 200) + '...' }} 
                    />
                    <div className="flex items-center gap-2 text-sm text-ink/40">
                      <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                      <span>{article.author}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
            
            {articles.length === 0 && (
              <p className="text-ink/50 italic">No articles published yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;