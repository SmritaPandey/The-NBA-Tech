# NBA Tech Website Deployment Guide

This guide provides instructions for deploying the NBA Tech website to various hosting environments.

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Access to a hosting environment (server, cloud platform, etc.)

## Deployment Options

### Option 1: Traditional Node.js Server

#### Step 1: Prepare the Deployment Package

Run the deployment script to create a deployment package:

```bash
# Make the script executable
chmod +x deployment/deploy.sh

# Run the script
./deployment/deploy.sh
```

This will create a `nba-tech-website.tar.gz` file containing everything needed for deployment.

#### Step 2: Upload to Server

Upload the deployment package to your server:

```bash
scp nba-tech-website.tar.gz user@your-server:/path/to/deployment/
```

#### Step 3: Extract and Run

SSH into your server and extract the package:

```bash
ssh user@your-server
cd /path/to/deployment/
tar -xzf nba-tech-website.tar.gz
cd dist
```

Install PM2 (if not already installed):

```bash
npm install -g pm2
```

Start the application with PM2:

```bash
pm2 start npm --name "nba-tech" -- start
```

Configure PM2 to start on system boot:

```bash
pm2 startup
pm2 save
```

### Option 2: Vercel (Recommended)

Vercel is the easiest platform for deploying Next.js applications.

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Deploy

From the project root directory:

```bash
vercel
```

Follow the prompts to complete the deployment.

For production deployment:

```bash
vercel --prod
```

### Option 3: Docker Deployment

#### Step 1: Create a Dockerfile

Create a file named `Dockerfile` in the project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Step 2: Build and Run the Docker Image

```bash
# Build the Docker image
docker build -t nba-tech-website .

# Run the container
docker run -p 3000:3000 nba-tech-website
```

## Environment Variables

For production deployment, you may need to set the following environment variables:

- `NODE_ENV=production` - Ensures the application runs in production mode
- `NEXT_PUBLIC_API_URL` - The URL of your API (if applicable)
- `NEXT_PUBLIC_SITE_URL` - The public URL of your website

## Post-Deployment Tasks

After deploying the website, perform the following tasks:

1. **Set up SSL/TLS**: Configure HTTPS for your domain using Let's Encrypt or another SSL provider
2. **Configure CDN**: Set up a CDN like Cloudflare for better performance
3. **Set up monitoring**: Configure monitoring tools like New Relic or Datadog
4. **Configure backups**: Set up regular backups of your application data

## Troubleshooting

If you encounter issues during deployment:

1. Check the application logs:
   ```bash
   pm2 logs nba-tech
   ```

2. Verify that all environment variables are correctly set

3. Ensure the server has sufficient resources (CPU, memory, disk space)

4. Check that all required ports are open in your firewall

## Support

For deployment assistance, contact:

- Email: support@thenbatech.com
- Phone: +91 8840592989
