import fs from 'fs'
import path from 'path'
import contentstack from '@contentstack/delivery-sdk'
import dotenv from 'dotenv'

dotenv.config()

async function getRedirectsFromStack() {
  const stack = contentstack.stack({
    apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
    deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
    environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
  })

  const response = await stack
    .ContentType('launchconfig')
    .Query()
    .toJSON()
    .find()

  const entries = response?.[0] || []

  const redirects = entries
    .filter((entry) => entry.title === 'redirect')
    .map((entry) => ({
      source: entry.source,
      destination: entry.destination,
      status_code: entry.status_code || 301,
    }))

  const rewrites = entries
    .filter((entry) => entry.title === 'rewrite')
    .map((entry) => ({
      source: entry.source,
      destination: entry.destination,
    }))

  const cacheRules = entries
    .filter((entry) => entry.title === 'cache')
    .map((entry) => ({
      path: entry.source,
      cache_control: entry.cache_control,
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
    const config = await getRedirectsFromStack()
    const filePath = path.resolve('./launch.json')
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2))
    console.log('✅ launch.json generated successfully from Contentstack')
  } catch (err) {
    console.error('❌ Error generating launch.json:', err)
  }
}

updateLaunchJson()
