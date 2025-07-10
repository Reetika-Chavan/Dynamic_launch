// updateLaunchConfig.ts
import fs from 'fs';
import path from 'path';
import contentstack from 'contentstack';
import dotenv from 'dotenv';

dotenv.config();

const stack = contentstack.Stack({
  api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY!,
  delivery_token: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT!,
});

async function fetchRedirects() {
  const query = stack.ContentType('launchconfig').Query();
  const response = await query.toJSON().find();
  const entries = response?.[0] || [];

  return entries
    .filter((entry: any) => entry.title.toLowerCase() === 'redirect')
    .map((entry: any) => ({
      source: entry.source,
      destination: entry.destination,
      status_code: entry.status_code || 301,
    }));
}

async function updateLaunchJson() {
  try {
    const redirects = await fetchRedirects();
    const data = { redirects };

    const filePath = path.resolve('./launch.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('✅ launch.json updated with redirects:', redirects.length);
  } catch (err) {
    console.error('❌ Error updating launch.json:', err);
  }
}

updateLaunchJson();
