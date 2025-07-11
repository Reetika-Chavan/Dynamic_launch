import * as contentstack from 'contentstack';

const apiKey = process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.CONTENTSTACK_ENVIRONMENT;

if (!apiKey || !deliveryToken || !environment) {
  throw new Error('❌ Missing one of: CONTENTSTACK_API_KEY, DELIVERY_TOKEN, or ENVIRONMENT in .env.local');
}

export const Stack = contentstack.Stack({
  api_key: apiKey,
  delivery_token: deliveryToken,
  environment: environment,
});

// ✅ Set correct host for Dev11 (this was missing earlier)
Stack.setHost('dev11-cdn.csnonprod.com');
