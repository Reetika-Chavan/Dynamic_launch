// scripts/generateLaunchJson.ts

import * as fs from 'fs';
import * as path from 'path';
import * as contentstack from 'contentstack';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' }); // Load env vars manually for script

console.log('🚀 Starting launch.json generation...');

// Read and validate environment variables
const apiKey = process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.CONTENTSTACK_ENVIRONMENT;

if (!apiKey || !deliveryToken || !environment) {
  throw new Error('❌ Missing one of: CONTENTSTACK_API_KEY, DELIVERY_TOKEN, or ENVIRONMENT in .env.local');
}

// ✅ Correct: use contentstack.Stack (capital S)
const Stack = contentstack.Stack({
  api_key: apiKey,
  delivery_token: deliveryToken,
  environment: environment,
});

// Optional: set custom CDN host for non-prod
Stack.setHost('dev11-cdn.csnonprod.com');

async function generateLaunchJson() {
  try {
    const query = Stack.ContentType('launchconfig').Query();
    const result = await query.toJSON().find();
    const entries = result[0];

    if (!entries.length) {
      console.warn('⚠️ No entries found in launchconfig.');
    }

    console.log('📦 Entries fetched from Contentstack:', JSON.stringify(entries, null, 2));

    const redirects: any[] = [];
    const rewrites: any[] = [];
    const cache: any[] = [];

    for (const entry of entries) {
      const type = entry.title?.toLowerCase();
      const { source, destination, status_code, cache_control } = entry;

      switch (type) {
        case 'redirect':
          redirects.push({
            source,
            destination,
            status_code: String(status_code || '301'), // Must be string for Launch schema
          });
          break;

        case 'rewrite':
          rewrites.push({ source, destination });
          break;

        case 'cache':
          cache.push({ path: source, cache_control });
          break;

        default:
          console.warn(`⚠️ Unknown type in entry: ${entry.title}`);
      }
    }

    const launchJson = {
      $schema: 'https://www.contentstack.com/launch/schema/launch.schema.json',
      redirects,
      rewrites,
      cache,
    };

    const filePath = path.join(process.cwd(), 'launch.json');
    fs.writeFileSync(filePath, JSON.stringify(launchJson, null, 2));

    console.log('✅ launch.json generated at root');
    console.log('📄 Final launch.json contents:', JSON.stringify(launchJson, null, 2));
  } catch (error) {
    console.error('❌ Error generating launch.json:', error);
    process.exit(1);
  }
}

generateLaunchJson();
