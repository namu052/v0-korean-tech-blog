'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { PostCard } from '@/components/post-card'
import { blogPosts, getAllTags, searchPosts, filterByTag } from '@/lib/blog-data'
import { Search, X } from 'lucide-react'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const allTags = getAllTags()

  const filteredPosts = useMemo(() => {
    let results = blogPosts

    // Filter by search query
    if (searchQuery.trim()) {
      results = searchPosts(searchQuery)
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      results = results.filter((post) =>
        selectedTags.some((tag) => post.tags.includes(tag))
      )
    }

    return results
  }, [searchQuery, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="border-b border-border bg-gradient-to-br from-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Blog
            </h1>
            <p className="text-lg text-foreground/60">
              Explore {blogPosts.length} articles about web development, best practices, and technology trends
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Search and Filters */}
          <aside className="lg:col-span-1 space-y-6 h-fit">
            {/* Search Box */}
            <div className="sticky top-20 space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-card-foreground placeholder-card-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-foreground/40 hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Tags Filter */}
              <div className="space-y-3">
                <h3 className="font-bold text-foreground">Tags</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                        selectedTags.includes(tag)
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-secondary/50 text-foreground/80 hover:bg-secondary'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedTags.length > 0) && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedTags([])
                  }}
                  className="w-full px-4 py-2 border border-border text-foreground/70 rounded-lg hover:bg-secondary/50 transition-colors text-sm font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </aside>

          {/* Posts Grid */}
          <section className="lg:col-span-3 space-y-8">
            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground/60">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
              </p>
              {selectedTags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => toggleTag(tag)}
                        className="hover:text-accent-foreground"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Posts List */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-foreground/60 mb-4">
                  No posts found matching your criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedTags([])
                  }}
                  className="text-accent hover:text-accent/80 font-semibold"
                >
                  Clear filters and try again
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

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
