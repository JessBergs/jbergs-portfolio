import type { Event } from '../types/Event'

const utc = (iso: string) => new Date(`${iso}T00:00:00Z`)

/** Today as YYYY-MM-DD in UTC, so the server render and the browser agree. */
export const todayIso = (now: Date = new Date()) => now.toISOString().slice(0, 10)

/** An event is upcoming until the day it starts; from then on it is listed as past. */
export const isUpcoming = (e: Event, today: string = todayIso()) => e.date > today

export const splitEvents = (events: Event[], today: string = todayIso()) => {
  const upcoming = events.filter((e) => isUpcoming(e, today)).sort((a, b) => a.date.localeCompare(b.date))
  const past = events.filter((e) => !isUpcoming(e, today)).sort((a, b) => b.date.localeCompare(a.date))
  return { upcoming, past }
}

// Three-letter months by hand: Intl's en-GB short month is "Sept", and the lists use "Sep".
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "12 Nov" for what is next, "Oct 2026" for what has happened, unless the entry says otherwise. */
export const formatWhen = (e: Event, upcoming: boolean) => {
  if (e.when) return e.when
  const d = utc(e.date)
  const month = MONTHS[d.getUTCMonth()]
  return upcoming ? `${d.getUTCDate()} ${month}` : `${month} ${d.getUTCFullYear()}`
}
