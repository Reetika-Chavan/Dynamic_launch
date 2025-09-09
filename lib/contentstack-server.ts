import contentstack from "contentstack";

const apiKey = process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.CONTENTSTACK_ENVIRONMENT;

if (!apiKey || !deliveryToken || !environment) {
  throw new Error("❌ Missing one of: CONTENTSTACK_API_KEY, CONTENTSTACK_DELIVERY_TOKEN, or CONTENTSTACK_ENVIRONMENT in .env.local");
}

export const Stack = contentstack.Stack({
  api_key: apiKey,
  delivery_token: deliveryToken,
  environment: environment.toLowerCase(),
});

Stack.setHost("dev11-cdn.csnonprod.com");
