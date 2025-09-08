import { useEffect, useState } from 'react'
import './pages.css'
import { fetchSubstackPosts } from '../utils/substack'
import { fetchEpisodes } from '../utils/rss'
import SEO from '../components/SEO'

type SubstackPost = {
  title: string
  description: string
  link: string
  pubDate: string
  image?: string
}

const SubstackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="10" fill="#FF6719"/>
    <path d="M7 8h10v1H7V8zm0 3h10v1H7v-1zm0 3h10l-5 3-5-3z" fill="#fff"/>
  </svg>
)

function Learning() {
  const [posts, setPosts] = useState<SubstackPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Fetch both Substack posts and podcast episodes
        const [fetchedPosts, episodes] = await Promise.all([
          fetchSubstackPosts(),
          fetchEpisodes()
        ])
        
        // Create a set of podcast episode titles for quick lookup
        const podcastTitles = new Set(
          episodes.map(episode => episode.title.toLowerCase().trim())
        )
        
        // Filter out Substack posts that have the same title as podcast episodes
        const filteredPosts = fetchedPosts.filter(post => 
          !podcastTitles.has(post.title.toLowerCase().trim())
        )
        
        setPosts(filteredPosts)
      } catch (error) {
        console.error('Error loading Substack posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) {
    return (
      <>
        <SEO
          title="Learning - My Data Guest"
          description="Practical guides, notes, and resources for building better data systems and making smarter decisions."
          url="https://mydataguest.com#learning"
          image="/logo.png"
          type="website"
        />
        <section className="prose">
          <h1 className="section-title">Learning</h1>
          <p>Practical guides, notes, and resources for building better data systems and making smarter decisions.</p>
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            Loading latest content...
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEO
        title="Learning - My Data Guest"
        description="Latest articles and insights from the My Data Guest newsletter — practical guides for building better data systems and making smarter decisions."
        url="https://mydataguest.com#learning"
        image="/logo.png"
        type="website"
      />
      <section className="prose">
      <h1 className="section-title">Learning</h1>
      <p>Latest articles and insights from the My Data Guest newsletter — practical guides for building better data systems and making smarter decisions.</p>
      
      <div className="grid">
        {posts.map((post, index) => (
          <a 
            key={index} 
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="learning-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="learning-card-image">
              <img 
                src={post.image || `${import.meta.env.BASE_URL}logo.png`} 
                alt={`${post.title} - My Data Guest newsletter article`}
                loading="lazy"
              />
            </div>
            <div className="learning-card-content">
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <div style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  background: '#FF6719',
                  color: 'white',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  <SubstackIcon />
                  Newsletter
                </div>
                <div style={{ 
                  fontSize: '12px',
                  color: 'var(--text-light)',
                  fontWeight: '500'
                }}>
                  {new Date(post.pubDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '8px',
                color: 'var(--text)',
                lineHeight: '1.3'
              }}>
                {post.title}
              </h3>
              <p style={{ 
                color: 'var(--text-muted)', 
                fontSize: '14px',
                lineHeight: '1.5',
                margin: 0
              }}>
                {post.description}
              </p>
            </div>
          </a>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <a 
          href="https://mydataguest.substack.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn primary"
        >
          Read more on Substack →
        </a>
      </div>
      </section>
    </>
  )
}

export default Learning




