import { Link } from 'react-router-dom'

const bodyClass = 'text-[0.9rem] font-medium leading-relaxed md:text-[0.98rem]'
const bodyStyle = { color: '#3a4050' as const }

const Terms = () => {
  return (
    <article className="mx-auto max-w-2xl py-14 md:py-20">
      <Link
        to="/workflows"
        className="text-[0.78rem] no-underline hover:underline"
        style={{ color: 'var(--color-ink-mute)' }}
      >
        ← workflows
      </Link>

      <p
        className="mb-3 mt-8 text-[0.7rem] uppercase tracking-[0.22em]"
        style={{ color: 'var(--color-ink-mute)' }}
      >
        workflows
      </p>
      <h1
        className="m-0 text-[2rem] leading-tight md:text-[2.5rem]"
        style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, letterSpacing: '-0.02em' }}
      >
        Terms of service
      </h1>
      <p className="mt-3 text-[0.78rem]" style={{ color: 'var(--color-ink-mute)' }}>
        Last updated 22 July 2026
      </p>

      <div className="mt-8 space-y-5">
        <p className={bodyClass} style={bodyStyle}>
          workflows is a personal, non-commercial project operated by Jessica Bergs for her own
          use. It is offered as-is, with no warranty of any kind, and it may change or be
          switched off at any time without notice.
        </p>
        <p className={bodyClass} style={bodyStyle}>
          There is no sign-up and there are no other users: the only person who authorises the
          app and whose accounts it acts on is its operator. Access is governed by the{' '}
          <Link to="/privacy" className="font-semibold underline hover:no-underline">
            privacy policy
          </Link>
          .
        </p>
        <p className={bodyClass} style={bodyStyle}>
          To the extent permitted by law, the operator accepts no liability for any loss arising
          from the use of this project. Questions:{' '}
          <a href="mailto:info@jbergs.eu" className="font-semibold underline hover:no-underline">
            info@jbergs.eu
          </a>
          .
        </p>
      </div>
    </article>
  )
}

export default Terms
