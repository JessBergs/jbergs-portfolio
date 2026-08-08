import { useEffect, useRef, useState } from 'react'

type NavItem = { label: string; href: string }

const NAV: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget
    const nav = navRef.current
    const indicator = indicatorRef.current
    if (!nav || !indicator) return
    const linkRect = link.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()
    indicator.style.transform = `translateX(${linkRect.left - navRect.left}px)`
    indicator.style.width = `${linkRect.width}px`
    indicator.style.opacity = '1'
  }
  const onNavLeave = () => {
    const indicator = indicatorRef.current
    if (indicator) indicator.style.opacity = '0'
  }

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-end gap-4 px-6 md:px-8">
        <nav
          ref={navRef}
          aria-label="Primary"
          className="relative flex flex-wrap gap-6 pb-1.5"
          onMouseLeave={onNavLeave}
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onMouseEnter={onLinkEnter}
              style={{ color: 'var(--color-ink-mute)' }}
              className="relative pb-1 text-[0.85rem] no-underline transition-colors hover:!text-(--color-ink)"
            >
              {item.label}
            </a>
          ))}
          <span ref={indicatorRef} aria-hidden="true" className="nav-indicator" />
        </nav>
      </div>
    </header>
  )
}

export default Header
