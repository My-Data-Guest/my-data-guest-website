// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { Link } from 'react-router-dom'
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

/**
 * The three claims under the hero.
 *
 * Deliberately not counters. An "N episodes" tile is the obvious thing to put
 * here, but it either hardcodes a number that goes stale or makes the fold wait
 * on the RSS feed. These say the same thing about the work and stay true.
 */
const PROOF = [
  {
    label: 'Practitioners, not pundits',
    text: 'Every guest has actually shipped the thing they are talking about.',
  },
  {
    label: 'Live, small-cohort courses',
    text: 'Hands-on from session one, with room to ask questions as they come up.',
  },
  {
    label: 'Free podcast and newsletter',
    text: 'On Spotify, Apple, YouTube and Substack — no paywall, no filler.',
  },
]

function Home() {
  return (
    <div className="container">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Podcast · Newsletter · Live courses</p>
          <h1 id="hero-title" className="hero-title">
            AI without the hype.
            <em>Skills that hold up.</em>
          </h1>
          <p className="hero-lead">
            Honest conversations and practical craft from the people building with data and AI — and
            live courses that turn it into something you can use the next day.
          </p>

          <div className="cta-row">
            <Link className="btn primary large" to="/courses">
              Explore live courses
            </Link>
            <a className="btn large" href="#podcast">
              Listen to the podcast
            </a>
          </div>

          <div className="hero-platforms">
            <span className="hero-platforms-label">Find us on</span>
            <ul>
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
                    <Icon size={30} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="My Data Guest"
            className="hero-logo"
            width={340}
            height={340}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>

      <ul className="hero-proof">
        {PROOF.map(({ label, text }) => (
          <li key={label}>
            <span className="hero-proof-label">{label}</span>
            <span className="hero-proof-text">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
