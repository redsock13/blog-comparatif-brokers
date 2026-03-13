import Link from 'next/link'
import { getArticles } from '@/lib/articles'

const STATS = [
  { value: '2.4M+', label: 'Investisseurs aidés', icon: '👥' },
  { value: '98%', label: 'Avis positifs', icon: '⭐' },
  { value: '47', label: 'Brokers analysés', icon: '🔍' },
  { value: '0€', label: 'Frais d\'utilisation', icon: '💰' },
]

const BROKERS = [
  {
    rank: 1,
    name: 'Trade Republic',
    logo: '🟢',
    score: 4.8,
    fees: '1€/ordre',
    min: '1€',
    pea: false,
    best: 'Débutants',
    badge: 'Meilleur global',
    badgeColor: 'bg-yellow-500/20 text-yellow-400',
    highlight: true,
    pros: ['Interface ultra-simple', '3,75% sur cash', '3 000+ ETF'],
    url: '#',
  },
  {
    rank: 2,
    name: 'Degiro',
    logo: '🔵',
    score: 4.6,
    fees: '0,50€+',
    min: '0€',
    pea: true,
    best: 'ETF passif',
    badge: 'Frais les plus bas',
    badgeColor: 'bg-blue-500/20 text-blue-400',
    highlight: false,
    pros: ['PEA disponible', 'Frais mini', '50+ marchés'],
    url: '#',
  },
  {
    rank: 3,
    name: 'eToro',
    logo: '⚫',
    score: 4.4,
    fees: '0€ actions',
    min: '50€',
    pea: false,
    best: 'Copy trading',
    badge: 'Social trading',
    badgeColor: 'bg-green-500/20 text-green-400',
    highlight: false,
    pros: ['Copier les experts', '0€ sur actions', 'Crypto incluse'],
    url: '#',
  },
  {
    rank: 4,
    name: 'Boursorama',
    logo: '🟡',
    score: 4.3,
    fees: 'Variable',
    min: '0€',
    pea: true,
    best: 'Compte complet',
    badge: 'Banque + Bourse',
    badgeColor: 'bg-purple-500/20 text-purple-400',
    highlight: false,
    pros: ['PEA + CTO + AV', 'Banque gratuite', 'Français'],
    url: '#',
  },
  {
    rank: 5,
    name: 'Fortuneo',
    logo: '🟠',
    score: 4.2,
    fees: '6€/ordre',
    min: '0€',
    pea: true,
    best: 'PEA actif',
    badge: 'Meilleur PEA',
    badgeColor: 'bg-orange-500/20 text-orange-400',
    highlight: false,
    pros: ['PEA premium', 'Bonus bienvenue', 'Service client'],
    url: '#',
  },
]

