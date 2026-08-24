// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { useEffect, useMemo, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CourseDetail from './pages/CourseDetail'
import NotFound from './pages/NotFound'
import CookieConsent from './components/CookieConsent'
import Header from './components/Header'
import ScrollToHash from './components/ScrollToHash'
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
import { initializeGAWithConsent, grantAnalyticsConsent, trackPageView } from './utils/analytics'

const FOOTER_LINKS = [
  { href: PLATFORMS.substack, label: 'Substack', Icon: SubstackIcon },
  { href: PLATFORMS.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: PLATFORMS.spotify, label: 'Spotify', Icon: SpotifyIcon },
  { href: PLATFORMS.youtube, label: 'YouTube', Icon: YouTubeIcon },
  { href: PLATFORMS.apple, label: 'Apple Podcasts', Icon: ApplePodcastsIcon },
]

function App() {
  const { pathname } = useLocation()
  const siteStructuredData = useMemo(() => generateSiteStructuredData(), [])
  // The gtag bootstrap already reports the first view.
  const isFirstView = useRef(true)

  useEffect(() => {
    initializeGAWithConsent()

    if (readConsent()?.analytics) grantAnalyticsConsent()
  }, [])

  useEffect(() => {
    if (isFirstView.current) {
      isFirstView.current = false
      return
    }
    trackPageView(pathname)
  }, [pathname])

  return (
    <div className="app">
      <JsonLd id="site" data={siteStructuredData} />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main className="content" id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <ScrollToHash />

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
