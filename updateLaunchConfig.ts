import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { Stack } from './lib/contentstack'; // ✅ Using your existing Stack instance

dotenv.config();

type LaunchEntry = {
  title: string;
  source?: string;
  destination?: string;
  status_code?: number;
  cache_control?: string;
};

async function getLaunchEntries(): Promise<{
  redirects: { source: string; destination: string; status_code: number }[];
  rewrites: { source: string; destination: string }[];
  cache: { rules: { path: string; cache_control: string }[] };
}> {
  const response = await Stack
    .ContentType('launchconfig')
    .Query()
    .toJSON()
    .find();

  const entries: LaunchEntry[] = response?.[0] || [];

  const redirects = entries
    .filter(entry => entry.title === 'redirect' && entry.source && entry.destination)
    .map(entry => ({
      source: entry.source!,
      destination: entry.destination!,
      status_code: entry.status_code ?? 301,
    }));

  const rewrites = entries
    .filter(entry => entry.title === 'rewrite' && entry.source && entry.destination)
    .map(entry => ({
      source: entry.source!,
      destination: entry.destination!,
    }));

  const cacheRules = entries
    .filter(entry => entry.title === 'cache' && entry.source)
    .map(entry => ({
      path: entry.source!,
      cache_control: entry.cache_control ?? 'no-cache',
    }));

  return {
    redirects,
    rewrites,
    cache: {
      rules: cacheRules,
    },
  };
}

async function updateLaunchJson() {
  try {
    const launchData = await getLaunchEntries();
    const filePath = path.resolve('./launch.json');
    fs.writeFileSync(filePath, JSON.stringify(launchData, null, 2));
    console.log('✅ launch.json successfully generated from Contentstack!');
  } catch (error) {
    console.error('❌ Error generating launch.json:', error);
  }
}

updateLaunchJson();
