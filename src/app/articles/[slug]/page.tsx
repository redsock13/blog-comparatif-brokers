import { getArticle, getArticles } from '@/lib/articles'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map(a => ({ slug: a.slug }))
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  return (
    <article className="max-w-3xl mx-auto">
      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
        {article.category}
      </span>
      <h1 className="mt-3">{article.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-4 border-b">
        <span>{article.date}</span>
        <span>{article.readTime} min de lecture</span>
      </div>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }}
      />
      <div className="mt-10 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
        ⚠️ <strong>Avertissement :</strong> Cet article est fourni à titre informatif uniquement. 
        Il ne constitue pas un conseil en investissement. Les performances passées ne préjugent pas 
        des performances futures. Faites vos propres recherches avant tout investissement.
      </div>
    </article>
  )
}
