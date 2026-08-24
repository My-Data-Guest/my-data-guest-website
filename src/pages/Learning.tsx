// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { useEffect, useState } from 'react'
import './pages.css'
import { fetchSubstackPosts, type SubstackPost } from '../utils/substack'
import { fetchEpisodes } from '../utils/rss'
import { formatDate } from '../utils/text'
import { SubstackGlyph } from '../components/Icons'
import { PLATFORMS } from '../utils/structuredData'

function Learning() {
  const [posts, setPosts] = useState<SubstackPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const loadPosts = async () => {
      try {
        const [fetchedPosts, episodes] = await Promise.all([fetchSubstackPosts(), fetchEpisodes()])

        // Episodes are cross-posted to Substack, so drop the duplicates and keep
        // this section for written pieces only.
        const episodeTitles = new Set(episodes.map((episode) => episode.title.toLowerCase().trim()))
        const writtenPosts = fetchedPosts.filter(
          (post) => !episodeTitles.has(post.title.toLowerCase().trim())
        )

        if (!cancelled) setPosts(writtenPosts)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadPosts()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="prose">
      <h2 id="learning-title" className="section-title">
        Learning
      </h2>
      <p>
        Articles and notes from the My Data Guest newsletter — practical guides for building better
        data systems and making smarter decisions.
      </p>

      {loading ? (
        <p className="feed-status" role="status">
          Loading latest articles…
        </p>
      ) : (
        <ul className="grid">
          {posts.map((post) => {
            const published = formatDate(post.pubDate, { day: 'numeric', month: 'short' })

            return (
              <li key={post.link}>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="learning-card"
                >
                  <div
                    className={`learning-card-image${post.image ? '' : ' is-placeholder'}`}
                  >
                    <img
                      src={post.image || `${import.meta.env.BASE_URL}logo.png`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="learning-card-content">
                    <div className="learning-card-meta">
                      <span className="tag tag-newsletter">
                        <SubstackGlyph size={14} />
                        Newsletter
                      </span>
                      {published && (
                        <time dateTime={new Date(post.pubDate).toISOString()}>{published}</time>
                      )}
                    </div>
                    <h3 className="learning-card-title">{post.title}</h3>
                    <p className="learning-card-text">{post.description}</p>
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      )}

      <p className="section-cta">
        <a href={PLATFORMS.substack} target="_blank" rel="noopener noreferrer" className="btn primary">
          Read more on Substack →
        </a>
      </p>
    </div>
  )
}

export default Learning
