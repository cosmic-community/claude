# Claude Capabilities Blog
![App Preview](https://imgix.cosmicjs.com/b13904e0-218f-11f1-828e-9725d89bb937-autopilot-photo-1507925921958-8a62f3d1a50d-1773703646247.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern blog exploring everything Claude can do — from creative writing and code generation to analysis, reasoning, and beyond. Built with [Next.js](https://nextjs.org/) 16 and powered by [Cosmic](https://www.cosmicjs.com/docs).

## Features

- 🚀 **Next.js 16 App Router** — Server-side rendering with React Server Components
- 🎨 **Modern Design** — Clean, responsive UI with Tailwind CSS and purple gradient accents
- 📝 **Dynamic Blog Posts** — Rich content pages with featured images and categories
- 🏷️ **Category System** — Filter and browse posts by topic category
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- ⚡ **Performance Optimized** — Server components, image optimization via imgix
- 🔍 **SEO Ready** — Proper meta tags and semantic HTML
- 🎯 **TypeScript** — Strict type safety throughout the entire codebase

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69b891a93704c8f1904ce726&clone_repository=69b892b93704c8f1904ce751)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I want to build a blog that is all about what Claude can do."

### Code Generation Prompt

> "Build a Next.js application for a website called 'Claude'. The content is managed in Cosmic CMS with the following object types: posts, categories. Create a beautiful, modern, responsive design with a homepage and pages for each content type. I want to build a blog that is all about what Claude can do."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS
- [@cosmicjs/sdk](https://www.npmjs.com/package/@cosmicjs/sdk) — Cosmic JavaScript SDK

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket configured

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd claude-blog
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

### Fetching Posts
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)
```

### Fetching a Single Post by Slug
```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post-slug' })
  .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at'])
  .depth(1)
```

### Fetching Categories
```typescript
const { objects: categories } = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses Cosmic CMS with the following content models:

### Posts (`posts`)
- **content** — Rich text content for the blog post
- **featured_image** — Hero image for the post
- **category** — Connected category object
- **publication_date** — Date the post was published

### Categories (`categories`)
- **name** — Category display name
- **description** — Category description text

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify
1. Push your code to GitHub
2. Import the project on [Netlify](https://netlify.com)
3. Set the build command to `bun run build`
4. Add environment variables
5. Deploy!

<!-- README_END -->