const CATEGORIES = [
  { name: 'Comparatifs', icon: '⚖️', count: 12, color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
  { name: 'Crypto', icon: '₿', count: 8, color: 'bg-orange-500/10 border-orange-500/20 text-orange-400' },
  { name: 'ETF & Bourse', icon: '📈', count: 15, color: 'bg-green-500/10 border-green-500/20 text-green-400' },
  { name: 'Fiscalité', icon: '📊', count: 6, color: 'bg-purple-500/10 border-purple-500/20 text-purple-400' },
]

export default async function Home() {
  const articles = await getArticles()

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden py-20 md:py-32 px-4">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 text-sm text-primary mb-8">
            🚀 Mis à jour en Mars 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Quel broker choisir{' '}
            <span className="text-gradient">en 2026 ?</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            On a analysé 47 plateformes pendant 6 mois. Voici les vraies données — sans commission, sans biais — 
            pour vous aider à investir intelligemment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#comparatif" className="btn-primary text-base px-8 py-4">
              Voir le comparatif →
            </a>
            <a href="/articles" className="btn-outline text-base px-8 py-4">
              Lire les analyses
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {STATS.map(s => (
              <div key={s.label} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARATIF TABLE */}
      <section id="comparatif" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">🏆 Classement des meilleurs brokers</h2>
            <p className="text-gray-400">Analyse indépendante — données réelles vérifiées en mars 2026</p>
          </div>

          <div className="space-y-4">
            {BROKERS.map(broker => (
              <div key={broker.name} className={`card p-6 ${broker.highlight ? 'border-primary/50 glow' : ''}`}>
                {broker.highlight && (
                  <div className="flex justify-end mb-2">
                    <span className="badge bg-yellow-500/20 text-yellow-400">⭐ Recommandé par nos experts</span>
                  </div>
                )}
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Rank + Logo + Name */}
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <span className="text-2xl font-black text-gray-600">#{broker.rank}</span>
                    <span className="text-3xl">{broker.logo}</span>
                    <div>
                      <div className="font-bold text-white text-lg">{broker.name}</div>
                      <span className={`badge text-xs ${broker.badgeColor}`}>{broker.badge}</span>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-center">
                    <div className="text-2xl font-black text-primary">{broker.score}/5</div>
                    <div className="text-xs text-gray-500">Note globale</div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-3 gap-4 flex-1">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Frais/ordre</div>
                      <div className="font-semibold text-white">{broker.fees}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Dépôt min.</div>
                      <div className="font-semibold text-white">{broker.min}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">PEA</div>
                      <div className="font-semibold">{broker.pea ? '✅' : '❌'}</div>
                    </div>
                  </div>

                  {/* Pros */}
                  <div className="hidden md:block min-w-[180px]">
                    {broker.pros.map(p => (
                      <div key={p} className="text-xs text-gray-400 flex items-center gap-1 mb-1">
                        <span className="text-primary">✓</span> {p}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div>
                    <a href={broker.url} className={`btn-primary py-2 px-5 text-sm whitespace-nowrap ${broker.highlight ? '' : 'bg-gray-800 shadow-none hover:bg-gray-700 hover:shadow-none'}`}>
                      Ouvrir un compte →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-12 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-8">Nos thématiques</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => (
              <a key={cat.name} href="/articles" className={`border rounded-2xl p-5 text-center transition-all hover:-translate-y-1 no-underline ${cat.color}`}>
                <div className="text-3xl mb-3">{cat.icon}</div>
                <div className="font-semibold">{cat.name}</div>
                <div className="text-xs opacity-70 mt-1">{cat.count} articles</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="section-title mb-0">📰 Dernières analyses</h2>
            <a href="/articles" className="btn-outline text-sm">Tout voir →</a>
          </div>

          {articles.length === 0 ? (
            <p className="text-gray-500 text-center py-12">Les articles arrivent bientôt...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <Link key={article.slug} href={`/articles/${article.slug}`} className="card no-underline group">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image || `https://images.unsplash.com/photo-${UNSPLASH_IDS[i % UNSPLASH_IDS.length]}?w=600&q=80&fit=crop`}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <span className={`absolute top-3 left-3 badge ${CATEGORY_COLORS[article.category] || 'bg-gray-700 text-gray-300'}`}>
                      {article.category}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-white text-lg mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{article.date}</span>
                      <span>{article.readTime} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA NEWSLETTER */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-primary/10 to-indigo-500/10 border border-primary/20 rounded-3xl p-10">
          <div className="text-4xl mb-4">📬</div>
          <h2 className="text-2xl font-bold text-white mb-3">Recevez nos analyses chaque semaine</h2>
          <p className="text-gray-400 mb-6">Décryptage des marchés, nouveaux brokers, stratégies d'investissement — gratuit, sans spam.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.fr"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary"
            />
            <button className="btn-primary py-3 px-5 text-sm">S'abonner</button>
          </div>
        </div>
      </section>
    </div>
  )
}

const UNSPLASH_IDS = [
  '1611974789855-9c2a0a7236a3',
  '1590283603385-17ffb3a7f29f',
  '1559526324-593bc073d938',
  '1642790551116-18a150d3ebc9',
  '1507679799987-c73779587ccf',
]

const CATEGORY_COLORS: Record<string, string> = {
  'Comparatif': 'bg-blue-500/20 text-blue-400',
  'ETF': 'bg-green-500/20 text-green-400',
  'Crypto': 'bg-orange-500/20 text-orange-400',
  'Fiscalité': 'bg-purple-500/20 text-purple-400',
  'Avis broker': 'bg-cyan-500/20 text-cyan-400',
  'Analyse': 'bg-gray-700 text-gray-300',
}
