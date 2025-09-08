import './pages.css'

const SocialIcon = {
  Website: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
      <path d="M2 12h20" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="#0A66C2"/>
      <rect x="2" y="9" width="4" height="12" fill="#0A66C2"/>
      <circle cx="4" cy="4" r="2" fill="#0A66C2"/>
    </svg>
  ),
  Substack: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="2" fill="#FF6719"/>
      <rect x="3" y="10" width="18" height="2" fill="#FF6719"/>
      <polygon points="3,16 21,16 12,22" fill="#FF6719"/>
    </svg>
  )
}

function About() {
  return (
    <section className="prose">
      <h1 className="section-title">About</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ fontSize: '20px', fontWeight: '500', marginBottom: '32px', color: 'var(--text)' }}>
          Your go-to source for exploring AI without the hype. From Agentic AI and LLMs to startup stories and career impact — we break it down, episode by episode.
        </p>
        
        <p>
          More than just a podcast, My Data Guest offers learning resources, articles, and practical guides across multiple formats. Practical, human, and genuinely useful.
        </p>

        <div style={{ 
          marginTop: '48px', 
          marginBottom: '48px'
        }}>
          <h3 style={{ 
            marginBottom: '32px', 
            color: 'var(--text)', 
            fontSize: '24px',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            Your Hosts
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '24px',
              background: 'var(--surface-elevated)',
              borderRadius: '16px',
              border: '1px solid var(--border-light)'
            }}>
              <img 
                src={`${import.meta.env.BASE_URL}alessandro.jpg`}
                alt="Alessandro Romano"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '16px',
                  margin: '0 auto 16px',
                  display: 'block',
                  border: '3px solid var(--primary)'
                }}
              />
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--text)',
                marginBottom: '8px'
              }}>
                Alessandro Romano
              </h4>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '15px',
                lineHeight: '1.5',
                marginBottom: '16px'
              }}>
                Co-host bringing technical expertise and practical insights from building data systems at scale.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px'
              }}>
                <a 
                  href="https://www.aromano.dev/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Website"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <SocialIcon.Website />
                </a>
                <a 
                  href="https://www.linkedin.com/in/alessandro-romano-1990/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <SocialIcon.LinkedIn />
                </a>
                <a 
                  href="https://alerom90.substack.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Substack"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <SocialIcon.Substack />
                </a>
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '24px',
              background: 'var(--surface-elevated)',
              borderRadius: '16px',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                margin: '0 auto 16px',
                border: '3px solid var(--primary)'
              }}>
                <span style={{
                  color: 'white',
                  fontSize: '36px',
                  fontWeight: '600'
                }}>
                  RS
                </span>
              </div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--text)',
                marginBottom: '8px'
              }}>
                Rosaria Silipo
              </h4>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '15px',
                lineHeight: '1.5',
                marginBottom: '16px'
              }}>
                Co-host sharing deep knowledge in data science and analytics, with extensive experience in the field.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px'
              }}>
                <a 
                  href="https://rosariasilipo.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Website"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <SocialIcon.Website />
                </a>
                <a 
                  href="https://www.linkedin.com/in/rosaria/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <SocialIcon.LinkedIn />
                </a>
                <a 
                  href="https://substack.com/@rosariasilipo" 
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Substack"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <SocialIcon.Substack />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ 
          padding: '32px', 
          background: 'var(--surface-elevated)',
          borderRadius: '20px',
          border: '1px solid var(--border-light)',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            marginBottom: '16px', 
            color: 'var(--text)', 
            fontSize: '18px',
            fontWeight: '600' 
          }}>
            Want to be a guest?
          </h3>
          <p style={{ 
            marginBottom: '20px', 
            color: 'var(--text-muted)',
            fontSize: '16px' 
          }}>
            We're always looking for practitioners with interesting stories to share.
          </p>
          <a 
            href="https://www.linkedin.com/company/my-data-guest" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn primary"
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}

export default About




