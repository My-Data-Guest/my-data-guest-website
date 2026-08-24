// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import './pages.css'
import {
  SpotifyIcon,
  ApplePodcastsIcon,
  YouTubeIcon,
  LinkedInIcon,
  SubstackIcon,
} from '../components/Icons'
import { PLATFORMS } from '../utils/structuredData'

const LISTEN_LINKS = [
  { href: PLATFORMS.substack, label: 'Read on Substack', Icon: SubstackIcon },
  { href: PLATFORMS.linkedin, label: 'Follow on LinkedIn', Icon: LinkedInIcon },
  { href: PLATFORMS.spotify, label: 'Listen on Spotify', Icon: SpotifyIcon },
  { href: PLATFORMS.youtube, label: 'Watch on YouTube', Icon: YouTubeIcon },
  { href: PLATFORMS.apple, label: 'Listen on Apple Podcasts', Icon: ApplePodcastsIcon },
]

function Home() {
  return (
    <>
      <div className="hero-content">
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="My Data Guest"
          className="hero-logo"
          width={280}
          height={280}
          loading="eager"
          fetchPriority="high"
        />
        <h1 id="hero-title" className="hero-tagline">
          <span className="tagline-primary">AI Without the Hype.</span>
          <span className="tagline-secondary">Podcast, Learnings and Stories.</span>
        </h1>
        <ul className="hero-platforms">
          {LISTEN_LINKS.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="platform-link"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
        <div className="cta-row">
          <a className="btn primary" href="#podcast">
            Latest episodes
          </a>
          <a className="btn" href="#learning">
            Read the newsletter
          </a>
        </div>
      </div>
      <a className="scroll-cue" href="#podcast" aria-label="Scroll to the podcast section">
        <span aria-hidden="true">↓</span>
      </a>
    </>
  )
}

export default Home
