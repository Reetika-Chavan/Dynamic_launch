import fs from 'fs'
import path from 'path'
import contentstack from '@contentstack/delivery-sdk'
import dotenv from 'dotenv'

dotenv.config()

const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
})

// ⚠️ Helper to categorize by type
function categorizeEntries(entries) {
  const redirects = []
  const rewrites = []
  const cache = []

  for (const entry of entries) {
    if (entry.title === 'redirect') {
      redirects.push({
        source: entry.source,
        destination: entry.destination,
        status_code: entry.status_code || 301,
      })
    } else if (entry.title === 'rewrite') {
      rewrites.push({
        source: entry.source,
        destination: entry.destination,
      })
    } else if (entry.title === 'cache') {
      cache.push({
        path: entry.source,
        cache_control: entry.cache_control || 'no-cache',
      })
    }
  }

  return { redirects, rewrites, cache }
}

async function getLaunchEntries() {
  const result = await stack
    .contentType('launchconfig')
    .entries()
    .findAll() // ✅ Correct for v2

  const entries = result.items || []
  return categorizeEntries(entries)
}

async function updateLaunchJson() {
  try {
    const { redirects, rewrites, cache } = await getLaunchEntries()

    const launchData = {
      redirects,
      rewrites,
      cache: {
        rules: cache,
      },
    }

    const filePath = path.resolve('./launch.json')
    fs.writeFileSync(filePath, JSON.stringify(launchData, null, 2))
    console.log('✅ launch.json successfully generated from Contentstack!')
  } catch (err) {
    console.error('❌ Error generating launch.json:', err)
  }
}

updateLaunchJson()
