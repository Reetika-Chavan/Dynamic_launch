import * as fs from "fs";
import * as path from "path";
import contentstack from "contentstack";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log("🚀 Starting launch.json generation...");

const apiKey = process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.CONTENTSTACK_ENVIRONMENT?.toLowerCase();

if (!apiKey || !deliveryToken || !environment) {
  throw new Error("Missing environment variables in .env.local");
}

const Stack = contentstack.Stack({
  api_key: apiKey,
  delivery_token: deliveryToken,
  environment,
});

Stack.setHost("dev11-cdn.csnonprod.com");

async function fetchEntries(contentType: string) {
  const query = Stack.ContentType(contentType).Query().toJSON();
  const result = await query.find();
  return result[0]; 
}

async function generateLaunchJson() {
  try {
    const redirects = await fetchEntries("redirects");
    const rewrites = await fetchEntries("rewrites");
    const cacheEntries = await fetchEntries("cache");

    const launchJson: any = {};

    // Redirects
    const redirectList = redirects.map((entry: any) => {
      const source = entry.source || "";
      const destination = entry.destination || "";
      const statusCode = Number(entry.statuscode) || 308;

      const resHeaders: Record<string, string> = {};
      const resPairs = entry.response?.headers?.header_pairs || [];
      for (const pair of resPairs) {
        if (pair.key && pair.value) {
          resHeaders[pair.key] = pair.value;
        }
      }

      return {
        source,
        destination,
        statusCode,
        response: Object.keys(resHeaders).length > 0 ? { headers: resHeaders } : undefined,
      };
    });

    if (redirectList.length > 0) launchJson.redirects = redirectList;

    // Rewrites
    const rewriteList = rewrites.map((entry: any) => {
      const source = entry.source || "";
      const destination = entry.destination || "";

      const resHeaders: Record<string, string> = {};
      const reqHeaders: Record<string, string> = {};

      const resPairs = entry.response?.headers?.header_pairs || [];
      for (const pair of resPairs) {
        if (pair.key && pair.value) {
          resHeaders[pair.key] = pair.value;
        }
      }

      const reqPairs = entry.request?.headers?.header_pairs || [];
      for (const pair of reqPairs) {
        if (pair.key && pair.value) {
          reqHeaders[pair.key] = pair.value;
        }
      }

      const obj: any = { source, destination };
      if (Object.keys(reqHeaders).length > 0) obj.request = { headers: reqHeaders };
      if (Object.keys(resHeaders).length > 0) obj.response = { headers: resHeaders };

      return obj;
    });

    if (rewriteList.length > 0) launchJson.rewrites = rewriteList;

    // Cache Priming
    const cacheUrls: string[] = [];

    for (const entry of cacheEntries) {
      const urls = entry.cachepriming?.urls || [];
      if (Array.isArray(urls)) {
        cacheUrls.push(...urls.filter((u: string) => typeof u === "string"));
      }
    }

    if (cacheUrls.length > 0) {
      launchJson.cache = {
        cachePriming: {
          urls: Array.from(new Set(cacheUrls)),
        },
      };
    }

    const filePath = path.join(process.cwd(), "launch.json");
    fs.writeFileSync(filePath, JSON.stringify(launchJson, null, 2));

    console.log("✅ launch.json generated:\n", JSON.stringify(launchJson, null, 2));
  } catch (error) {
    console.error("❌ Error generating launch.json:", error);
    process.exit(1);
  }
}

generateLaunchJson();
