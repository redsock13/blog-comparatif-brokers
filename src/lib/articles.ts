import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDir = path.join(process.cwd(), 'content/articles')

export interface Article {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: number
  content: string
}

export async function getArticles(): Promise<Article[]> {
  if (!fs.existsSync(articlesDir)) return []
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'))
  return files.map(file => {
    const raw = fs.readFileSync(path.join(articlesDir, file), 'utf8')
    const { data, content } = matter(raw)
    return {
      slug: file.replace('.md', ''),
      title: data.title || '',
      excerpt: data.excerpt || '',
      date: data.date || '',
      category: data.category || 'Analyse',
      readTime: data.readTime || 5,
      content,
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getArticle(slug: string): Promise<Article | null> {
  const file = path.join(articlesDir, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    date: data.date || '',
    category: data.category || 'Analyse',
    readTime: data.readTime || 5,
    content,
  }
}
