import { Mail, GraduationCap, Linkedin } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative isolate flex min-h-full items-center" aria-labelledby="hero-title">
      <div className="hero-blob" aria-hidden="true" />
      <div className="relative z-10 flex w-full flex-col items-start gap-3">
        <h1 id="hero-title" className="hero-h1" style={{ marginBottom: 0 }}>
          Jess Bergs
        </h1>

        <p
          className="text-[1.12rem] leading-[1.5]"
          style={{ color: 'var(--color-ink-soft)', fontFamily: 'var(--font-sans)' }}
        >
          Human-AI Interaction @ UK AISI – Research Unit
          <br />
          R&amp;D Software Engineer
        </p>

        <ul
          className="mt-2 flex list-none flex-col gap-3 p-0"
          style={{ color: 'var(--color-ink-mute)' }}
        >
          <li className="flex items-center gap-2 leading-none">
            <Mail size={18} aria-hidden="true" />
            <a
              href="mailto:contact@jbergs.eu"
              className="text-sm no-underline hover:underline"
              style={{ color: 'var(--color-ink)' }}
            >
              contact@jbergs.eu
            </a>
          </li>
          <li className="flex items-center gap-2 leading-none">
            <Linkedin size={18} aria-hidden="true" />
            <a
              href="https://www.linkedin.com/in/jbergs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm no-underline hover:underline"
              style={{ color: 'var(--color-ink)' }}
            >
              LinkedIn
            </a>
          </li>
          <li className="flex items-center gap-2 leading-none">
            <GraduationCap size={18} aria-hidden="true" />
            <a
              href="https://scholar.google.com/citations?user=jUpxHmsAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm no-underline hover:underline"
              style={{ color: 'var(--color-ink)' }}
            >
              Google Scholar
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Hero
