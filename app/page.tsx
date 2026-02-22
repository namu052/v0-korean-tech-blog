import { Navbar } from '@/components/navbar'
import { PostCard } from '@/components/post-card'
import { blogPosts } from '@/lib/blog-data'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  const recentPosts = blogPosts.slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-accent/5 to-purple-500/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="space-y-6 max-w-3xl">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Explore the Future of
                <span className="bg-gradient-to-r from-accent via-purple-500 to-blue-500 bg-clip-text text-transparent block">
                  Technology
                </span>
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl">
                Deep-dive into cutting-edge technologies, best practices, and industry insights. Stay ahead with our curated collection of tech articles and tutorials.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Read All Posts
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary/50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Latest Posts</h2>
            <p className="text-foreground/60">Discover the most recent articles from our tech blog</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold"
            >
              View all posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 mt-20">
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
                <li><Link href="/blog" className="hover:text-foreground transition-colors">Web Development</Link></li>
                <li><Link href="/blog" className="hover:text-foreground transition-colors">Best Practices</Link></li>
                <li><Link href="/blog" className="hover:text-foreground transition-colors">Tutorials</Link></li>
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
