// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { Link } from 'react-router-dom'
import './pages.css'
import { COURSES, COURSE_STATUS, courseFacts, coursePath } from '../data/courses'
import { BuildIcon, CohortIcon, LiveIcon } from '../components/Icons'
import { formatDate } from '../utils/text'

/**
 * The homepage pitch for the courses branch.
 *
 * Was three centred lines and a button. Courses are the thing being sold, so the
 * section gets the page's one high-contrast band, the reasons to buy, and the
 * featured course rendered as a real offer. The catalogue still lives on
 * /courses — everything here reads from the data, so it cannot go stale.
 */

const SELLING_POINTS = [
  {
    Icon: LiveIcon,
    title: 'Live, not recorded',
    text: 'Taught in real time. You ask questions while the problem is in front of you.',
  },
  {
    Icon: CohortIcon,
    title: 'Small cohorts',
    text: 'Groups stay small enough that everyone gets heard and nobody hides.',
  },
  {
    Icon: BuildIcon,
    title: 'Built on shipped work',
    text: 'Every session comes out of systems we have actually put in production.',
  },
]

function Courses() {
  const featured = COURSES[0]
  const facts = featured ? courseFacts(featured) : []
  const starts = featured?.startDate ? formatDate(featured.startDate) : undefined

  return (
    <div className="container">
      <div className="section-head">
        <p className="eyebrow">Live courses</p>
        <h2 id="courses-title" className="section-title">
          Learn it live, from people who build it
        </h2>
        <p className="section-lead">
          Online, hands-on training for teams and individuals who want to go past the demos and put
          AI to work properly.
        </p>
      </div>

      <div className="courses-teaser">
        <ul className="course-selling-points">
          {SELLING_POINTS.map(({ Icon, title, text }) => (
            <li key={title}>
              <Icon size={22} />
              <div>
                <h3 className="course-selling-point-title">{title}</h3>
                <p className="course-selling-point-text">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        {featured && (
          <div className="featured-course">
            <div className="featured-course-top">
              <span className="featured-course-label">Next up</span>
              <span className={`tag ${COURSE_STATUS[featured.status].className}`}>
                {COURSE_STATUS[featured.status].label}
              </span>
            </div>
            <h3 className="featured-course-title">{featured.title}</h3>
            <p className="featured-course-text">{featured.tagline}</p>

            {(starts || facts.length > 0) && (
              <ul className="featured-course-facts">
                {starts && <li>Starts {starts}</li>}
                {facts.map(([label, value]) => (
                  <li key={label}>{value}</li>
                ))}
              </ul>
            )}

            <div className="featured-course-actions">
              <Link className="btn accent" to={coursePath(featured)}>
                See the course
              </Link>
              <Link className="btn on-dark" to="/courses">
                All courses
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Courses
