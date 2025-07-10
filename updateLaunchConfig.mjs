import fs from 'fs'
import path from 'path'
import contentstack from '@contentstack/delivery-sdk'
import dotenv from 'dotenv'

dotenv.config()

const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || '',
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || '',
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || '',
})

async function getLaunchEntries() {
  const response = await stack
    .contentType('launchconfig')
    .entries()
    .find()

  const entries = response?.[0] || []

  const redirects = entries
    .filter(entry => entry.title === 'redirect')
    .map(entry => ({
      source: entry.source,
      destination: entry.destination,
      status_code: entry.status_code || 301,
    }))

  const rewrites = entries
    .filter(entry => entry.title === 'rewrite')
    .map(entry => ({
      source: entry.source,
      destination: entry.destination,
    }))

  const cacheRules = entries
    .filter(entry => entry.title === 'cache')
    .map(entry => ({
      path: entry.source,
      cache_control: entry.cache_control || 'no-cache',
    }))

  return {
    redirects,
    rewrites,
    cache: {
      rules: cacheRules,
    },
  }
}

async function updateLaunchJson() {
  try {
    const launchData = await getLaunchEntries()
    const filePath = path.resolve('./launch.json')
    fs.writeFileSync(filePath, JSON.stringify(launchData, null, 2))
    console.log('✅ launch.json successfully generated from Contentstack!')
  } catch (error) {
    console.error('❌ Error generating launch.json:', error)
  }
}

updateLaunchJson()
