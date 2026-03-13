#!/usr/bin/env node
/**
 * Générateur d'articles via Claude Haiku
 * Règles Gemini intégrées : angle unique, données froides, anti-motifs IA, maillage SEO, disclaimer
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const ARTICLES_DIR = path.join(__dirname, '../content/articles')

if (!ANTHROPIC_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY manquante')
  process.exit(1)
}

if (!fs.existsSync(ARTICLES_DIR)) fs.mkdirSync(ARTICLES_DIR, { recursive: true })

// Topics à couvrir (rotation automatique)
const TOPICS = [
  { title: "Trade Republic vs Degiro 2026 : lequel choisir pour débuter ?", profile: "débutant", category: "Comparatif", keyword: "trade republic vs degiro" },
  { title: "ETF MSCI World : le meilleur investissement passif pour les salariés français ?", profile: "salarié qui veut épargner sans y penser", category: "ETF", keyword: "ETF MSCI World France" },
  { title: "eToro avis 2026 : arnaque ou opportunité réelle ?", profile: "investisseur méfiant qui cherche des preuves", category: "Avis broker", keyword: "etoro avis 2026" },
  { title: "PEA vs Compte-titres : ce que les banques ne vous disent pas", profile: "contribuable français qui veut optimiser sa fiscalité", category: "Fiscalité", keyword: "PEA vs compte-titres" },
  { title: "Crypto en 2026 : les 3 erreurs que font encore 90% des débutants", profile: "débutant crypto qui a déjà perdu de l'argent", category: "Crypto", keyword: "crypto débutant erreurs 2026" },
]

const PROMPT_SYSTEM = `Tu es un journaliste financier expert, direct et percutant. Tu écris pour des investisseurs particuliers français.

RÈGLES ABSOLUES :
1. ANGLE UNIQUE : Analyse l'impact pour le profil précis indiqué. Trouve une conséquence que les autres médias n'ont pas soulignée.
2. DONNÉES FROIDES : Inclus un tableau comparatif avec des chiffres réels et 3 liens sortants vers des sources officielles (AMF, banques centrales, médias financiers reconnus).
3. ANTI-MOTIFS IA : INTERDIT d'écrire "En conclusion", "Il est important de noter", "Dans le monde complexe de", "Il convient de souligner", "Dans cet article nous allons". Commence DIRECTEMENT par l'info la plus importante (pyramide inversée). Varie la longueur des phrases.
4. SEO : Utilise le mot-clé principal naturellement dans le titre H1, le premier paragraphe, et 2-3 fois dans le texte.
5. FORMAT : Écris en Markdown. H2 pour les sections. Tableau obligatoire. 800-1200 mots.
6. STYLE : Journalistique, direct, chiffres précis, pas de langue de bois.`

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[éèêë]/g, 'e').replace(/[àâä]/g, 'a').replace(/[ùûü]/g, 'u')
    .replace(/[îï]/g, 'i').replace(/[ôö]/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    .substring(0, 60)
}

function callAnthropic(messages) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'claude-haiku-4-5',
      max_tokens: 2000,
      system: PROMPT_SYSTEM,
      messages,
    })

    const req = https.request({
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body),
      }
    }, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          if (parsed.error) reject(new Error(parsed.error.message))
          else resolve(parsed.content[0].text)
        } catch (e) { reject(e) }
      })
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

async function generateArticle(topic) {
  console.log(`📝 Génération : ${topic.title}`)
  
  const existingArticles = fs.readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
    .slice(0, 5)
    .join(', ')

  const prompt = `Écris un article de blog sur : "${topic.title}"

Profil lecteur cible : ${topic.profile}
Mot-clé SEO principal : ${topic.keyword}
Articles déjà publiés sur ce blog (pour le maillage interne) : ${existingArticles || 'aucun encore'}

À la fin de l'article, si des articles existants sont listés ci-dessus, insère 1-2 liens internes naturels vers eux.
N'ajoute PAS de disclaimer à la fin — il sera ajouté automatiquement par le système.`

  const content = await callAnthropic([{ role: 'user', content: prompt }])
  
  const slug = generateSlug(topic.title)
  const date = new Date().toISOString().split('T')[0]
  const words = content.split(' ').length
  const readTime = Math.ceil(words / 200)

  const excerpt = content.split('\n').find(l => l.length > 80 && !l.startsWith('#')) || ''
  
  const frontmatter = `---
title: "${topic.title}"
excerpt: "${excerpt.substring(0, 150).replace(/"/g, "'")}"
date: "${date}"
category: "${topic.category}"
keyword: "${topic.keyword}"
readTime: ${readTime}
---

${content}`

  const filename = path.join(ARTICLES_DIR, `${slug}.md`)
  fs.writeFileSync(filename, frontmatter)
  console.log(`✅ Article sauvegardé : ${filename}`)
  return slug
}

// Générer 1 article (ou plusieurs si argument --count=N)
const count = parseInt(process.argv.find(a => a.startsWith('--count='))?.split('=')[1] || '1')
const topicsToGenerate = TOPICS.slice(0, count)

;(async () => {
  for (const topic of topicsToGenerate) {
    try {
      await generateArticle(topic)
      await new Promise(r => setTimeout(r, 2000)) // pause entre articles
    } catch (e) {
      console.error(`❌ Erreur : ${e.message}`)
    }
  }
  console.log(`\n🎉 ${count} article(s) généré(s). Lance 'npm run build' pour builder.`)
})()
