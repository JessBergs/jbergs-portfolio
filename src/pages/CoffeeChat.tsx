import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cal, { getCalApi } from '@calcom/embed-react'

const CAL_LINK = 'jess-bergs-dnx5up/coffee-chat-with-jess'
const CAL_URL = `https://cal.com/${CAL_LINK}`

const CoffeeChat = () => {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi()
      cal('ui', { theme: 'light', layout: 'month_view' })
    })()
  }, [])

  return (
    <article className="mx-auto max-w-5xl py-14 md:py-20">
      <Link
        to="/"
        className="text-[0.78rem] no-underline hover:underline"
        style={{ color: 'var(--color-ink-mute)' }}
      >
        ← jbergs.eu
      </Link>

      <div className="mt-8">
        <Cal
          calLink={CAL_LINK}
          style={{ width: '100%', overflow: 'scroll' }}
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
