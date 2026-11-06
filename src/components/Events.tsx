import eventsData from '../data/events.json'
import { Event, EventsArraySchema } from '../types/Event'
import { formatWhen, splitEvents } from '../lib/events'

const validateEvents = (data: unknown): Event[] => {
  try {
    return EventsArraySchema.parse(data)
  } catch (error) {
    console.error('❌ Events data validation failed:', error)
    throw new Error('Invalid events data. Check console for details.')
  }
}

const imageSrc = (image: string) => `${import.meta.env.BASE_URL}${image.replace(/^\//, '')}`

const EventRow = ({ event, upcoming }: { event: Event; upcoming: boolean }) => {
  const meta = [event.org, event.place, event.note].filter(Boolean).join(', ')
  const title = event.link ? (
    <a className="event-row__title" href={event.link} target="_blank" rel="noopener noreferrer">
      {event.title}
    </a>
  ) : (
    <span className="event-row__title">{event.title}</span>
  )
  return (
    <li className={`event-row${event.image ? ' event-row--media' : ''}`}>
      <span className="event-row__date">{formatWhen(event, upcoming)}</span>
      {event.image && (
        <span className="event-row__media">
          <img src={imageSrc(event.image)} alt="" loading="lazy" />
        </span>
      )}
      <span className="event-row__text">
        {title}
        <span className="event-row__meta">
          <b>{event.role}</b>
          {meta ? `, ${meta}` : ''}
        </span>
      </span>
    </li>
  )
}

const events = validateEvents(eventsData)

export const UpcomingEvents = () => {
  const { upcoming } = splitEvents(events)
  if (upcoming.length === 0) return null
  return (
    <section id="upcoming" className="relative z-10">
      <h2 className="section-h2 mb-5">Upcoming</h2>
      <ul className="event-list">
        {upcoming.map((e) => (
          <EventRow key={e.id} event={e} upcoming />
        ))}
      </ul>
    </section>
  )
}

export const PastEvents = () => {
  const { past } = splitEvents(events)
  return (
    <section id="past-events" className="relative z-10">
      <h2 className="section-h2 mb-5">Past talks, conferences &amp; events</h2>
      <ul className="event-list">
        {past.map((e) => (
          <EventRow key={e.id} event={e} upcoming={false} />
        ))}
      </ul>
    </section>
  )
}
