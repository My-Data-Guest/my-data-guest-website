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
 * Two columns: the programme on the left, a sticky enrolment card on the right so
 * the call to action stays in view however long the syllabus gets. Every block
 * below the header is optional — an announced-but-unwritten course (like
 * "From 0 to Agentic AI" today) renders as the header plus the card, and fills
 * itself in as fields are added in src/data/courses.ts.
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
  // With no programme written yet there is nothing to put in the left column, so
  // the layout collapses to the card alone rather than a wide empty gutter.
  const hasBody = !isPlaceholder || Boolean(course.audience)

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

      <div className="container">
        <p className="page-back">
          <Link to="/courses">
            <span aria-hidden="true">←</span> All courses
          </Link>
        </p>

        <div className="course-hero">
          <div className="course-hero-meta">
            <span className={`tag ${status.className}`}>{status.label}</span>
            {starts && <time dateTime={course.startDate}>Starts {starts}</time>}
          </div>
          <h1 id="course-title" className="section-title">
            {course.title}
          </h1>
          <p className="section-lead">{course.tagline}</p>
        </div>

        <div className={`course-layout${hasBody ? '' : ' is-narrow'}`}>
          {hasBody && (
            <div className="course-body">
              {course.summary && (
                <div className="prose">
                  <p>{course.summary}</p>
                </div>
              )}

              {course.outcomes && (
                <section aria-labelledby="course-outcomes-title">
                  <h2 id="course-outcomes-title" className="subsection-title">
                    What you&rsquo;ll walk away with
                  </h2>
                  <ul className="course-list">
                    {course.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </section>
              )}

              {course.modules && (
                <section aria-labelledby="course-programme-title">
                  <h2 id="course-programme-title" className="subsection-title">
                    Programme
                  </h2>
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
                </section>
              )}

              {course.audience && (
                <section aria-labelledby="course-audience-title">
                  <h2 id="course-audience-title" className="subsection-title">
                    Who it&rsquo;s for
                  </h2>
                  <ul className="course-list">
                    {course.audience.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}

          <aside className="course-aside" aria-label="Enrolment">
            {course.registrationUrl ? (
              <>
                <h2 className="course-aside-title">Ready to join?</h2>
                <p className="course-aside-text">
                  Seats are limited so the cohort stays small enough for real conversation.
                </p>
              </>
            ) : (
              <>
                <h2 className="course-aside-title">This course is being built</h2>
                <p className="course-aside-text">
                  The programme, dates and pricing land here soon. The newsletter goes out first, so
                  subscribe if you want the early-bird window.
                </p>
              </>
            )}

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

            {course.registrationUrl ? (
              <a
                href={course.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn accent block"
              >
                Enrol now
              </a>
            ) : (
              <a
                href={PLATFORMS.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="btn primary block"
              >
                Notify me on Substack
              </a>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}

export default CourseDetail
