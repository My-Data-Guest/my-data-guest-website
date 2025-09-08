import './pages.css'

const Icon = {
  Spotify: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#1DB954" />
      <path d="M7.5 10.2c3.2-1.1 6.8-.9 9.5.6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M7.7 13.1c2.6-.8 5.5-.6 7.7.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M7.9 15.7c2-.6 4.1-.5 5.8.3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Apple: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#A855F7" />
      <path d="M15.8 9.8c-.4-.3-1.5-.8-2.8-.8-1.5 0-2.7.6-3.5.6-.7 0-1.8-.6-3-.6-1.5 0-2.9.9-3.6 2.2-1.6 2.8-.4 6.9 1.1 9.2.7 1.1 1.6 2.4 2.7 2.4 1 0 1.4-.7 2.6-.7s1.5.7 2.6.7c1.1 0 1.9-1.2 2.6-2.3.5-.8.9-1.6 1.2-2.5-2.6-1-3.1-4.7-.9-6.2z" fill="#fff"/>
      <path d="M13.2 7.5c.6-.7.9-1.7.8-2.7-.8 0-1.7.5-2.3 1.1-.5.6-.9 1.6-.8 2.5.9.1 1.7-.4 2.3-0.9z" fill="#fff"/>
    </svg>
  ),
  YouTube: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="3" fill="#FF0033"/>
      <path d="M10 9v6l5-3-5-3z" fill="#fff"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#0A66C2"/>
      <path d="M8.5 9.5h2v7h-2v-7zm1-1.5c.69 0 1.25-.56 1.25-1.25S9.69 5.75 9 5.75 7.75 6.31 7.75 7 8.31 8.25 9 8.25z" fill="#fff"/>
      <path d="M12.5 9.5h1.97v.95h.03c.27-.51.94-1.05 1.94-1.05 2.08 0 2.46 1.37 2.46 3.15v3.6h-2.05v-3.19c0-.76-.01-1.74-1.06-1.74-1.06 0-1.22.83-1.22 1.69v3.24h-2.05v-7z" fill="#fff"/>
    </svg>
  ),
  Substack: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#FF6719"/>
      <path d="M7 8h10v1H7V8zm0 3h10v1H7v-1zm0 3h10l-5 3-5-3z" fill="#fff"/>
    </svg>
  ),
}

function Home() {
  return (
    <section className="hero">
      <div className="hero-content" style={{ textAlign: 'center' }}>
        <img 
          src={`${import.meta.env.BASE_URL}logo.png`} 
          alt="My Data Guest" 
          className="hero-logo" 
          style={{ 
            width: 280, 
            height: 280, 
            objectFit: 'contain'
          }} 
        />
        <div className="hero-tagline">
          <span className="tagline-primary">AI Without the Hype.</span>
          <span className="tagline-secondary">Podcast, Learnings and Stories.</span>
        </div>
        <div className="hero-platforms">
          <a 
            href="https://mydataguest.substack.com/" 
            aria-label="Subscribe on Substack" 
            title="Substack"
            className="platform-link"
          >
            <Icon.Substack />
          </a>
          <a 
            href="https://www.linkedin.com/company/my-data-guest" 
            aria-label="Follow on LinkedIn" 
            title="LinkedIn"
            className="platform-link"
          >
            <Icon.LinkedIn />
          </a>
          <a 
            href="https://podcasters.spotify.com/pod/show/pigna19908" 
            aria-label="Listen on Spotify" 
            title="Spotify"
            className="platform-link"
          >
            <Icon.Spotify />
          </a>
          <a 
            href="https://www.youtube.com/@MyDataGuest" 
            aria-label="Watch on YouTube" 
            title="YouTube"
            className="platform-link"
          >
            <Icon.YouTube />
          </a>
          <a 
            href="https://podcasts.apple.com/us/podcast/my-data-guest/id1837487759" 
            aria-label="Listen on Apple Podcasts" 
            title="Apple Podcasts"
            className="platform-link"
          >
            <Icon.Apple />
          </a>
        </div>
        <div className="cta-row" style={{ justifyContent: 'center' }}>
          <a className="btn primary" href="#podcast">Podcast</a>
          <a className="btn" href="#learning">Learning</a>
        </div>
      </div>
      <a href="#podcast" aria-label="Scroll to content" style={{ marginTop: 32, color: 'var(--text-light)', textDecoration: 'none' }}>↓ Scroll</a>
    </section>
  )
}

export default Home


