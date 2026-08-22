import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cal, { getCalApi } from '@calcom/embed-react'

const CAL_LINK = 'jess-bergs-dnx5up/coffee-chat-with-jess'
const CAL_URL = `https://cal.com/${CAL_LINK}`

const CoffeeChat = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi()
      cal('ui', { theme: 'light', layout: 'month_view' })
      cal('on', { action: 'linkReady', callback: () => setLoading(false) })
    })()
  }, [])

  return (
    <article className="mx-auto max-w-6xl py-14 md:py-20">
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
        Coffee Chat with Jess
      </h1>

      {loading && (
        <p
          className="mt-8 animate-pulse text-[0.9rem] font-medium md:text-[0.98rem]"
          style={{ color: '#3a4050' }}
        >
          Loading the calendar&hellip;
        </p>
      )}

      <div className="mt-8">
        <Cal
          calLink={CAL_LINK}
          style={{ width: '100%' }}
          config={{ layout: 'month_view', theme: 'light' }}
        />
      </div>

      <p
        className="mt-6 text-[0.78rem]"
        style={{ color: 'var(--color-ink-mute)' }}
      >
        Trouble loading the calendar?{' '}
        <a href={CAL_URL} className="font-semibold underline hover:no-underline">
          Book directly on cal.com
        </a>
        .
      </p>
    </article>
  )
}

export default CoffeeChat
