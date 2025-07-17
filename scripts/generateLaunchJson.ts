import * as fs from "fs";
import * as path from "path";
import contentstack from "contentstack";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log("🚀 Starting launch.json generation...");

const apiKey = process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.CONTENTSTACK_ENVIRONMENT?.toLowerCase();
const host = process.env.CONTENTSTACK_HOST || "stag-cdn.csnonprod.com";

if (!apiKey || !deliveryToken || !environment) {
  throw new Error("Missing required environment variables in .env.local");
}

const Stack = contentstack.Stack({
  api_key: apiKey,
  delivery_token: deliveryToken,
  environment,
});
Stack.setHost(host);

// extract header key-value pairs
const extractHeaders = (group: any) => {
  const headers: Record<string, string> = {};
  const pairs = group?.headers?.header_pairs || [];
  if (Array.isArray(pairs)) {
    for (const pair of pairs) {
      if (pair.key && pair.value) {
        headers[pair.key] = pair.value;
      }
    }
  }
  return headers;
};

async function fetchEntries(contentType: string) {
  const query = Stack.ContentType(contentType).Query();
  const result = await query.toJSON().find();
  return result[0] || [];
}

// for Env entry
function isEntryForEnv(entry: any): boolean {
  if (entry.environment !== undefined) {
    return entry.environment?.toLowerCase() === environment;
  }
  return true; 
}

async function generateLaunchJson() {
  try {
    const [redirectEntries, rewriteEntries, cacheEntries] = await Promise.all([
      fetchEntries("redirects"),
      fetchEntries("rewrites"),
      fetchEntries("cache"),
    ]);

    const redirects: any[] = [];
    const rewrites: any[] = [];
    const cachePrimingUrls: string[] = [];

    // Handle Redirects
    for (const entry of redirectEntries) {
      if (!isEntryForEnv(entry)) continue;

      const source = entry.source || "";
      const destination = entry.destination || "";
      const statusCode = Number(entry.statuscode) || 308;
      const resHeaders = extractHeaders(entry.response);

      redirects.push({
        source,
        destination,
        statusCode,
        response: Object.keys(resHeaders).length > 0 ? { headers: resHeaders } : undefined,
      });
    }

    // Handle Rewrites
    for (const entry of rewriteEntries) {
      if (!isEntryForEnv(entry)) continue;

      const source = entry.source || "";
      const destination = entry.destination || "";
      const resHeaders = extractHeaders(entry.response);
      const reqHeaders = extractHeaders(entry.request);

      const rewriteEntry: any = { source, destination };
      if (Object.keys(reqHeaders).length > 0) rewriteEntry.request = { headers: reqHeaders };
      if (Object.keys(resHeaders).length > 0) rewriteEntry.response = { headers: resHeaders };
      rewrites.push(rewriteEntry);
    }

    // Handle CachePriming
    for (const entry of cacheEntries) {
      if (!isEntryForEnv(entry)) continue;

      const urls = entry.cache?.cachepriming?.urls || [];
      if (Array.isArray(urls)) {
        cachePrimingUrls.push(...urls.filter((u: string) => typeof u === "string"));
      }
    }

    // Build launch.json
    const launchJson: any = {};
    if (redirects.length > 0) launchJson.redirects = redirects;
    if (rewrites.length > 0) launchJson.rewrites = rewrites;
    if (cachePrimingUrls.length > 0) {
      launchJson.cache = {
        cachePriming: {
          urls: Array.from(new Set(cachePrimingUrls)),
        },
      };
    }

    const filePath = path.join(process.cwd(), "launch.json");
    fs.writeFileSync(filePath, JSON.stringify(launchJson, null, 2));

    console.log("✅ launch.json generated successfully:\n", JSON.stringify(launchJson, null, 2));
  } catch (error) {
    console.error("❌ Error generating launch.json:", error);
    process.exit(1);
  }
}

generateLaunchJson();
