import { Project, Article } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Kintsugi Digital',
    slug: 'kintsugi-digital',
    status: 'Published',
    cover_image: 'https://picsum.photos/800/600?random=1',
    category: 'Brand Identity',
    tags: ['WebGL', 'Branding', 'Oriental'],
    content: 'An exploration of digital repair and golden joinery in web design.',
    publish_date: '2023-10-15',
    is_featured: true,
    client: 'Kyoto Crafts',
    role: 'Lead Designer'
  },
  {
    id: '2',
    title: 'Neon Dynasty',
    slug: 'neon-dynasty',
    status: 'Published',
    cover_image: 'https://picsum.photos/800/600?random=2',
    category: 'UI/UX Design',
    tags: ['Cyberpunk', 'Dashboard', 'React'],
    content: 'A futuristic dashboard for a smart city management system.',
    publish_date: '2023-11-20',
    is_featured: true,
    client: 'Neo-Tokyo Gov',
    role: 'Frontend Dev'
  },
  {
    id: '3',
    title: 'Silk Road Commerce',
    slug: 'silk-road',
    status: 'Published',
    cover_image: 'https://picsum.photos/800/600?random=3',
    category: 'Development',
    tags: ['E-commerce', 'Next.js', 'Headless'],
    content: 'High-performance headless commerce solution.',
    publish_date: '2023-09-01',
    is_featured: false,
    client: 'Silk Co.',
    role: 'Full Stack'
  },
  {
    id: '4',
    title: 'Zen Garden VR',
    slug: 'zen-garden',
    status: 'Published',
    cover_image: 'https://picsum.photos/800/600?random=4',
    category: 'Interaction',
    tags: ['Three.js', 'VR', 'Meditation'],
    content: 'Immersive meditation experience in the browser.',
    publish_date: '2024-01-10',
    is_featured: true,
    client: 'Mindful Tech',
    role: 'Creative Developer'
  }
];

export const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'philosophy-of-void',
    title: 'The Philosophy of Void in UI Design',
    cover_image: 'https://picsum.photos/800/400?random=5',
    content: 'How empty space creates meaning in digital interfaces...',
    type: 'Design',
    author: 'Alex Chen',
    publish_date: '2023-12-05'
  },
  {
    id: '2',
    slug: 'server-components-deep-dive',
    title: 'Optimizing ISR with Next.js',
    cover_image: 'https://picsum.photos/800/400?random=6',
    content: 'Technical deep dive into Incremental Static Regeneration...',
    type: 'Tech',
    author: 'Sarah Wu',
    publish_date: '2024-01-15'
  }
];

export const getFeaturedProjects = () => mockProjects.filter(p => p.is_featured);
export const getAllProjects = () => mockProjects;
export const getProjectBySlug = (slug: string) => mockProjects.find(p => p.slug === slug);
export const getAllArticles = () => mockArticles;