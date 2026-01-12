import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { getProjectBySlug, getFeaturedProjects } from '../services/api';
import { Project } from '../types';

const WorkDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null | undefined>(null); // null = loading, undefined = not found
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    // Reset state on slug change
    setProject(null);
    setRelatedProjects([]);

    const fetchData = async () => {
      if (!slug) return;
      
      const foundProject = await getProjectBySlug(slug);
      setProject(foundProject);

      if (foundProject) {
        // Fetch related projects (reusing featured for now, typically would filter by tag)
        const allFeatured = await getFeaturedProjects();
        setRelatedProjects(allFeatured.filter(p => p.id !== foundProject.id).slice(0, 2));
      } else {
        setProject(undefined);
      }
    };
    fetchData();
  }, [slug]);

  if (project === null) {
    return (
      <div className="h-screen flex items-center justify-center text-ink/30">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (project === undefined) {
    return (
      <div className="h-screen flex items-center justify-center text-ink">
        <h1 className="text-2xl">Project not found</h1>
        <Link to="/work" className="ml-4 text-cinnabar underline">Back to Work</Link>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen">
      {/* Hero Image */}
      <div className="h-[60vh] md:h-[80vh] w-full relative bg-gray-200">
        <img 
          src={project.cover_image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper to-transparent opacity-90" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <Link to="/work" className="inline-flex items-center text-ink/60 hover:text-cinnabar mb-6 transition-colors">
              <ArrowLeft size={20} className="mr-2" /> Back to Works
            </Link>
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-display text-5xl md:text-8xl text-ink font-bold mb-4"
            >
              {project.title}
            </motion.h1>
            <div className="flex flex-wrap gap-4 text-sm font-medium text-ink/70">
              <span className="bg-white/50 px-3 py-1 backdrop-blur-sm rounded">{project.category}</span>
              <span className="bg-white/50 px-3 py-1 backdrop-blur-sm rounded">{project.publish_date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Metadata Sidebar */}
          <div className="lg:col-span-4 space-y-8 sticky top-24 h-fit">
            <div className="border-t border-ink/10 pt-4">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 mb-2">Client</h3>
              <p className="text-lg font-serif">{project.client || 'Private Client'}</p>
            </div>
            <div className="border-t border-ink/10 pt-4">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 mb-2">Role</h3>
              <p className="text-lg font-serif">{project.role || 'Design & Development'}</p>
            </div>
            <div className="border-t border-ink/10 pt-4">
              <h3 className="text-xs uppercase tracking-widest text-ink/40 mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="bg-ink/5 px-2 py-1 text-sm rounded">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div 
              className="prose prose-lg prose-headings:font-display prose-p:text-ink/80 max-w-none prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: project.content }} 
            />
            
            {/* Fallback if content is short or empty to maintain layout structure */}
            {(!project.content || project.content.length < 100) && (
              <div className="mt-8 text-ink/40 italic">
                <p>Additional project details coming soon.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Projects */}
        <div className="mt-32 pt-16 border-t border-ink/10">
          <h3 className="font-display text-2xl mb-8">Related Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {relatedProjects.map(p => (
               <Link key={p.id} to={`/work/${p.slug}`} className="group block">
                 <div className="h-64 overflow-hidden rounded mb-4 bg-gray-200">
                   <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 </div>
                 <h4 className="text-xl font-bold group-hover:text-cinnabar transition-colors">{p.title}</h4>
               </Link>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;