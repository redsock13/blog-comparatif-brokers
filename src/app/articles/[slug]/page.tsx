import { getArticle, getArticles } from '@/lib/articles'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map(a => ({ slug: a.slug }))
}

const CATEGORY_COLORS: Record<string, string> = {
  'Comparatif': 'bg-blue-500/20 text-blue-400',
  'ETF': 'bg-green-500/20 text-green-400',
  'Crypto': 'bg-orange-500/20 text-orange-400',
  'Fiscalité': 'bg-purple-500/20 text-purple-400',
  'Avis broker': 'bg-cyan-500/20 text-cyan-400',
}

function renderContent(content: string) {
  return content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split('|').filter((_, i, arr) => i > 0 && i < arr.length - 1)
      return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>'
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, (match, _, offset, str) => {
      const prevChar = str.substring(offset - 10, offset)
      if (prevChar.includes('</thead>') || prevChar.includes('<table>')) return match
      return '<table class="table-finance"><tbody>' + match + '</tbody></table>'
    })
    .replace(/^(?!<[hultba]).+/gm, line => line.trim() ? `<p>${line}</p>` : '')
    .replace(/<p>---<\/p>/g, '<hr class="border-gray-700 my-8" />')
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  const allArticles = await getArticles()
  const related = allArticles.filter(a => a.slug !== params.slug).slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-[1fr_300px] gap-10">
        {/* Article principal */}
        <article>
          {/* Header */}
          <div className="mb-8">
            <Link href="/articles" className="text-sm text-gray-500 hover:text-primary flex items-center gap-1 mb-4 no-underline">
              ← Retour aux articles
            </Link>
            <span className={`badge ${CATEGORY_COLORS[article.category] || 'bg-gray-700 text-gray-300'}`}>
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-lg text-gray-400 mb-6">{article.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-800">
              <span>📅 {article.date}</span>
              <span>⏱ {article.readTime} min de lecture</span>
            </div>
          </div>

          {/* Image hero */}
          {article.image && (
            <div className="rounded-2xl overflow-hidden mb-8 h-64 md:h-80">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Contenu */}
          <div
            className="prose-finance"
            dangerouslySetInnerHTML={{ __html: renderContent(article.content) }}
          />

          {/* Disclaimer légal */}
          <div className="mt-10 p-5 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
            <div className="flex gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <div className="font-semibold text-yellow-400 mb-1">Avertissement légal</div>
                <p className="text-sm text-gray-400">
                  Cet article est fourni à titre informatif uniquement et ne constitue pas un conseil en investissement financier. 
                  Les performances passées ne garantissent pas les performances futures. Tout investissement comporte un risque de perte en capital. 
                  Consultez un conseiller financier agréé avant toute décision d'investissement.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Top brokers widget */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="font-bold text-white mb-4">🏆 Top Brokers 2026</h3>
            {[
              { name: 'Trade Republic', note: '4.8/5', badge: '#1 Débutants', color: 'text-yellow-400' },
              { name: 'Degiro', note: '4.6/5', badge: 'ETF passif', color: 'text-blue-400' },
              { name: 'eToro', note: '4.4/5', badge: 'Copy trading', color: 'text-green-400' },
            ].map(b => (
              <div key={b.name} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                <div>
                  <div className="font-medium text-white text-sm">{b.name}</div>
                  <div className={`text-xs ${b.color}`}>{b.badge}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary text-sm">{b.note}</div>
                  <a href="#" className="text-xs text-gray-500 hover:text-primary">Ouvrir →</a>
                </div>
              </div>
            ))}
          </div>

          {/* Articles liés */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="font-bold text-white mb-4">📰 Articles liés</h3>
            {related.map(a => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="block py-3 border-b border-gray-800 last:border-0 no-underline group">
                <div className="text-sm font-medium text-gray-300 group-hover:text-primary transition-colors line-clamp-2">{a.title}</div>
                <div className="text-xs text-gray-600 mt-1">{a.readTime} min</div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
