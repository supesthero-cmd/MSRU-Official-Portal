import { readItems, createItem } from '@directus/sdk';
import { client, getAssetUrl } from './directus';
import { Project, Article, InquiryForm } from '../types';

// --- Projects ---

export const getFeaturedProjects = async (): Promise<Project[]> => {
  try {
    const result = await client.request(
      readItems('projects', {
        filter: {
          _and: [
            { status: { _eq: 'Published' } },
            { is_featured: { _eq: true } }
          ]
        },
        // Simply fetch all fields. Explicitly requesting relational fields (e.g. 'category.name')
        // can crash the request if the relationship is not correctly configured in the CMS.
        fields: ['*'] 
      })
    );
    return mapProjects(result);
  } catch (error) {
    console.error('Failed to fetch featured projects:', JSON.stringify(error, null, 2));
    return [];
  }
};

export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const result = await client.request(
      readItems('projects', {
        filter: { status: { _eq: 'Published' } },
        sort: ['-publish_date'],
        fields: ['*']
      })
    );
    return mapProjects(result);
  } catch (error) {
    console.error('Failed to fetch projects:', JSON.stringify(error, null, 2));
    return [];
  }
};

export const getProjectBySlug = async (slug: string): Promise<Project | undefined> => {
  try {
    const result = await client.request(
      readItems('projects', {
        filter: {
          _and: [
            { slug: { _eq: slug } },
            { status: { _eq: 'Published' } }
          ]
        },
        limit: 1,
        fields: ['*']
      })
    );
    return result.length > 0 ? mapProjects(result)[0] : undefined;
  } catch (error) {
    console.error(`Failed to fetch project ${slug}:`, JSON.stringify(error, null, 2));
    return undefined;
  }
};

// --- Articles ---

export const getAllArticles = async (): Promise<Article[]> => {
  try {
    const result = await client.request(
      readItems('articles', {
        sort: ['-date_created'],
        fields: ['*']
      })
    );
    return mapArticles(result);
  } catch (error) {
    console.error('Failed to fetch articles:', JSON.stringify(error, null, 2));
    return [];
  }
};

// --- Inquiries ---

export const submitInquiry = async (data: InquiryForm): Promise<boolean> => {
  try {
    await client.request(createItem('inquiries', data));
    return true;
  } catch (error) {
    console.error('Failed to submit inquiry:', JSON.stringify(error, null, 2));
    return false;
  }
};

// --- Mappers ---

const mapProjects = (data: any[]): Project[] => {
  return data.map((item) => {
    // Robust category handling:
    // 1. If it's an object with a name, use it.
    // 2. If it's a string, use it.
    // 3. If it's a number (ID), we might want to map it, but for now fallback to "General".
    let category = 'General';
    if (typeof item.category === 'object' && item.category !== null) {
      category = item.category.name || 'General';
    } else if (typeof item.category === 'string') {
      category = item.category;
    }

    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      status: item.status,
      cover_image: getAssetUrl(item.cover_image),
      category: category,
      tags: Array.isArray(item.tags) ? item.tags : (item.tags ? String(item.tags).split(',') : []),
      content: item.content || '',
      publish_date: item.publish_date ? new Date(item.publish_date).toISOString().split('T')[0] : '',
      is_featured: item.is_featured,
      client: item.client,
      role: item.role
    };
  });
};

const mapArticles = (data: any[]): Article[] => {
  return data.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    cover_image: getAssetUrl(item.cover_image),
    content: item.content || '',
    type: item.type,
    author: typeof item.author === 'object' && item.author !== null ? (item.author.first_name || 'Admin') : 'MSRU Team',
    publish_date: item.date_created ? new Date(item.date_created).toISOString().split('T')[0] : ''
  }));
};