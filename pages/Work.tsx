import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { getAllProjects } from '../services/api';
import { Project } from '../types';

const Work: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  
  // Extract unique categories from projects + 'All'
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllProjects();
      setProjects(data);
      setIsLoading(false);
    };
    fetch();
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-32 min-h-screen bg-paper px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="font-display text-5xl md:text-7xl text-ink mb-8">Work</h1>
          
          {/* Filters */}
          {!isLoading && (
            <div className="flex flex-wrap gap-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    filter === cat 
                      ? 'bg-ink text-paper border-ink' 
                      : 'bg-transparent text-ink/60 border-ink/20 hover:border-ink hover:text-ink'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Project Grid */}
        {isLoading ? (
           <div className="flex justify-center py-20">
             <Loader2 className="animate-spin text-ink/30" size={32} />
           </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative"
                >
                  <Link to={`/work/${project.slug}`}>
                    <div className="aspect-[4/5] overflow-hidden rounded-sm bg-gray-200 relative mb-4">
                      <img 
                        src={project.cover_image} 
                        alt={project.title} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-ink">{project.title}</h3>
                      <div className="flex gap-2 mt-2">
                        {project.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs text-ink/50 bg-ink/5 px-2 py-1 rounded-sm">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Work;