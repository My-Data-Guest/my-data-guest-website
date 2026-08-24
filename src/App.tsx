// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Podcast from './pages/Podcast'
import Learning from './pages/Learning'
import About from './pages/About'
import CookieConsent from './components/CookieConsent'
import SEO from './components/SEO'
import JsonLd from './components/JsonLd'
import {
  SpotifyIcon,
  ApplePodcastsIcon,
  YouTubeIcon,
  LinkedInIcon,
  SubstackIcon,
} from './components/Icons'
import { generateSiteStructuredData, PLATFORMS } from './utils/structuredData'
import { openCookiePreferences, readConsent } from './utils/cookiePreferences'
import { initializeGAWithConsent, grantAnalyticsConsent } from './utils/analytics'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'podcast', label: 'Podcast' },
  { id: 'learning', label: 'Learning' },
  { id: 'about', label: 'About' },
] as const

const FOOTER_LINKS = [
  { href: PLATFORMS.substack, label: 'Substack', Icon: SubstackIcon },
  { href: PLATFORMS.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: PLATFORMS.spotify, label: 'Spotify', Icon: SpotifyIcon },
  { href: PLATFORMS.youtube, label: 'YouTube', Icon: YouTubeIcon },
  { href: PLATFORMS.apple, label: 'Apple Podcasts', Icon: ApplePodcastsIcon },
]

function App() {
  const [active, setActive] = useState<string>('home')
  const [scrolled, setScrolled] = useState(false)
  const siteStructuredData = useMemo(() => generateSiteStructuredData(), [])

  useEffect(() => {
    initializeGAWithConsent()

    if (readConsent()?.analytics) grantAnalyticsConsent()
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('main > section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    sections.forEach((section) => observer.observe(section))

    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="app">
      <SEO
        title="My Data Guest — AI Without the Hype"
        description="AI without the hype. A podcast and newsletter by Alessandro Romano and Rosaria Silipo — real stories, honest conversations, and practical advice from people building with data and AI."
      />
      <JsonLd id="site" data={siteStructuredData} />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <a className="brand" href="#home" aria-label="My Data Guest — home">
          <img src={`${import.meta.env.BASE_URL}mark.png`} alt="" className="brand-mark" width={40} height={40} />
          <span className="brand-name">
            My Data <span>Guest</span>
          </span>
        </a>
        <nav className="nav" aria-label="Sections">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'active' : undefined}
              aria-current={active === id ? 'true' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main className="content" id="main">
        <section id="home" className="hero" aria-labelledby="hero-title">
          <Home />
        </section>
        <section id="podcast" className="band band-b" aria-labelledby="podcast-title">
          <Podcast />
        </section>
        <section id="learning" className="band band-c" aria-labelledby="learning-title">
          <Learning />
        </section>
        <section id="about" className="band" aria-labelledby="about-title">
          <About />
        </section>
      </main>

      <footer className="footer">
        <ul className="footer-links">
          {FOOTER_LINKS.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                aria-label={label}
                className="platform-link"
              >
                <Icon size={28} />
              </a>
            </li>
          ))}
        </ul>
        <p className="footer-meta">
          <span>© {new Date().getFullYear()} My Data Guest</span>
          <span aria-hidden="true">·</span>
          <button type="button" className="link-button" onClick={openCookiePreferences}>
            Cookie preferences
          </button>
        </p>
      </footer>

      <CookieConsent />
    </div>
  )
}

export default App
