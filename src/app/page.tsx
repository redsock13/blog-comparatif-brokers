import Link from 'next/link'
import { getArticles } from '@/lib/articles'

export default async function Home() {
  const articles = await getArticles()
  
  return (
    <div>
      {/* Hero */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-10 px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Quel broker choisir en 2026 ?
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Analyses indépendantes, comparatifs détaillés et avis honnêtes pour choisir 
          le meilleur courtier en ligne selon votre profil.
        </p>
      </section>

      {/* Comparatif rapide */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">🏆 Top 5 brokers France 2026</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Broker</th>
                <th>Note</th>
                <th>Frais</th>
                <th>Idéal pour</th>
                <th>Offre</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Trade Republic</strong></td>
                <td>⭐ 4.8/5</td>
                <td>1€/ordre</td>
                <td>Débutants</td>
                <td><a href="#" className="bg-primary text-white px-3 py-1 rounded text-xs">Ouvrir un compte</a></td>
              </tr>
              <tr>
                <td><strong>Degiro</strong></td>
                <td>⭐ 4.6/5</td>
                <td>0.50€+</td>
                <td>ETF passifs</td>
                <td><a href="#" className="bg-primary text-white px-3 py-1 rounded text-xs">Ouvrir un compte</a></td>
              </tr>
              <tr>
                <td><strong>eToro</strong></td>
                <td>⭐ 4.4/5</td>
                <td>0€ actions</td>
                <td>Copy trading</td>
                <td><a href="#" className="bg-primary text-white px-3 py-1 rounded text-xs">Ouvrir un compte</a></td>
              </tr>
              <tr>
                <td><strong>Boursorama</strong></td>
                <td>⭐ 4.3/5</td>
                <td>Variable</td>
                <td>Compte complet</td>
                <td><a href="#" className="bg-primary text-white px-3 py-1 rounded text-xs">Ouvrir un compte</a></td>
              </tr>
              <tr>
                <td><strong>Fortuneo</strong></td>
                <td>⭐ 4.2/5</td>
                <td>Variable</td>
                <td>PEA</td>
                <td><a href="#" className="bg-primary text-white px-3 py-1 rounded text-xs">Ouvrir un compte</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Articles récents */}
      <section>
        <h2 className="text-2xl font-bold mb-6">📰 Derniers articles</h2>
        <div className="grid gap-6">
          {articles.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="no-underline">
              <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mb-2 inline-block">
                  {article.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-1">{article.title}</h3>
                <p className="text-gray-500 text-sm">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                  <span>{article.date}</span>
                  <span>{article.readTime} min de lecture</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
