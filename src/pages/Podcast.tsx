import { useEffect, useState } from 'react'
import './pages.css'
import { fetchEpisodes } from '../utils/rss'

type Episode = {
  number: number
  title: string
  summary: string
  links: { spotify?: string; apple?: string; youtube?: string }
  pubDate: string
  image?: string
}

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
}

function Podcast() {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        const fetchedEpisodes = await fetchEpisodes()
        setEpisodes(fetchedEpisodes)
      } catch (error) {
        console.error('Error loading episodes:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEpisodes()
  }, [])

  if (loading) {
    return (
      <section className="prose">
        <h1 className="section-title">Podcast</h1>
        <p>Stories and lessons from people building with data — practical conversations about real challenges and solutions.</p>
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          Loading episodes...
        </div>
      </section>
    )
  }

  return (
    <section className="prose">
      <h1 className="section-title">Podcast</h1>
      <p>Stories and lessons from people building with data — practical conversations about real challenges and solutions.</p>
      <ul className="episode-list">
        {episodes.map((e) => (
          <li key={e.number} className="episode-card">
            <div className="episode-image">
              {e.image ? (
                <img src={e.image} alt={`Episode ${e.number} cover`} />
              ) : (
                <div className="episode-badge">#{e.number}</div>
              )}
            </div>
            <div className="episode-content">
              <div className="episode-header">
                <span className="episode-number">Episode {e.number}</span>
                <h3 className="episode-title">{e.title}</h3>
              </div>
              <p className="episode-summary">
                {e.summary}
                {e.links.spotify && (
                  <><a href={e.links.spotify} className="episode-more">...more</a></>
                )}
              </p>
            </div>
            <div className="episode-platforms">
              <a 
                href={e.links.spotify || '#'} 
                aria-label="Listen on Spotify" 
                title="Spotify"
                className={`platform-link ${e.links.spotify ? 'active' : 'inactive'}`}
              >
                <Icon.Spotify />
              </a>
              <a 
                href={e.links.apple || 'https://podcasts.apple.com/us/podcast/my-data-guest/id1837487759'} 
                aria-label="Listen on Apple Podcasts" 
                title="Apple Podcasts"
                className="platform-link"
              >
                <Icon.Apple />
              </a>
              <a 
                href={e.links.youtube || 'https://www.youtube.com/@MyDataGuest'} 
                aria-label="Watch on YouTube" 
                title="YouTube"
                className="platform-link"
              >
                <Icon.YouTube />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Podcast


