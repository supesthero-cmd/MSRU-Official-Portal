import { createCollection, createField, createItem, readCollections, readItems } from '@directus/sdk';
import { client } from './directus';
import { mockProjects, mockArticles } from './mockData';

const SCHEMA_DEFINITIONS = {
  projects: {
    collection: 'projects',
    schema: { name: 'projects' },
    meta: { singleton: false, sort_field: 'sort' },
    fields: [
      { field: 'slug', type: 'string', meta: { interface: 'input', special: null, required: true } },
      { field: 'title', type: 'string', meta: { interface: 'input', special: null, required: true } },
      { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'Published' }, { text: 'Draft', value: 'Draft' }] } } },
      { field: 'cover_image', type: 'string', meta: { interface: 'image', note: 'Stores URL for seeded data, or File ID' } }, // Using string to support picsum URLs for demo
      { field: 'category', type: 'string', meta: { interface: 'input' } },
      { field: 'tags', type: 'json', meta: { interface: 'tags' } },
      { field: 'content', type: 'text', meta: { interface: 'input-rich-text-html' } },
      { field: 'publish_date', type: 'dateTime', meta: { interface: 'datetime' } },
      { field: 'is_featured', type: 'boolean', meta: { interface: 'boolean' } },
      { field: 'client', type: 'string', meta: { interface: 'input' } },
      { field: 'role', type: 'string', meta: { interface: 'input' } },
      // Added sort field because meta.sort_field is set to 'sort'
      { field: 'sort', type: 'integer', meta: { interface: 'input', hidden: true } },
    ]
  },
  articles: {
    collection: 'articles',
    schema: { name: 'articles' },
    meta: { singleton: false },
    fields: [
      { field: 'slug', type: 'string', meta: { interface: 'input', required: true } },
      { field: 'title', type: 'string', meta: { interface: 'input', required: true } },
      { field: 'cover_image', type: 'string', meta: { interface: 'image' } },
      { field: 'content', type: 'text', meta: { interface: 'input-rich-text-html' } },
      { field: 'type', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Design', value: 'Design' }, { text: 'Tech', value: 'Tech' }] } } },
      { field: 'author', type: 'string', meta: { interface: 'input' } },
    ]
  },
  inquiries: {
    collection: 'inquiries',
    schema: { name: 'inquiries' },
    meta: { singleton: false },
    fields: [
      { field: 'name', type: 'string', meta: { interface: 'input' } },
      { field: 'contact_info', type: 'string', meta: { interface: 'input' } },
      { field: 'type', type: 'string', meta: { interface: 'select-dropdown' } },
      { field: 'message', type: 'text', meta: { interface: 'textarea' } },
    ]
  }
};

export const bootstrapCMS = async () => {
  console.log('Starting CMS Bootstrap...');
  
  try {
    // 1. Check existing collections
    const collections = await client.request(readCollections());
    const existingNames = collections.map((c: any) => c.collection);

    // 2. Create Collections & Fields if missing
    for (const [key, def] of Object.entries(SCHEMA_DEFINITIONS)) {
      if (!existingNames.includes(key)) {
        console.log(`Creating collection: ${key}`);
        await client.request(createCollection(def as any));
      }

      // Always try to create fields, even if collection exists (to repair missing fields like 'sort')
      // console.log(`Ensuring fields for: ${key}`);
      for (const field of def.fields) {
         try {
           await client.request(createField(key as any, field as any));
         } catch (e) {
           // We silently ignore errors here because most of the time it just means the field
           // already exists. If it's a permission error, it will show up later in usage.
           // console.warn(`Field ${field.field} check:`, e); 
         }
      }
    }

    // 3. Seed Data (Only if empty)
    
    // Seed Projects
    try {
      const projects = await client.request(readItems('projects'));
      if (projects.length === 0) {
        console.log('Seeding projects...');
        for (const p of mockProjects) {
          // Remove ID to let Directus generate it, or cast to correct type
          const { id, ...data } = p; 
          await client.request(createItem('projects', {
              ...data,
              tags: p.tags // Directus JSON field handles array directly
          }));
        }
      }
    } catch (e) {
      console.warn('Skipping project seeding due to error (likely permission or schema):', e);
    }

    // Seed Articles
    try {
      const articles = await client.request(readItems('articles'));
      if (articles.length === 0) {
        console.log('Seeding articles...');
        for (const a of mockArticles) {
          const { id, ...data } = a;
          await client.request(createItem('articles', data));
        }
      }
    } catch (e) {
      console.warn('Skipping article seeding due to error:', e);
    }

    console.log('CMS Bootstrap Complete');
    return true;

  } catch (error) {
    // Properly log the error object
    console.error('Bootstrap failed:', JSON.stringify(error, null, 2));
    return false;
  }
};