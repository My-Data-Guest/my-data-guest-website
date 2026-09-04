// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { Link } from 'react-router-dom'
import { COURSE_STATUS, courseChips, coursePath, displayStatus, type Course } from '../data/courses'
import { formatDate } from '../utils/text'

/** One course, as shown in the homepage teaser and on the courses index. */
const CourseCard = ({ course }: { course: Course }) => {
  const status = COURSE_STATUS[displayStatus(course)]
  const chips = courseChips(course)
  const starts = course.startDate ? formatDate(course.startDate) : undefined

  return (
    <Link to={coursePath(course)} className="course-card">
      <div className="course-card-meta">
        <span className={`tag ${status.className}`}>{status.label}</span>
        {starts && <time dateTime={course.startDate}>Starts {starts}</time>}
      </div>
      <h3 className="course-card-title">{course.title}</h3>
      <p className="course-card-text">{course.tagline}</p>
      {chips.length > 0 && (
        <ul className="course-card-facts">
          {chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      )}
      <span className="course-card-cta" aria-hidden="true">
        View course
        <span>→</span>
      </span>
    </Link>
  )
}

export default CourseCard
