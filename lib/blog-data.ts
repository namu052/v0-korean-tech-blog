export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  tags: string[]
  coverImage: string
  readTime: number
}

export const blogPosts: BlogPost[] = [
  {
    id: 'react-19-features',
    title: 'React 19: What\'s New and What It Means for Developers',
    excerpt: 'Discover the latest features in React 19, including the Server Components API, improved compiler optimizations, and enhanced developer experience.',
    content: `# React 19: What's New and What It Means for Developers

React 19 brings significant improvements to the React ecosystem. With enhanced Server Components support and improved performance optimizations, developers can build faster, more efficient applications.

## Key Features

### 1. Server Components
The Server Components API allows you to write components that run exclusively on the server, reducing JavaScript sent to the client.

### 2. Compiler Improvements
React 19 includes a new compiler that automatically optimizes your code, removing unnecessary re-renders and improving performance.

### 3. New Hooks
Several new hooks have been added to make state management and side effects easier to handle.

## Migration Guide
Migrating to React 19 is straightforward for most applications. Follow our comprehensive guide to update your projects.`,
    date: '2024-12-15',
    author: 'Alex Kim',
    tags: ['React', 'JavaScript', 'Web Development'],
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    readTime: 8,
  },
  {
    id: 'typescript-best-practices',
    title: 'TypeScript Best Practices in 2024',
    excerpt: 'Learn essential TypeScript patterns and best practices to write more maintainable and type-safe code in your projects.',
    content: `# TypeScript Best Practices in 2024

TypeScript has become the standard for large-scale JavaScript applications. Here are the best practices you should follow.

## Type Safety First
Always enable strict mode in your tsconfig.json to catch potential issues early.

## Utility Types
TypeScript provides powerful utility types that can help you write more concise and reusable code.

## Performance Tips
- Use const assertions for literal types
- Avoid circular dependencies
- Use type-only imports

## Common Mistakes to Avoid
Explore the most common TypeScript mistakes and how to avoid them in your projects.`,
    date: '2024-12-10',
    author: 'Sarah Lee',
    tags: ['TypeScript', 'Best Practices', 'Code Quality'],
    coverImage: 'https://images.unsplash.com/photo-1516321334612-a01a3e58de7e?w=800&h=400&fit=crop',
    readTime: 10,
  },
  {
    id: 'web-performance-optimization',
    title: 'Web Performance Optimization: A Complete Guide',
    excerpt: 'Master the techniques to optimize your web applications for speed and deliver better user experience to your visitors.',
    content: `# Web Performance Optimization: A Complete Guide

Performance is crucial for user experience and SEO. Learn how to optimize every aspect of your web application.

## Core Web Vitals
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

## Optimization Techniques
1. Image Optimization
   - Use modern formats like WebP
   - Implement lazy loading
   - Responsive images

2. Code Splitting
   - Route-based splitting
   - Component-based splitting
   - Dynamic imports

3. Caching Strategies
   - Browser caching
   - CDN integration
   - Service Workers

## Monitoring Tools
Learn about tools and services to monitor your application's performance in production.`,
    date: '2024-12-05',
    author: 'Michael Park',
    tags: ['Performance', 'Web Dev', 'Optimization'],
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab655c486?w=800&h=400&fit=crop',
    readTime: 12,
  },
  {
    id: 'nextjs-app-router',
    title: 'Next.js 16: App Router Deep Dive',
    excerpt: 'Explore the Next.js App Router and learn how to build modern, scalable applications with the latest Next.js features.',
    content: `# Next.js 16: App Router Deep Dive

The App Router represents the future of Next.js development. Let's explore its powerful features.

## File-based Routing
The intuitive file-based routing system in the app directory makes organizing your application simple and scalable.

## Server Components
Build components that run on the server, reducing client-side JavaScript and improving performance.

## API Routes
Create robust API endpoints with TypeScript support and full control over request/response handling.

## Data Fetching
- Async components for data fetching
- Request deduplication
- Caching strategies

## Best Practices
- Organize your file structure effectively
- Use layout components for shared UI
- Implement error boundaries
- Optimize images and assets`,
    date: '2024-11-28',
    author: 'Emma Johnson',
    tags: ['Next.js', 'React', 'Web Development'],
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    readTime: 11,
  },
  {
    id: 'tailwind-css-tips',
    title: 'Tailwind CSS Tips and Tricks',
    excerpt: 'Discover advanced Tailwind CSS techniques to create beautiful, responsive designs faster and more efficiently.',
    content: `# Tailwind CSS Tips and Tricks

Tailwind CSS has revolutionized how we write CSS. Here are powerful tips to level up your styling.

## Utility-First Workflow
Understand the power of utility-first CSS and how it improves development speed.

## Custom Configuration
- Extend default theme
- Create custom utilities
- Use CSS variables with Tailwind

## Performance
- Purge unused styles
- Optimize file size
- Tree-shaking

## Component Design
Build reusable component patterns with Tailwind using @apply and configuration.

## Dark Mode
Implement sophisticated dark mode support with Tailwind's built-in utilities.`,
    date: '2024-11-20',
    author: 'David Chen',
    tags: ['CSS', 'Tailwind', 'Design'],
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    readTime: 7,
  },
  {
    id: 'api-design-patterns',
    title: 'RESTful API Design Patterns',
    excerpt: 'Learn how to design robust, scalable, and user-friendly REST APIs following industry best practices.',
    content: `# RESTful API Design Patterns

Building great APIs is essential for modern web applications. Here's how to do it right.

## REST Principles
- Client-server architecture
- Statelessness
- Uniform interface
- Resource-oriented design

## Naming Conventions
- Use nouns for resources
- Use verbs for actions
- Keep URLs simple and readable

## Error Handling
Implement consistent error responses with proper HTTP status codes.

## Versioning
- URL-based versioning
- Header-based versioning
- Content negotiation

## Security
- Authentication (JWT, OAuth)
- Authorization
- Rate limiting
- HTTPS enforcement`,
    date: '2024-11-15',
    author: 'Lisa Wong',
    tags: ['API', 'Backend', 'Design Patterns'],
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    readTime: 9,
  },
]

export function getAllTags(): string[] {
  const tags = new Set<string>()
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export function searchPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase()
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}

export function filterByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag))
}
