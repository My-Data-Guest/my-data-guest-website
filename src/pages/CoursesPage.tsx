// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import './pages.css'
import SEO from '../components/SEO'
import { PLATFORMS, SITE_URL } from '../utils/structuredData'

/**
 * Placeholder while no course is on sale.
 *
 * The first cohort's page (price, Stripe checkout, schedule) was removed once
 * it had run; it is in git history if a future course wants to reuse it. A new
 * paid course needs consumer-law terms (withdrawal notice, seller details)
 * before it goes back up.
 */
function CoursesPage() {
  return (
    <section className="page" aria-labelledby="courses-page-title">
      <SEO
        title="Courses — Upcoming live training on AI and data"
        description="New live courses from My Data Guest are on the way. Subscribe to the newsletter to hear first when the next cohort opens."
        url={`${SITE_URL}/courses`}
      />

      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Live courses</p>
          <h1 id="courses-page-title" className="section-title">
            Upcoming
          </h1>
          <p className="section-lead">
            New live courses are on the way. Dates and details go out through the newsletter
            first.
          </p>
        </div>

        <div className="callout">
          <div>
            <h2 className="callout-title">Want to hear when a cohort opens?</h2>
            <p>Subscribe and you will be the first to know.</p>
          </div>
          <a
            href={PLATFORMS.substack}
            target="_blank"
            rel="noopener noreferrer"
            className="btn primary"
          >
            Subscribe on Substack
          </a>
        </div>
      </div>
    </section>
  )
}

export default CoursesPage
