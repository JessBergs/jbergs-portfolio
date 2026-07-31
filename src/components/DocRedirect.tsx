import { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface DocRedirectProps {
  title: string
  docUrl: string
}

// Client-side half of the redirect; the prerendered HTML also carries a
// meta-refresh fallback for no-JS visitors (see prerender.tsx).
const DocRedirect = ({ title, docUrl }: DocRedirectProps) => {
  useEffect(() => {
    window.location.replace(docUrl)
  }, [docUrl])

  return (
    <article className="mx-auto max-w-2xl py-14 md:py-20">
      <Link
        to="/"
        className="text-[0.78rem] no-underline hover:underline"
        style={{ color: 'var(--color-ink-mute)' }}
      >
        ← jbergs.eu
      </Link>

      <h1
        className="m-0 mt-8 text-[2.4rem] leading-none md:text-[3rem]"
        style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, letterSpacing: '-0.02em' }}
      >
        {title}
      </h1>

      <p
        className="mt-8 text-[0.9rem] font-medium leading-relaxed md:text-[0.98rem]"
        style={{ color: '#3a4050' }}
      >
        Taking you to the Google Doc&hellip; If nothing happens,{' '}
        <a href={docUrl} className="font-semibold underline hover:no-underline">
          open it here
        </a>
        .
      </p>
    </article>
  )
}

export default DocRedirect
