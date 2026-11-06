import { Mail, GraduationCap, Linkedin, Coffee } from 'lucide-react'

const Hero = () => {
  return (
    <section className="home__side" aria-labelledby="hero-title">
      <div className="hero-id">
        <img
          className="hero-photo"
          src={`${import.meta.env.BASE_URL}images/profile.png`}
          alt="Jess Bergs"
          width={462}
          height={456}
        />
        <h1 id="hero-title" className="hero-h1" style={{ marginBottom: 0 }}>
          Jess Bergs
        </h1>

        <p
          className="hero-role text-[1.12rem] leading-[1.5]"
          style={{ color: 'var(--color-ink-soft)', fontFamily: 'var(--font-sans)' }}
        >
          R&amp;D Engineering Lead
          <br />
          Human-AI Interaction @ UK AISI, Research Unit
        </p>

        <ul
          className="hero-links mt-2 flex list-none flex-col gap-3 p-0"
          style={{ color: 'var(--color-ink-mute)' }}
        >
          <li className="flex items-center gap-2 leading-none">
            <Mail size={18} aria-hidden="true" />
            <a
              href="mailto:hello@jbergs.eu"
              className="text-sm no-underline hover:underline"
              style={{ color: 'var(--color-ink)' }}
            >
              hello@jbergs.eu
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
          <li className="flex items-center gap-2 leading-none">
            <Coffee size={18} aria-hidden="true" />
            <a
              href="/coffee-chat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm no-underline hover:underline"
              style={{ color: 'var(--color-ink)' }}
            >
              Let&rsquo;s have a coffee chat!
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Hero
