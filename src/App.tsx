import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Podcast from './pages/Podcast'
import Learning from './pages/Learning'
import About from './pages/About'
import CookieConsent from './components/CookieConsent'
import { initializeGAWithConsent, grantAnalyticsConsent } from './utils/analytics'

function App() {
  const logoUrl = `${import.meta.env.BASE_URL}text_stacked.png`
  const [active, setActive] = useState('home')

  useEffect(() => {
    // Initialize Google Analytics with consent management
    initializeGAWithConsent()
    
    // Check for existing consent and apply it
    const consent = localStorage.getItem('cookie-consent')
    if (consent) {
      const consentData = JSON.parse(consent)
      if (consentData.analytics) {
        grantAnalyticsConsent()
      }
    }

    const sections = Array.from(document.querySelectorAll('main section')) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id') || 'home'
            setActive(id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    sections.forEach((s) => observer.observe(s))

    // Header scroll effect
    const header = document.querySelector('.header') as HTMLElement
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header?.classList.add('scrolled')
      } else {
        header?.classList.remove('scrolled')
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <img src={logoUrl} alt="My Data Guest" className="logo-img" />
        </div>
        <nav className="nav">
          <a href="#home" className={active === 'home' ? 'active' : undefined}>Home</a>
          <a href="#podcast" className={active === 'podcast' ? 'active' : undefined}>Podcast</a>
          <a href="#learning" className={active === 'learning' ? 'active' : undefined}>Learning</a>
          <a href="#about" className={active === 'about' ? 'active' : undefined}>About</a>
        </nav>
      </header>

      <main className="content">
        <section id="home"><Home /></section>
        <section id="podcast" className="band band-b"><Podcast /></section>
        <section id="learning" className="band band-c"><Learning /></section>
        <section id="about" className="band"><About /></section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} My Data Guest</span>
      </footer>
      
      <CookieConsent />
    </div>
  )
}

export default App
