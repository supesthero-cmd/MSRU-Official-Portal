export interface Project {
  id: string;
  slug: string;
  title: string;
  status: 'Published' | 'Draft' | 'Archived';
  cover_image: string;
  category: string;
  tags: string[];
  content: string;
  publish_date: string;
  is_featured: boolean;
  client?: string;
  role?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  cover_image: string;
  content: string;
  type: 'Design' | 'Tech' | 'News';
  author: string;
  publish_date: string;
}

export interface SiteConfig {
  site_name: string;
  contact_email: string;
}

export interface InquiryForm {
  name: string;
  contact_info: string;
  type: 'Business' | 'Career' | 'Other';
  message: string;
}