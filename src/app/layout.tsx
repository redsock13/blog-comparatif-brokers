import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ComparatifBrokers.fr — Les meilleurs courtiers en ligne en 2026',
  description: 'Analyses indépendantes et comparatifs détaillés des meilleurs brokers en ligne en France. Trouvez le courtier adapté à votre profil d\'investisseur.',
  keywords: 'comparatif broker france, meilleur courtier en ligne, trade republic, degiro, etoro, bourse france',
}

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/articles', label: 'Articles' },
  { href: '/#comparatif', label: 'Comparatifs' },
]

const BROKERS_QUICK = [
  { name: 'Trade Republic', score: '4.8', badge: '🏆 #1', color: 'text-yellow-400' },
  { name: 'Degiro', score: '4.6', badge: '💎 ETF', color: 'text-blue-400' },
  { name: 'eToro', score: '4.4', badge: '📱 Copy', color: 'text-green-400' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="bg-primary/10 border-b border-primary/20 py-2 px-4 text-center text-xs text-primary">
          ⚠️ Cet article est informatif uniquement — pas un conseil en investissement. Faites vos propres recherches.
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-xl border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 no-underline group">
              <span className="text-2xl">💹</span>
              <div>
                <div className="font-bold text-white text-lg leading-none">ComparatifBrokers</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">.fr</div>
              </div>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors no-underline font-medium">
                  {l.label}
                </a>
              ))}
            </nav>
            <a href="/#comparatif" className="btn-primary text-sm py-2 px-4">
              Comparer →
            </a>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 mt-20">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">💹</span>
                  <span className="font-bold text-white">ComparatifBrokers.fr</span>
                </div>
                <p className="text-gray-500 text-sm">Analyses indépendantes pour investisseurs particuliers français depuis 2024.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Top Brokers</h4>
                {BROKERS_QUICK.map(b => (
                  <div key={b.name} className="flex justify-between items-center py-1.5 border-b border-gray-800 text-sm">
                    <span className="text-gray-300">{b.name}</span>
                    <span className={`font-semibold ${b.color}`}>{b.badge}</span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Avertissement légal</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  ComparatifBrokers.fr est un site d'information indépendant. Les contenus publiés ne constituent pas des conseils en investissement. 
                  Investir comporte des risques de perte en capital. Les performances passées ne garantissent pas les performances futures.
                </p>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
              © 2026 ComparatifBrokers.fr — Tous droits réservés
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
