// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { Link } from 'react-router-dom'
import './pages.css'
import SEO from '../components/SEO'

function NotFound() {
  return (
    <section className="page" aria-labelledby="notfound-title">
      <SEO
        title="Page not found"
        description="That page does not exist. Head back to My Data Guest for the podcast, the newsletter and our live courses."
        noindex
      />

      <div className="container">
        <div className="not-found">
          <p className="not-found-code">Error 404</p>
          <h1 id="notfound-title" className="section-title">
            Page not found
          </h1>
          <p className="section-lead">
            That link does not lead anywhere — it may have moved since it was shared.
          </p>
          <div className="cta-row">
            <Link to="/" className="btn primary">
              Back to the homepage
            </Link>
            <Link to="/courses" className="btn">
              Browse the courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFound
