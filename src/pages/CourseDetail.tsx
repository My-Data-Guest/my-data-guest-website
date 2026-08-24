// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { Link, Navigate, useParams } from 'react-router-dom'
import './pages.css'
import SEO from '../components/SEO'
import JsonLd from '../components/JsonLd'
import StripeBuyButton from '../components/StripeBuyButton'
import { COURSE_STATUS, courseFacts, getCourse, isScheduled, type Course } from '../data/courses'
import { generateCourseStructuredData, PLATFORMS, SITE_URL } from '../utils/structuredData'
import { formatDate } from '../utils/text'

/** Session dates read as "Sat 26 Sep" — the weekday is the point of a weekend cohort. */
const SESSION_DATE: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
}

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
  const ends = course.endDate ? formatDate(course.endDate) : undefined
  const isPlaceholder = !course.summary && !course.outcomes && !course.modules
  // With no programme written yet there is nothing to put in the left column, so
  // the layout collapses to the card alone rather than a wide empty gutter.
  const hasBody = !isPlaceholder || Boolean(course.audience)
  // A dated programme is a schedule: the calls get a timeline, not a numbered list.
  const scheduled = isScheduled(course)

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
            {starts && ends ? (
              <span>
                <time dateTime={course.startDate}>{starts}</time>
                {' – '}
                <time dateTime={course.endDate}>{ends}</time>
              </span>
            ) : (
              starts && <time dateTime={course.startDate}>Starts {starts}</time>
            )}
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
                    {scheduled ? 'Schedule and programme' : 'Programme'}
                  </h2>
                  {scheduled && (
                    <p className="course-schedule-note">
                      Weekend afternoons, so you don&rsquo;t have to take time off work. All times
                      are CET.
                    </p>
                  )}
                  <ol className={`course-modules${scheduled ? ' is-schedule' : ''}`}>
                    {course.modules.map((module, index) => (
                      <li
                        key={module.title}
                        className={module.kind === 'office-hour' ? 'is-office-hour' : undefined}
                      >
                        {scheduled ? (
                          <span className="course-module-marker" aria-hidden="true" />
                        ) : (
                          <span className="course-module-number">{index + 1}</span>
                        )}
                        <div>
                          {(module.label || module.date || module.time) && (
                            <p className="course-module-when">
                              {module.label && (
                                <span className="course-module-label">{module.label}</span>
                              )}
                              {module.date && (
                                <time dateTime={module.date}>
                                  {formatDate(module.date, SESSION_DATE)}
                                </time>
                              )}
                              {module.time && <span>{module.time}</span>}
                            </p>
                          )}
                          <h3 className="course-module-title">{module.title}</h3>
                          {module.description && (
                            <p className="course-module-text">{module.description}</p>
                          )}
                          {module.topics && (
                            <ul className="course-module-topics">
                              {module.topics.map((topic) => (
                                <li key={topic}>{topic}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {course.includes && (
                <section aria-labelledby="course-includes-title">
                  <h2 id="course-includes-title" className="subsection-title">
                    What&rsquo;s included
                  </h2>
                  <ul className="course-list">
                    {course.includes.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </section>
              )}

              {course.requirements && (
                <section aria-labelledby="course-requirements-title">
                  <h2 id="course-requirements-title" className="subsection-title">
                    What you need
                  </h2>
                  <div className="course-requirements">
                    <p className="course-requirements-callout">
                      <strong>Come prepared.</strong> {course.requirements.callout}
                    </p>
                    <ul className="course-requirements-list">
                      {course.requirements.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {course.requirements.provided && (
                      <p className="course-requirements-provided">
                        {course.requirements.provided}
                      </p>
                    )}
                  </div>
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
                  {course.seats
                    ? `Only ${course.seats} seats — small enough that your own problem gets time in every session.`
                    : 'Seats are limited so the cohort stays small enough for real conversation.'}
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

            {/* The discount is claimed by asking, so it carries its own contact
                link — the main button will point at a checkout, not at us. */}
            {course.priceNote && (
              <p className="course-aside-discount">
                {course.priceNote}{' '}
                <a href={PLATFORMS.linkedin} target="_blank" rel="noopener noreferrer">
                  Ask for the discount
                </a>
              </p>
            )}

            {course.registrationUrl ? (
              <>
                {course.stripeBuyButtonId ? (
                  <StripeBuyButton
                    buyButtonId={course.stripeBuyButtonId}
                    fallback={<EnrolLink course={course} />}
                  />
                ) : (
                  <EnrolLink course={course} />
                )}
                {/* The discount is tied to the Substack subscription, so the way to
                    qualify for it has to be one click from the price. */}
                {course.priceNote && (
                  <a
                    href={PLATFORMS.substack}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="course-aside-link"
                  >
                    Not a subscriber yet? Read the newsletter
                  </a>
                )}
              </>
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

/**
 * The site's own enrol button.
 *
 * Used directly when a course has no embedded checkout, and as the fallback
 * behind one — an enrolment card with no way to enrol is the worst outcome, so
 * this stands in whenever Stripe's script does not arrive.
 */
const EnrolLink = ({ course }: { course: Course }) => (
  <a
    href={course.registrationUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="btn accent block"
  >
    {course.registrationLabel ?? 'Enrol now'}
  </a>
)

export default CourseDetail
