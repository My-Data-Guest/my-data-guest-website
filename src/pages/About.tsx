// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import './pages.css'
import { WebsiteIcon, LinkedInGlyph, SubstackGlyph } from '../components/Icons'
import { HOSTS, PLATFORMS } from '../utils/structuredData'

const HOST_CARDS = [
  {
    ...HOSTS.alessandro,
    photo: 'alessandro.jpg',
    links: [
      { href: 'https://www.aromano.dev/', label: 'Website', Icon: WebsiteIcon },
      { href: 'https://www.linkedin.com/in/alessandro-romano-1990/', label: 'LinkedIn', Icon: LinkedInGlyph },
      { href: 'https://alerom90.substack.com/', label: 'Substack', Icon: SubstackGlyph },
    ],
  },
  {
    ...HOSTS.rosaria,
    photo: 'rosaria.jpg',
    links: [
      { href: 'https://rosariasilipo.com/', label: 'Website', Icon: WebsiteIcon },
      { href: 'https://www.linkedin.com/in/rosaria/', label: 'LinkedIn', Icon: LinkedInGlyph },
      { href: 'https://substack.com/@rosariasilipo', label: 'Substack', Icon: SubstackGlyph },
    ],
  },
]

function About() {
  return (
    <div className="prose">
      <h2 id="about-title" className="section-title">
        About
      </h2>

      <p className="lead">
        Your go-to source for exploring AI without the hype. From agentic AI and LLMs to startup
        stories and career impact — we break it down, episode by episode.
      </p>
      <p>
        More than just a podcast, My Data Guest offers learning resources, articles and practical
        guides across multiple formats. Practical, human, and genuinely useful.
      </p>

      <h3 className="subsection-title">Your hosts</h3>
      <ul className="host-grid">
        {HOST_CARDS.map((host) => (
          <li key={host.name} className="host-card">
            <img
              src={`${import.meta.env.BASE_URL}${host.photo}`}
              alt={`${host.name}, co-host of My Data Guest`}
              className={`host-photo host-photo-${host.photo.split('.')[0]}`}
              width={120}
              height={120}
              loading="lazy"
              decoding="async"
            />
            <h4 className="host-name">{host.name}</h4>
            <p className="host-bio">{host.description}</p>
            <ul className="host-links">
              {host.links.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${host.name} — ${label}`}
                    aria-label={`${host.name} on ${label}`}
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="callout">
        <h3>Want to be a guest?</h3>
        <p>We&rsquo;re always looking for practitioners with interesting stories to share.</p>
        <a
          href={PLATFORMS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn primary"
        >
          Get in touch
        </a>
      </div>
    </div>
  )
}

export default About
