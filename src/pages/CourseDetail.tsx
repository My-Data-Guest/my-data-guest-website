// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { Link, Navigate, useParams } from 'react-router-dom'
import './pages.css'
import SEO from '../components/SEO'
import JsonLd from '../components/JsonLd'
import { COURSE_STATUS, courseFacts, getCourse } from '../data/courses'
import { generateCourseStructuredData, PLATFORMS, SITE_URL } from '../utils/structuredData'
import { formatDate } from '../utils/text'

/**
 * One course page.
 *
 * Every block below the header is optional: an announced-but-unwritten course
 * (like "From 0 to Agentic AI" today) renders as the title, the status and the
 * notify callout, and fills itself in as fields are added in src/data/courses.ts.
 */
function CourseDetail() {
  const { slug } = useParams()
  const course = slug ? getCourse(slug) : undefined

  // Unknown slug: send visitors to the catalogue rather than a dead end.
  if (!course) return <Navigate to="/courses" replace />

  const status = COURSE_STATUS[course.status]
  const facts = courseFacts(course)
  const starts = course.startDate ? formatDate(course.startDate) : undefined
  const isPlaceholder = !course.summary && !course.outcomes && !course.modules

  return (
    <section className="page" aria-labelledby="course-title">
      <SEO
        title={`${course.title} — Online live course`}
        description={course.summary ?? course.tagline}
        url={`${SITE_URL}/courses/${course.slug}`}
        image={course.image}
        // Nothing to rank yet, and a thin page drags the rest of the site down.
        noindex={isPlaceholder}
      />
      {!isPlaceholder && <JsonLd id="course" data={generateCourseStructuredData(course)} />}

      <div className="prose course-detail">
        <p className="page-back">
          <Link to="/courses">← All courses</Link>
        </p>

        <div className="course-detail-meta">
          <span className={`tag ${status.className}`}>{status.label}</span>
          {starts && <time dateTime={course.startDate}>Starts {starts}</time>}
        </div>

        <h1 id="course-title" className="section-title">
          {course.title}
        </h1>
        <p className="lead">{course.tagline}</p>
        {course.summary && <p>{course.summary}</p>}

        {facts.length > 0 && (
          <dl className="course-facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {course.outcomes && (
          <>
            <h2 className="subsection-title">What you&rsquo;ll walk away with</h2>
            <ul className="course-list">
              {course.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </>
        )}

        {course.modules && (
          <>
            <h2 className="subsection-title">Programme</h2>
            <ol className="course-modules">
              {course.modules.map((module, index) => (
                <li key={module.title}>
                  <span className="course-module-number">{index + 1}</span>
                  <div>
                    <h3 className="course-module-title">{module.title}</h3>
                    {module.description && (
                      <p className="course-module-text">{module.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </>
        )}

        {course.audience && (
          <>
            <h2 className="subsection-title">Who it&rsquo;s for</h2>
            <ul className="course-list">
              {course.audience.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </>
        )}

        <div className="callout">
          {course.registrationUrl ? (
            <>
              <h2>Ready to join?</h2>
              <p>Seats are limited so the cohort stays small enough for real conversation.</p>
              <a
                href={course.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn primary"
              >
                Enrol now
              </a>
            </>
          ) : (
            <>
              <h2>This course is being built</h2>
              <p>
                The programme, dates and pricing land here soon. The newsletter goes out first, so
                subscribe if you want the early-bird window.
              </p>
              <a
                href={PLATFORMS.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="btn primary"
              >
                Notify me on Substack
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default CourseDetail
