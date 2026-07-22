import { Link } from 'react-router-dom'

const bodyClass = 'text-[0.9rem] font-medium leading-relaxed md:text-[0.98rem]'
const bodyStyle = { color: '#3a4050' as const }

const Privacy = () => {
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
        Privacy policy
      </h1>
      <p className="mt-3 text-[0.78rem]" style={{ color: 'var(--color-ink-mute)' }}>
        Last updated 22 July 2026
      </p>

      <div className="mt-8 space-y-5">
        <p className={bodyClass} style={bodyStyle}>
          workflows is a personal, single-user automation project run by Jessica Bergs
          (&ldquo;the operator&rdquo;). This policy explains what data it accesses through Google
          APIs and how that data is handled. The only person who authorises workflows and whose
          data it processes is the operator herself; there are no other users.
        </p>

        <h2 className="section-h2 !mb-1 mt-10">What it accesses</h2>
        <p className={bodyClass} style={bodyStyle}>
          With the operator&rsquo;s consent, workflows accesses her Google Calendar (read and
          write), her Gmail (read, and send on her behalf), and Google Docs and Sheets she
          points it at (read-only). It reads this data to build briefings, reminders, and
          digests, and to send her own notification emails.
        </p>

        <h2 className="section-h2 !mb-1 mt-10">How it&rsquo;s used</h2>
        <p className={bodyClass} style={bodyStyle}>
          Data from Google is used only to provide these automations back to the same person who
          authorised access. It is never sold, rented, or shared with third parties, and it is
          never used for advertising or to train machine-learning models.
        </p>
        <p className={bodyClass} style={bodyStyle}>
          workflows&rsquo; use and transfer of information received from Google APIs adheres to
          the{' '}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:no-underline"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>

        <h2 className="section-h2 !mb-1 mt-10">Storage and retention</h2>
        <p className={bodyClass} style={bodyStyle}>
          workflows processes Google data transiently to produce each briefing or message and
          does not build a lasting copy of the operator&rsquo;s mailbox or calendar. The OAuth
          tokens that authorise access are held in an encrypted secrets store and are used only
          to call Google on the operator&rsquo;s behalf.
        </p>

        <h2 className="section-h2 !mb-1 mt-10">Revoking access</h2>
        <p className={bodyClass} style={bodyStyle}>
          The operator can withdraw workflows&rsquo; access at any time from{' '}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:no-underline"
          >
            Google Account permissions
          </a>
          , which immediately stops all further access.
        </p>

        <h2 className="section-h2 !mb-1 mt-10">Contact</h2>
        <p className={bodyClass} style={bodyStyle}>
          Questions about this policy:{' '}
          <a href="mailto:info@jbergs.eu" className="font-semibold underline hover:no-underline">
            info@jbergs.eu
          </a>
          . If this policy changes, the date above will be updated.
        </p>
      </div>
    </article>
  )
}

export default Privacy
