# Dynamic Launch.json Generation During Build Time

This project demonstrates how to dynamically generate a launch.json file during build time on Launch.

The generated launch.json is created automatically so that launch.json code can be managed centrally without hardcoding them.

## 📂 Project Structure

```
.
├── lib/
│   └── contentstack-server.ts   # Centralized Contentstack Stack setup
├── scripts/
│   └── generateLaunchJson.ts    # Script to generate launch.json
├── package.json
├── tsconfig.scripts.json
└── launch.json                  # Generated at build time
```

## ⚙️ Setup

### Step 1: Clone and Install

Clone the repository:

```bash
git clone <your-repository-url>
cd Dynamic_launch
```

Install dependencies:

```bash
npm install
```

### Step 2: Environment variables

Create a `.env.local` file at the root with your stack credentials:

```env
CONTENTSTACK_API_KEY=your_stack_api_key
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
CONTENTSTACK_ENVIRONMENT=environment name
```

### Step 3: Package.json changes

Add a prebuild hook to generate launch.json before build.

```json
{
  "scripts": {
    "prebuild": "npm run generate:launch",
    "generate:launch": "ts-node --project tsconfig.scripts.json scripts/generateLaunchJson.ts",
    "build": "next build"
  }
}
```

- `prebuild` → runs automatically before `npm run build`
- `generate:launch` → generates launch.json
- `build` → builds the Next.js app

### Step 4: Deployment on Contentstack Launch

When deploying on Launch, the build process will:

1. Clone the Git repository.
2. Install dependencies.
3. Make Changes as per the repo example
4. Deploy the project on launch with the needed changes
5. During build it will generate the launch.json file

## 📄 License

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/contentstack-launch-examples/contentstack-nuxt-example-starter/blob/main/LICENSE) file for details.

## 📞 Support

For support and questions:

- 📧 **Email**: [Your email]
- 🐛 **Issues**: [GitHub Issues]
- 📖 **Documentation**: [Contentstack Docs](https://www.contentstack.com/docs/developers/launch)
