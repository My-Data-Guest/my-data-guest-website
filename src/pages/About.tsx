// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import './pages.css'
import { WebsiteIcon, LinkedInGlyph, SubstackGlyph } from '../components/Icons'
import { HOSTS, PLATFORMS } from '../utils/structuredData'

const HOST_CARDS = [
  {
    ...HOSTS.alessandro,
    photo: 'alessandro.jpg',
    // A one-line discipline, not a job title — `jobTitle` on HOSTS is "Co-host"
    // for both of them, which tells a visitor nothing about the teaching.
    role: 'Co-host · Data engineering',
    links: [
      { href: 'https://www.aromano.dev/', label: 'Website', Icon: WebsiteIcon },
      { href: 'https://www.linkedin.com/in/alessandro-romano-1990/', label: 'LinkedIn', Icon: LinkedInGlyph },
      { href: 'https://alerom90.substack.com/', label: 'Substack', Icon: SubstackGlyph },
    ],
  },
  {
    ...HOSTS.rosaria,
    photo: 'rosaria.jpg',
    role: 'Co-host · Data science',
    links: [
      { href: 'https://rosariasilipo.com/', label: 'Website', Icon: WebsiteIcon },
      { href: 'https://www.linkedin.com/in/rosaria/', label: 'LinkedIn', Icon: LinkedInGlyph },
      { href: 'https://substack.com/@rosariasilipo', label: 'Substack', Icon: SubstackGlyph },
    ],
  },
]

function About() {
  return (
    <div className="container">
      <div className="about-layout">
        <div className="about-copy">
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="section-title">
            AI, explained by the people doing it
          </h2>
          <p className="lead">
            From agentic AI and LLMs to startup stories and career impact — we break it down, episode
            by episode, without the hype.
          </p>
          <p>
            More than a podcast: My Data Guest is a newsletter, a growing library of practical
            guides, and live courses. Practical, human, and genuinely useful.
          </p>
        </div>

        <div>
          <h3 className="subsection-title">Your hosts</h3>
          <ul className="host-grid">
            {HOST_CARDS.map((host) => (
              <li key={host.name} className="host-card">
                <img
                  src={`${import.meta.env.BASE_URL}${host.photo}`}
                  alt={`${host.name}, co-host of My Data Guest`}
                  className={`host-photo host-photo-${host.photo.split('.')[0]}`}
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h4 className="host-name">{host.name}</h4>
                  <p className="host-role">{host.role}</p>
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="callout">
        <div>
          <h3 className="callout-title">Want to be a guest?</h3>
          <p>We&rsquo;re always looking for practitioners with interesting stories to share.</p>
        </div>
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
