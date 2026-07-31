import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Workflows from './pages/Workflows'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import TaispTips from './pages/TaispTips'
import TaisReadingRecs from './pages/TaisReadingRecs'

// Routes to emit as static HTML so bots (e.g. Google's OAuth branding review)
// and direct loads get real content, not an empty SPA shell.
const PRERENDER_LINKS = new Set(['/', '/workflows', '/privacy', '/terms', '/taisp-tips', '/tais-reading-recs'])

const TITLES: Record<string, string> = {
  '/': 'Jess Bergs | Portfolio',
  '/workflows': 'workflows — a personal automation project | Jess Bergs',
  '/privacy': 'Privacy policy — workflows | Jess Bergs',
  '/terms': 'Terms of service — workflows | Jess Bergs',
  '/taisp-tips': 'Jess’ TAISP Tips | Jess Bergs',
  '/tais-reading-recs': 'Jess’ Reading Recommendations | Jess Bergs',
}

// Routes that redirect to an external doc: the page component redirects via
// JS, and a meta-refresh in the prerendered head covers no-JS visitors.
const REDIRECTS: Record<string, string> = {
  '/taisp-tips':
    'https://docs.google.com/document/d/1VIXrgibCpWo_oR76f89rDLGLjA3XT_FwZ8sAXGYXyoY/edit',
  '/tais-reading-recs':
    'https://docs.google.com/document/d/16mgteN0F91wML5sPbwCWzgaNhK3IQLUn3G2h-fthH7I/edit',
}

export async function prerender(data: { url?: string } = {}) {
  const url = data.url || '/'
  const html = renderToString(
    <StaticRouter location={url}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/taisp-tips" element={<TaispTips />} />
          <Route path="/tais-reading-recs" element={<TaisReadingRecs />} />
        </Route>
      </Routes>
    </StaticRouter>
  )

  return {
    html,
    links: PRERENDER_LINKS,
    head: {
      lang: 'en',
      title: TITLES[url] ?? TITLES['/'],
      elements: REDIRECTS[url]
        ? new Set([
            {
              type: 'meta',
              props: { 'http-equiv': 'refresh', content: `0;url=${REDIRECTS[url]}` },
            },
          ])
        : undefined,
    },
  }
}
