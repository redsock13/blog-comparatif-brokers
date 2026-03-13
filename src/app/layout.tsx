import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Comparatif Brokers France 2026 — Meilleur courtier en ligne',
  description: 'Comparez les meilleurs brokers et courtiers en ligne en France. Analyses indépendantes, tableaux comparatifs, avis détaillés.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header className="bg-primary text-white py-4 px-6 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-white no-underline">
            💹 ComparatifBrokers.fr
          </a>
          <nav className="space-x-6 text-sm">
            <a href="/articles" className="text-white hover:text-blue-200">Articles</a>
            <a href="/comparatifs" className="text-white hover:text-blue-200">Comparatifs</a>
          </nav>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
        <footer className="bg-gray-100 text-center text-xs text-gray-500 py-6 mt-12">
          <p>© 2026 ComparatifBrokers.fr — Site indépendant, non affilié à aucun broker.</p>
          <p className="mt-1">Les informations publiées ne constituent pas des conseils en investissement.</p>
        </footer>
      </body>
    </html>
  )
}
