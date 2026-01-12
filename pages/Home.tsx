import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero3D from '../components/Hero3D';
import { getFeaturedProjects } from '../services/mockData';

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="border-r-2 border-cinnabar pr-1 animate-pulse">
      {displayText}
    </span>
  );
};

const Home: React.FC = () => {
  const featuredProjects = getFeaturedProjects();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-paper flex items-center justify-center">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-80">
          <Hero3D />
        </div>
        
        {/* Content Overlay */}
        <motion.div 
          style={{ opacity, y }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="font-display text-5xl md:text-8xl font-bold text-ink mb-6 tracking-tighter">
            MSRU
          </h1>
          <div className="text-xl md:text-2xl font-serif text-charcoal italic h-8">
            <TypewriterText text="Oriental Aesthetics. Digital Innovation." />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-ink/50 text-xs tracking-widest uppercase"
          >
            Scroll
          </motion.div>
        </div>
      </section>

      {/* About Intro Section - Parallax Text */}
      <section className="py-32 px-6 bg-ink text-paper relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-8">
              We craft digital experiences that bridge the gap between <span className="text-cinnabar">tradition</span> and <span className="text-gold">future technology</span>.
            </h2>
            <p className="text-paper/60 text-lg font-light leading-relaxed max-w-2xl">
              MSRU is a digital atelier based in Tokyo. We utilize Headless CMS architectures and WebGL technologies to build performant, SEO-friendly, and visually stunning platforms for brands that value craftsmanship.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      </section>

      {/* Featured Work Section */}
      <section className="py-32 px-6 bg-paper">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-display text-4xl text-ink">Selected Works</h2>
            <Link to="/work" className="group flex items-center text-cinnabar font-bold text-sm tracking-widest hover:text-ink transition-colors">
              VIEW ALL <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`group cursor-pointer ${index % 2 === 1 ? 'md:mt-24' : ''}`}
              >
                <Link to={`/work/${project.slug}`}>
                  <div className="overflow-hidden rounded-lg mb-6 shadow-lg">
                    <img 
                      src={project.cover_image} 
                      alt={project.title} 
                      className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-ink group-hover:text-cinnabar transition-colors mb-2">
                        {project.title}
                      </h3>
                      <p className="text-ink/60 text-sm">{project.category}</p>
                    </div>
                    <span className="text-xs border border-ink/20 px-2 py-1 rounded-full text-ink/60">
                      {project.publish_date.split('-')[0]}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;