#!/usr/bin/env tsx
/**
 * Validates projects.json and events.json against their Zod schemas
 * Exits with code 1 if validation fails
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import { ProjectsArraySchema } from '../src/types/Project.js'
import { EventsArraySchema } from '../src/types/Event.js'

const projectsPath = join(process.cwd(), 'src/data/projects.json')

try {
  console.log('🔍 Validating projects.json against Zod schema...')

  const rawData = readFileSync(projectsPath, 'utf-8')
  const projectsData = JSON.parse(rawData)

  const result = ProjectsArraySchema.safeParse(projectsData)

  if (!result.success) {
    console.error('❌ Validation failed!')
    console.error('\nErrors:')
    result.error.errors.forEach((err) => {
      console.error(`  - ${err.path.join('.')}: ${err.message}`)
    })
    process.exit(1)
  }

  console.log(`✅ Validation passed! ${result.data.length} projects validated.`)

  const eventsRaw = readFileSync(join(process.cwd(), 'src/data/events.json'), 'utf-8')
  const events = EventsArraySchema.safeParse(JSON.parse(eventsRaw))
  if (!events.success) {
    console.error('❌ events.json validation failed!')
    events.error.errors.forEach((err) => console.error(`  - ${err.path.join('.')}: ${err.message}`))
    process.exit(1)
  }
  console.log(`✅ ${events.data.length} events validated.`)
  process.exit(0)
} catch (error) {
  console.error('❌ Error reading or parsing projects.json:', error)
  process.exit(1)
}
