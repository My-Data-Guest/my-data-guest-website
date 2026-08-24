// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { useEffect, useState } from 'react'
import './pages.css'
import { fetchEpisodes, type Episode } from '../utils/rss'
import { formatDate } from '../utils/text'
import JsonLd from '../components/JsonLd'
import { SpotifyIcon, ApplePodcastsIcon, YouTubeIcon } from '../components/Icons'
import { generateEpisodeListStructuredData, PLATFORMS } from '../utils/structuredData'

/** The section is a teaser — the full back catalogue lives on the platforms. */
const VISIBLE_EPISODES = 3

const SUBSCRIBE_LINKS = [
  { href: PLATFORMS.spotify, label: 'Listen on Spotify', Icon: SpotifyIcon },
  { href: PLATFORMS.apple, label: 'Listen on Apple Podcasts', Icon: ApplePodcastsIcon },
  { href: PLATFORMS.youtube, label: 'Watch on YouTube', Icon: YouTubeIcon },
]

function Podcast() {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetchEpisodes()
      .then((fetched) => {
        // fetchEpisodes sorts newest first, so this is the most recent three.
        if (!cancelled) setEpisodes(fetched.slice(0, VISIBLE_EPISODES))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="prose">
      {episodes.length > 0 && (
        <JsonLd id="episodes" data={generateEpisodeListStructuredData(episodes)} />
      )}

      <h2 id="podcast-title" className="section-title">
        Podcast
      </h2>
      <p>
        Stories and lessons from people building with data — practical conversations about real
        challenges and real solutions.
      </p>

      <ul className="platform-row">
        {SUBSCRIBE_LINKS.map(({ href, label, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="platform-link"
            >
              <Icon size={32} />
            </a>
          </li>
        ))}
      </ul>

      {loading ? (
        <p className="feed-status" role="status">
          Loading episodes…
        </p>
      ) : (
        <ul className="episode-list">
          {episodes.map((episode) => {
            const published = formatDate(episode.pubDate)

            return (
              <li key={episode.url} className="episode-card">
                <div className="episode-image">
                  {episode.image ? (
                    <img
                      src={episode.image}
                      alt=""
                      width={168}
                      height={168}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="episode-badge">
                      {episode.number ? `#${episode.number}` : 'MDG'}
                    </span>
                  )}
                </div>
                <div className="episode-content">
                  <p className="episode-meta">
                    <span className="episode-number">
                      {episode.number ? `Episode ${episode.number}` : 'Bonus episode'}
                    </span>
                    {published && (
                      <>
                        <span aria-hidden="true">·</span>
                        <time dateTime={new Date(episode.pubDate).toISOString()}>{published}</time>
                      </>
                    )}
                  </p>
                  <h3 className="episode-title">
                    <a href={episode.url} target="_blank" rel="noopener noreferrer">
                      {episode.displayTitle}
                    </a>
                  </h3>
                  <p className="episode-summary">{episode.summary}</p>
                </div>
                <a
                  href={episode.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn episode-cta"
                >
                  Listen
                </a>
              </li>
            )
          })}
        </ul>
      )}

      <p className="section-cta">
        <a
          href={PLATFORMS.substack}
          target="_blank"
          rel="noopener noreferrer"
          className="btn primary"
        >
          All episodes on Substack →
        </a>
      </p>
    </div>
  )
}

export default Podcast
