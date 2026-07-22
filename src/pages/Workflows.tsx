import { Link } from 'react-router-dom'

const bodyClass =
  'text-[0.9rem] font-medium leading-relaxed md:text-[0.98rem]'
const bodyStyle = { color: '#3a4050' as const }

const Workflows = () => {
  return (
    <article className="mx-auto max-w-2xl py-14 md:py-20">
      <Link
        to="/"
        className="text-[0.78rem] no-underline hover:underline"
        style={{ color: 'var(--color-ink-mute)' }}
      >
        ← jbergs.eu
      </Link>

      <p
        className="mb-3 mt-8 text-[0.7rem] uppercase tracking-[0.22em]"
        style={{ color: 'var(--color-ink-mute)' }}
      >
        A personal automation project
      </p>
      <h1
        className="m-0 text-[2.4rem] leading-none md:text-[3rem]"
        style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, letterSpacing: '-0.02em' }}
      >
        workflows
      </h1>

      <div className="mt-8 space-y-5">
        <p className={bodyClass} style={bodyStyle}>
          <strong>workflows</strong> is a personal automation assistant that Jess Bergs built
          and runs for herself. It turns her own email and calendar into a set of small daily
          helpers: morning briefings, reminders, digests of things she cares about, and a
          conversational assistant she chats with over Telegram. It is a single-user hobby
          project, not a public product — the only person who signs in and whose data it
          touches is its operator.
        </p>

        <h2 className="section-h2 !mb-1 mt-10">What it connects to, and why</h2>
        <p className={bodyClass} style={bodyStyle}>
          workflows uses Google APIs strictly to provide these automations to the same person
          who authorises them. Specifically:
        </p>
        <ul className={`${bodyClass} list-disc space-y-2 pl-5`} style={bodyStyle}>
          <li>
            <strong>Google Calendar</strong> — reads events to assemble daily briefings and
            scheduling reminders, and creates or updates events for automations she sets up
            (for example, syncing booked gym classes onto a calendar).
          </li>
          <li>
            <strong>Gmail</strong> — reads messages to summarise and triage them, and sends
            her own digest and notification emails on her behalf.
          </li>
          <li>
            <strong>Google Docs &amp; Sheets (read-only)</strong> — reads documents she points
            it at so their contents can feed into a briefing or summary.
          </li>
        </ul>

        <h2 className="section-h2 !mb-1 mt-10">Who uses it</h2>
        <p className={bodyClass} style={bodyStyle}>
          Just Jess. There are no other users and no sign-up. Data pulled from Google is used
          only to generate her own briefings and messages — it is never sold, shared, or used
          for advertising or to train models.
        </p>

        <p className={`${bodyClass} mt-10`} style={bodyStyle}>
          See the{' '}
          <Link to="/privacy" className="font-semibold underline hover:no-underline">
            privacy policy
          </Link>{' '}
          and{' '}
          <Link to="/terms" className="font-semibold underline hover:no-underline">
            terms of service
          </Link>
          . Questions:{' '}
          <a href="mailto:info@jbergs.eu" className="font-semibold underline hover:no-underline">
            info@jbergs.eu
          </a>
          .
        </p>
      </div>
    </article>
  )
}

export default Workflows
