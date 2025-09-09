# Contentstack Launch.json with Dynamic Configuration

A Next.js application that demonstrates dynamic `launch.json` generation during build time, fetching configuration from Contentstack CMS entries. This project showcases how to create a flexible, content-driven deployment configuration system.

## 🚀 Features

- **Dynamic Launch Configuration**: Automatically generates `launch.json` during build time from Contentstack entries
- **Contentstack CMS Integration**: Headless CMS for managing redirects, rewrites, and cache configurations
- **Next.js**: Latest Next.js with App Router and React 19
- **TypeScript Support**: Full TypeScript integration with type safety
- **Live Preview**: Contentstack Live Preview integration for real-time content editing
- **Pre-build Scripts**: Automated configuration generation before deployment

## 🏗️ Architecture

### Dynamic Launch.json Generation

The project implements a sophisticated build-time configuration system:

1. **Pre-build Script**: `scripts/generateLaunchJson.ts` runs before every build
2. **Contentstack Integration**: Fetches configuration from three content types:
   - `redirects`: URL redirects with status codes and headers
   - `rewrites`: URL rewrites with request/response headers
   - `cache`: Cache priming URLs for performance optimization
3. **Environment Filtering**: Configuration entries are filtered by environment
4. **Automatic Generation**: Creates `launch.json` in the project root

### Content Types Structure

#### Redirects Content Type
```json
{
  "source": "/old-page",
  "destination": "/new-page", 
  "statuscode": 301,
  "environment": "production",
  "response": {
    "headers": {
      "header_pairs": [
        {"key": "Cache-Control", "value": "max-age=3600"}
      ]
    }
  }
}
```

#### Rewrites Content Type
```json
{
  "source": "/api/proxy/*",
  "destination": "https://external-api.com/*",
  "environment": "production",
  "request": {
    "headers": {
      "header_pairs": [
        {"key": "Authorization", "value": "Bearer token"}
      ]
    }
  }
}
```

#### Cache Content Type
```json
{
  "environment": "production",
  "cache": {
    "cachepriming": {
      "urls": [
        "/api/hero-slides",
        "/api/news",
        "/api/drivers"
      ]
    }
  }
}
```

## 📁 Project Structure

```
testproject/
├── app/                          # Next.js App Router
│   ├── api                       # API routes
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components                    # React components
├── lib/                          # Utility libraries
│   ├── contentstack.ts           # Client-side Contentstack config
│   └── contentstack-server.ts    # Server-side Contentstack config
├── scripts/                      # Build scripts
│   └── generateLaunchJson.ts     # Launch.json generator
├── public/                       # Static assets
├── launch.json                   # Generated launch configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
└── tsconfig.json                 # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager
- Contentstack account with API access

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd testproject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Contentstack Configuration (Server-side)
   CONTENTSTACK_API_KEY=your_api_key
   CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
   CONTENTSTACK_ENVIRONMENT=your_environment
   
   # Contentstack Configuration (Client-side)
   NEXT_PUBLIC_CONTENTSTACK_API_KEY=your_api_key
   NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
   NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=your_environment
   NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token
   NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST=your_preview_host
   NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_HOST=your_live_preview_host
   NEXT_PUBLIC_CONTENTSTACK_APP_HOST=your_app_host
   ```

4. **Set up Contentstack Content Types**
   
   Create the following content types in your Contentstack stack:
   - `redirects`: For URL redirects configuration
   - `rewrites`: For URL rewrites configuration  
   - `cache`: For cache priming configuration

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production (includes launch.json generation)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate:launch` - Generate launch.json manually
- `npm run prebuild` - Pre-build script (generates launch.json)

## 🔧 Configuration

### Launch.json Generation Process

The `generateLaunchJson.ts` script:

1. **Connects to Contentstack** using environment variables
2. **Fetches configuration entries** from redirects, rewrites, and cache content types
3. **Filters by environment** to ensure correct configuration per deployment
4. **Processes headers** from Contentstack's header_pairs format
5. **Generates launch.json** with proper structure for deployment platforms

### Generated Launch.json Structure

```json
{
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "statusCode": 301,
      "response": {
        "headers": {
          "Cache-Control": "max-age=3600"
        }
      }
    }
  ],
  "rewrites": [
    {
      "source": "/api/proxy/*",
      "destination": "https://external-api.com/*",
      "request": {
        "headers": {
          "Authorization": "Bearer token"
        }
      }
    }
  ],
  "cache": {
    "cachePriming": {
      "urls": [
        "/api/hero-slides",
        "/api/news"
      ]
    }
  }
}
```

### Next.js Configuration

The `next.config.ts` includes:
- Image optimization for multiple domains
- Remote patterns for external images
- Support for Contentstack CDN images

## 🎨 Customization

### Adding New Configuration Types

1. **Create a new content type** in Contentstack
2. **Add fetching logic** in `generateLaunchJson.ts`
3. **Process the data** according to your needs
4. **Add to launch.json** structure

### Modifying Content Types

Update the content type structure in Contentstack and modify the processing logic in the generation script accordingly.

### Environment-Specific Configuration

The system automatically filters configuration by environment. Ensure your Contentstack entries have the correct environment field set.

## 🚀 Deployment

### Build Process

1. **Pre-build**: `npm run prebuild` generates launch.json
2. **Build**: `npm run build` creates production build
3. **Deploy**: Use your preferred deployment platform

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:

- 📧 **Email**: [Your email]
- 🐛 **Issues**: [GitHub Issues]
- 📖 **Documentation**: [Contentstack Docs](https://www.contentstack.com/docs/)

---

**Built with ❤️ using Next.js , Contentstack, and dynamic configuration generation**
