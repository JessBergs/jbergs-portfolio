import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Workflows from './pages/Workflows'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

// Routes to emit as static HTML so bots (e.g. Google's OAuth branding review)
// and direct loads get real content, not an empty SPA shell.
const PRERENDER_LINKS = new Set(['/', '/workflows', '/privacy', '/terms'])

const TITLES: Record<string, string> = {
  '/': 'Jess Bergs | Portfolio',
  '/workflows': 'workflows — a personal automation project | Jess Bergs',
  '/privacy': 'Privacy policy — workflows | Jess Bergs',
  '/terms': 'Terms of service — workflows | Jess Bergs',
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
        </Route>
      </Routes>
    </StaticRouter>
  )

  return {
    html,
    links: PRERENDER_LINKS,
    head: { lang: 'en', title: TITLES[url] ?? TITLES['/'] },
  }
}
