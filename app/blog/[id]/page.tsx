import { Navbar } from '@/components/navbar'
import { blogPosts } from '@/lib/blog-data'
import { formatDate } from '@/lib/date-utils'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface BlogPostPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }))
}

export function generateMetadata({
  params,
}: BlogPostPageProps & { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === params.id)
  if (!post) {
    return {
      title: 'Post not found',
      description: 'The blog post you are looking for does not exist.',
    }
  }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params
  const post = blogPosts.find((p) => p.id === id)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="relative h-96 overflow-hidden bg-gradient-to-br from-accent/20 to-purple-500/20">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative pb-12">
          <div className="space-y-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to blog
            </Link>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border/50">
              <div className="space-y-1">
                <p className="font-semibold text-foreground">{post.author}</p>
                <time dateTime={post.date} className="text-foreground/60 text-sm">
                  {formatDate(post.date)}
                </time>
              </div>
              <div className="flex items-center gap-4 text-sm text-foreground/60">
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none dark:prose-invert">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('#')) {
                const level = paragraph.match(/^#+/)?.[0].length || 1
                const text = paragraph.replace(/^#+\s/, '')
                const headingClass = {
                  1: 'text-3xl font-bold mt-8 mb-4',
                  2: 'text-2xl font-bold mt-6 mb-3',
                  3: 'text-xl font-bold mt-4 mb-2',
                }[level] || 'text-lg font-bold'

                return (
                  <h2 key={idx} className={`text-foreground ${headingClass}`}>
                    {text}
                  </h2>
                )
              } else if (paragraph.startsWith('-') || paragraph.startsWith('•')) {
                return (
                  <ul key={idx} className="space-y-2 text-foreground/80 ml-6 list-disc">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i}>{item.replace(/^[-•]\s/, '')}</li>
                    ))}
                  </ul>
                )
              } else if (/^\d+\./.test(paragraph)) {
                return (
                  <ol key={idx} className="space-y-2 text-foreground/80 ml-6 list-decimal">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
                    ))}
                  </ol>
                )
              } else {
                return (
                  <p key={idx} className="text-foreground/80 leading-relaxed text-lg">
                    {paragraph}
                  </p>
                )
              }
            })}
          </div>

          {/* Author Info */}
          <div className="border-t border-border pt-8 mt-12">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">{post.author}</h3>
                <p className="text-foreground/60 text-sm">Tech writer and developer</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-secondary/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Related Posts</h2>
                <p className="text-foreground/60">Check out these related articles</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className="group overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-32 overflow-hidden bg-gradient-to-br from-accent/20 to-purple-500/20">
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-bold text-card-foreground group-hover:text-accent transition-colors line-clamp-2 text-sm">
                        {relatedPost.title}
                      </h3>
                      <p className="text-xs text-card-foreground/60">{formatDate(relatedPost.date)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">About</h3>
              <p className="text-foreground/60 text-sm">
                A modern tech blog exploring the latest technologies and best practices.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>Web Development</li>
                <li>Best Practices</li>
                <li>Tutorials</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-foreground/60">
            <p>&copy; 2024 Tech Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
