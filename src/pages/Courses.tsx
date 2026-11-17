// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { Link } from 'react-router-dom'
import './pages.css'
import { BuildIcon, CohortIcon, LiveIcon } from '../components/Icons'
import { PLATFORMS } from '../utils/structuredData'

/**
 * The homepage pitch for the courses branch.
 *
 * No course is on sale right now, so the card on the right announces the next
 * cohort as upcoming and points to the newsletter instead of a checkout.
 */

const SELLING_POINTS = [
  {
    Icon: LiveIcon,
    // Not "live, not recorded": sessions *are* recorded for the cohort, and the
    // point being made is that they are taught rather than pre-canned.
    title: 'Live, not pre-recorded',
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

        <div className="featured-course">
          <div className="featured-course-top">
            <span className="featured-course-label">Upcoming</span>
          </div>
          <h3 className="featured-course-title">The next cohort is on the way</h3>
          <p className="featured-course-text">
            Dates and details go out through the newsletter first.
          </p>

          <div className="featured-course-actions">
            <a
              className="btn accent"
              href={PLATFORMS.substack}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get notified
            </a>
            <Link className="btn on-dark" to="/courses">
              Upcoming courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses
