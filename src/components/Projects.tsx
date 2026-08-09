import { useState } from 'react'
import { Project, ProjectsArraySchema } from '../types/Project'
import projectsData from '../data/projects.json'

const validateProjects = (data: unknown): Project[] => {
  try {
    return ProjectsArraySchema.parse(data)
  } catch (error) {
    console.error('❌ Projects data validation failed:', error)
    throw new Error('Invalid projects data. Check console for details.')
  }
}

const ProjectCard = ({ project }: { project: Project }) => {
  const imageSrc = project.image
    ? `${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`
    : undefined

  const inner = (
    <>
      {imageSrc && (
        <div className="project-card__media">
          <img src={imageSrc} alt={project.title} loading="lazy" />
        </div>
      )}
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>
        {project.categories && project.categories.length > 0 && (
          <div className="project-card__tags">
            {project.categories.map((c, i) => (
              <span key={i} className="project-card__tag">{c}</span>
            ))}
          </div>
        )}
      </div>
    </>
  )

  if (project.link) {
    return (
      <a className="project-card" href={project.link} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }
  return <div className="project-card">{inner}</div>
}

const Projects = () => {
  const projects = validateProjects(projectsData)

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  const allCategories = Array.from(
    new Set(projects.flatMap((p) => p.categories || []))
  ).sort()

  const filtered = projects.filter((p) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      p.categories?.some((c) => selectedCategories.includes(c))
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const isAllActive = selectedCategories.length === 0

  return (
    <section id="work" className="relative z-10 py-12">
      <h2 className="section-h2 mb-8">Selected Work</h2>

      <div className="mb-8 flex flex-col items-start gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategories([])}
            className={`filter-pill${isAllActive ? ' filter-pill--on' : ''}`}
          >
            All
          </button>
          {allCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => toggleCategory(c)}
              className={`filter-pill${selectedCategories.includes(c) ? ' filter-pill--on' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search projects"
          className="search-input"
        />
      </div>

      <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <li key={p.id} className="m-0 p-0">
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Projects
