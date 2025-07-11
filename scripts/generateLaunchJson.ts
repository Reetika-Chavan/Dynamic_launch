// scripts/generateLaunchJson.ts
import * as fs from "fs";
import * as path from "path";
import contentstack from "contentstack";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" }); // Load env vars manually

console.log("🚀 Starting launch.json generation...");

// Read and validate env variables
const apiKey = process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.CONTENTSTACK_ENVIRONMENT;

if (!apiKey || !deliveryToken || !environment) {
  throw new Error("❌ Missing environment variables in .env.local");
}

// Initialize Contentstack SDK
const Stack = contentstack.Stack({
  api_key: apiKey,
  delivery_token: deliveryToken,
  environment: environment,
});

// Set host for dev11
Stack.setHost("dev11-cdn.csnonprod.com");

async function generateLaunchJson() {
  try {
    const query = Stack.ContentType("launchconfig").Query();
    const result = await query.toJSON().find();
    const entries = result[0];

    if (!entries.length) {
      console.warn("⚠️ No entries found in launchconfig.");
    }

    const redirects: any[] = [];
    const rewrites: any[] = [];
    const cache: any[] = [];

    for (const entry of entries) {
      const type = String(entry.title || "").toLowerCase();
      const source = String(entry.source || "").trim();
      const destination = String(entry.destination || "").trim();
      const cacheControl = String(entry.cache_control || "").trim();

      switch (type) {
        case "redirect":
          redirects.push({ source, destination }); // ❌ no status_code
          break;
        case "rewrite":
          rewrites.push({ source, destination });
          break;
        case "cache":
          cache.push({ path: source, cache_control: cacheControl });
          break;
        default:
          console.warn(`⚠️ Unknown entry type: ${type}`);
      }
    }

    const launchJson: any = { redirects };
    if (rewrites.length) launchJson.rewrites = rewrites;
    if (cache.length) launchJson.cache = cache;

    const filePath = path.join(process.cwd(), "launch.json");
    fs.writeFileSync(filePath, JSON.stringify(launchJson, null, 2) + "\n");

    console.log("🧾 launch.json preview:\n", JSON.stringify(launchJson, null, 2));
    console.log("✅ launch.json generated at root");
  } catch (error) {
    console.error("❌ Error generating launch.json:", error);
    process.exit(1);
  }
}

generateLaunchJson();
