import * as fs from "fs";
import * as path from "path";
import contentstack from "contentstack";
import * as dotenv from "dotenv";
import Ajv from "ajv";

dotenv.config({ path: ".env.local" }); // ✅ load env vars manually

console.log("🚀 Starting launch.json generation...");

// ✅ Validate and read environment variables
const apiKey = process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.CONTENTSTACK_ENVIRONMENT;

if (!apiKey || !deliveryToken || !environment) {
  throw new Error(
    "❌ Missing one of: CONTENTSTACK_API_KEY, DELIVERY_TOKEN, or ENVIRONMENT in .env.local"
  );
}

// ✅ Initialize SDK and set host
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
      console.warn("⚠️ No entries found in launchconfig.");
    }

    console.log(
      "📦 Entries fetched from Contentstack:",
      JSON.stringify(entries, null, 2)
    );

    const redirects: any[] = [];
    const rewrites: any[] = [];
    const cache: any[] = [];

    for (const entry of entries) {
      const type = entry.title?.toLowerCase();
      const { source, destination, status_code, cache_control } = entry;

      switch (type) {
        case "redirect":
          redirects.push({
            source: String(source),
            destination: String(destination),
            status_code:
              typeof status_code === "number"
                ? status_code
                : parseInt(String(status_code), 10) || 301, // ✅ number
          });
          break;

        case "rewrite":
          rewrites.push({
            source: String(source),
            destination: String(destination),
          });
          break;

        case "cache":
          cache.push({
            path: String(source),
            cache_control: String(cache_control),
          });
          break;

        default:
          console.warn(`⚠️ Unknown type in entry: ${entry.title}`);
      }
    }

    const launchJson = {
      $schema: "https://www.contentstack.com/launch/schema/launch.schema.json",
      redirects,
      rewrites,
      cache,
    };

    // ✅ Validate schema before writing
    const ajv = new Ajv();
    const schema = {
      type: "object",
      properties: {
        $schema: { type: "string" },
        redirects: {
          type: "array",
          items: {
            type: "object",
            required: ["source", "destination", "status_code"],
            properties: {
              source: { type: "string" },
              destination: { type: "string" },
              status_code: { type: "integer" },
            },
          },
        },
        rewrites: {
          type: "array",
          items: {
            type: "object",
            required: ["source", "destination"],
            properties: {
              source: { type: "string" },
              destination: { type: "string" },
            },
          },
        },
        cache: {
          type: "array",
          items: {
            type: "object",
            required: ["path", "cache_control"],
            properties: {
              path: { type: "string" },
              cache_control: { type: "string" },
            },
          },
        },
      },
      required: ["$schema", "redirects", "rewrites", "cache"],
    };

    const validate = ajv.compile(schema);
    const valid = validate(launchJson);

    console.log("🧾 launch.json preview:\n", JSON.stringify(launchJson, null, 2));

    if (!valid) {
      console.error("❌ launch.json schema validation failed:", validate.errors);
      process.exit(1);
    }

    // ✅ Write to file
    const filePath = path.join(process.cwd(), "launch.json");
    fs.writeFileSync(filePath, JSON.stringify(launchJson, null, 2) + "\n");

    console.log("✅ launch.json generated at root");
  } catch (error) {
    console.error("❌ Error generating launch.json:", error);
    process.exit(1);
  }
}

generateLaunchJson();
