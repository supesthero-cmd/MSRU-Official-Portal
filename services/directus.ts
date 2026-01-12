import { createDirectus, rest, staticToken } from '@directus/sdk';

export const DIRECTUS_URL = 'https://directus.msru.cn';
// WARNING: Storing admin tokens in frontend code is a security risk for production apps.
// Ideally, use a scoped user token or public permissions.
export const DIRECTUS_TOKEN = 'u04LAXVoHC9nGjs-PDdy0eZ1F4wxe2Xm';

export interface DirectusSchema {
  projects: any[];
  articles: any[];
  inquiries: any[];
}

export const client = createDirectus<DirectusSchema>(DIRECTUS_URL)
  .with(rest())
  .with(staticToken(DIRECTUS_TOKEN));

export const getAssetUrl = (id: string | null | undefined) => {
  if (!id) return 'https://picsum.photos/800/600'; // Fallback
  // If the ID is already a full URL (e.g. from mock data seeding), return it as is.
  if (id.startsWith('http')) return id;
  return `${DIRECTUS_URL}/assets/${id}`;
};