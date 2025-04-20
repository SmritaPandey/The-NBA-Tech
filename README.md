# NBA TECH - Corporate Website

A modern, responsive corporate website for NBA TECH with light and dark mode support.

![NBA TECH Website](https://via.placeholder.com/800x400?text=NBA+TECH+Website)

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Light/Dark Mode**: Toggle between light and dark themes with a smooth transition
- **Modern UI**: Clean, professional design with subtle animations
- **Interactive Components**: Engaging UI elements with hover effects and animations
- **Service Showcase**: Detailed presentation of company services
- **Case Studies**: Portfolio of past projects with detailed case studies
- **Performance Dashboard**: Visual representation of company metrics
- **Contact Form**: Easy-to-use contact form for inquiries

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: High-quality UI components built with Radix UI and Tailwind
- **Framer Motion**: Animation library for React
- **Lucide Icons**: Beautiful, consistent icon set

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nba-tech-redesign.git
   cd nba-tech-redesign
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   # or
   pnpm install --no-strict-peer-dependencies
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
nba-tech-redesign/
├── app/                  # Next.js app directory
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page component
├── components/           # React components
│   ├── ui/               # UI components from shadcn/ui
│   ├── hero-section.tsx  # Hero section component
│   ├── navbar.tsx        # Navigation bar component
│   ├── services-section.tsx # Services section component
│   └── ...               # Other components
├── lib/                  # Utility functions
├── public/               # Static assets
└── ...                   # Configuration files
```

## Customization

### Theme

The theme colors can be customized in `app/globals.css`. The website uses CSS variables for theming, making it easy to change colors for both light and dark modes.

### Components

UI components are built using shadcn/ui, which provides a collection of reusable components that you can copy and paste into your project. These components are built on top of Radix UI and styled with Tailwind CSS.

## Deployment

See the [Deployment Guide](./deployment/DEPLOYMENT_GUIDE.md) for detailed instructions on deploying the website to various environments.

### Quick Deployment Options

#### Vercel

The easiest way to deploy the website is using Vercel:

```bash
npm install -g vercel
vercel
```

#### Docker

You can also deploy using Docker:

```bash
docker-compose up -d
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fnba-tech-redesign)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) for the UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for the animations
- [Lucide Icons](https://lucide.dev/) for the icons
- [21st.dev](https://21st.dev) for theme toggle inspiration
