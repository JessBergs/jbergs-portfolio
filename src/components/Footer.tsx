const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer
      id="contact"
      className="mt-16 px-6 py-8 text-center text-[0.78rem] md:px-8"
      style={{ color: 'var(--color-ink-mute)' }}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 md:justify-between">
        <p className="m-0">© {year} Jessica Bergs</p>
        <p className="m-0 flex flex-wrap items-center gap-4">
          <a
            href="mailto:contact@jbergs.eu"
            className="no-underline hover:underline"
            style={{ color: 'var(--color-ink-mute)' }}
          >
            Contact
          </a>
          <a
            href="https://www.linkedin.com/in/jbergs/"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline hover:underline"
            style={{ color: 'var(--color-ink-mute)' }}
          >
            LinkedIn
          </a>
          <a
            href="https://scholar.google.com/citations?user=jUpxHmsAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline hover:underline"
            style={{ color: 'var(--color-ink-mute)' }}
          >
            Google Scholar
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
