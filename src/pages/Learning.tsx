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
    <div className="container">
      <div className="section-head-row">
        <div className="section-head">
          <p className="eyebrow">The newsletter</p>
          <h2 id="learning-title" className="section-title">
            Written notes, worth the read
          </h2>
          <p className="section-lead">
            Practical guides on building better data systems and making smarter decisions — the
            things we keep having to explain twice.
          </p>
        </div>

        <a
          href={PLATFORMS.substack}
          target="_blank"
          rel="noopener noreferrer"
          className="link-action"
        >
          Read on Substack
          <span aria-hidden="true">→</span>
        </a>
      </div>

      {loading ? (
        <p className="feed-status" role="status">
          Loading latest articles…
        </p>
      ) : (
        <ul className="article-grid">
          {posts.map((post) => {
            const published = formatDate(post.pubDate, { day: 'numeric', month: 'short' })

            return (
              <li key={post.link}>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-card"
                >
                  <div className={`article-card-image${post.image ? '' : ' is-placeholder'}`}>
                    <img
                      src={post.image || `${import.meta.env.BASE_URL}logo.png`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="article-card-content">
                    <div className="article-card-meta">
                      <span className="tag tag-newsletter">
                        <SubstackGlyph size={13} />
                        Newsletter
                      </span>
                      {published && (
                        <time dateTime={new Date(post.pubDate).toISOString()}>{published}</time>
                      )}
                    </div>
                    <h3 className="article-card-title">{post.title}</h3>
                    <p className="article-card-text">{post.description}</p>
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Learning
