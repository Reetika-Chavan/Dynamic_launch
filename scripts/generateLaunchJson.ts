import * as fs from "fs";
import * as path from "path";
import contentstack from "contentstack";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log("🚀 Starting launch.json generation...");

const apiKey = process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.CONTENTSTACK_ENVIRONMENT;

if (!apiKey || !deliveryToken || !environment) {
  throw new Error("Missing environment variables in .env.local");
}

const Stack = contentstack.Stack({
  api_key: apiKey,
  delivery_token: deliveryToken,
  environment: environment,
});

Stack.setHost("dev11-cdn.csnonprod.com");

async function generateLaunchJson() {
  try {
    const query = Stack.ContentType("launchconfig").Query();
    const result = await query.toJSON().find();
    const entries = result[0];

    if (!entries.length) {
      console.warn("No entries found in launchconfig.");
    }

    const redirects: any[] = [];

    for (const entry of entries) {
      const source = entry.source || "";
      const destination = entry.destination || "";
      const statusCode = Number(entry.statuscode) || 308;

      const headersObj: Record<string, string> = {};
      const headerPairs = entry.response?.headers?.header_pairs || [];

      for (const pair of headerPairs) {
        if (pair.key && pair.value) {
          headersObj[pair.key] = pair.value;
        }
      }

      redirects.push({
        source,
        destination,
        statusCode,
        response: {
          headers: headersObj,
        },
      });
    }

    const launchJson = { redirects };

    const filePath = path.join(process.cwd(), "launch.json");
    fs.writeFileSync(filePath, JSON.stringify(launchJson, null, 2));

    console.log("launch.json preview:\\n", JSON.stringify(launchJson, null, 2));
    console.log("✅ launch.json generated at root");
  } catch (error) {
    console.error("❌ Error generating launch.json:", error);
    process.exit(1);
  }
}

generateLaunchJson();