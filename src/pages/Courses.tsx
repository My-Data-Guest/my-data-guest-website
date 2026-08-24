// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { Link } from 'react-router-dom'
import './pages.css'
import { COURSES, COURSE_STATUS } from '../data/courses'

/**
 * The homepage teaser for the courses branch.
 *
 * Same shape as every other section — title, intro, CTA — because the catalogue
 * itself lives on /courses and duplicating the cards here would mean two places
 * to keep current. The featured line reads from the data, so it cannot go stale.
 */
function Courses() {
  const featured = COURSES[0]

  return (
    <div className="prose">
      <h2 id="courses-title" className="section-title">
        Courses
      </h2>
      <p>
        Live, online courses taught in small cohorts — hands-on from the first session, with room to
        ask questions as they come up.
      </p>
      {featured && (
        <p>
          First up: <strong>{featured.title}</strong> —{' '}
          {COURSE_STATUS[featured.status].label.toLowerCase()}.
        </p>
      )}

      <p className="section-cta">
        <Link to="/courses" className="btn primary">
          Explore courses →
        </Link>
      </p>
    </div>
  )
}

export default Courses
