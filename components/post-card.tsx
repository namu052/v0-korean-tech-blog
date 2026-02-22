import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/date-utils'

interface PostCardProps {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  tags: string[]
  coverImage: string
  readTime: number
}

export function PostCard({
  id,
  title,
  excerpt,
  date,
  author,
  tags,
  coverImage,
  readTime,
}: PostCardProps) {
  return (
    <Link href={`/blog/${id}`}>
      <article className="group overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/20 to-purple-500/20">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-card-foreground group-hover:text-accent transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="text-card-foreground/70 text-sm line-clamp-2">
              {excerpt}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-card-foreground/60">
            <div className="space-y-1">
              <p className="font-medium text-card-foreground/80">{author}</p>
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
            <span className="bg-secondary/50 px-2 py-1 rounded">
              {readTime} min read
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
