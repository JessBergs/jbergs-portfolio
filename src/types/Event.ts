import { z } from 'zod'

// A talk, panel, workshop or event. Whether it shows under "Upcoming" or
// "Past" is decided at render time from `date` (and `endDate` for a series),
// so an entry moves down on the day without an edit.
export const EventSchema = z.object({
  id: z.string().min(1, 'Event ID is required'),
  title: z.string().min(1, 'Event title is required'),
  role: z.string().min(1, 'Event role is required'),
  org: z.string().optional(),
  place: z.string().optional(),
  note: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'endDate must be YYYY-MM-DD').optional(),
  when: z.string().optional(),
  link: z.string().optional(),
  image: z.string().optional(),
})

export const EventsArraySchema = z.array(EventSchema)

export type Event = z.infer<typeof EventSchema>
