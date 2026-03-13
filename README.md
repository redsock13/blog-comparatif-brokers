# ComparatifBrokers.fr — Blog Finance Automatisé

Blog Next.js sur la niche "comparatif brokers France" — SEO, affiliation, AdSense.

## Structure

```
blog-comparatif-brokers/
├── src/app/          → Pages Next.js (layout, home, article)
├── src/lib/          → Utilitaires (lecture articles)
├── content/articles/ → Articles Markdown (générés par IA)
└── scripts/          → generate-article.js (générateur Haiku)
```

## Démarrage

```bash
npm install
npm run dev          # Développement local
npm run build        # Build production
```

## Générer des articles

```bash
ANTHROPIC_API_KEY=xxx npm run generate              # 1 article
ANTHROPIC_API_KEY=xxx npm run generate -- --count=5 # 5 articles
```

## Déploiement Vercel

1. Push sur GitHub
2. Connecter le repo sur vercel.com
3. Ajouter ANTHROPIC_API_KEY dans les env vars Vercel
4. Deploy automatique à chaque push

## Monétisation

- **AdSense** : Ajouter le script Google dans layout.tsx
- **Affiliation** : Remplacer les `href="#"` dans page.tsx par les vrais liens affiliés :
  - Trade Republic : https://referal.trade-republic.com/...
  - Degiro : https://www.degiro.fr/parrainage/...
  - eToro : https://etoro.tw/...
