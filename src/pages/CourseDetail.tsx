// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { Link, Navigate, useParams } from 'react-router-dom'
import './pages.css'
import SEO from '../components/SEO'
import JsonLd from '../components/JsonLd'
import StripeBuyButton from '../components/StripeBuyButton'
import {
  COURSE_STATUS,
  coursePath,
  courseFacts,
  daysUntilEnrolmentCloses,
  displayStatus,
  getCourse,
  getRenamedCourse,
  isEnrolmentClosed,
  isScheduled,
  type Course,
} from '../data/courses'
import { generateCourseStructuredData, PLATFORMS, SITE_URL } from '../utils/structuredData'
import { formatDate } from '../utils/text'

/** Session dates read as "Sat 26 Sep" — the weekday is the point of a weekend cohort. */
const SESSION_DATE: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
}

/** The deadline is a date people put in a calendar, so it gets the weekday too. */
const DEADLINE_DATE: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}

/**
 * One course page.
 *
 * Two columns: the programme on the left, a sticky enrolment card on the right so
 * the call to action stays in view however long the syllabus gets. Every block
 * below the header is optional — an announced-but-unwritten course renders as the
 * header plus the card, and fills itself in as fields are added in
 * src/data/courses.ts.
 */
function CourseDetail() {
  const { slug } = useParams()
  const course = slug ? getCourse(slug) : undefined

  // A URL the course used to live at, still out there in the newsletter and on
  // LinkedIn. There is no server to 301 it, so redirect on the client.
  const renamed = !course && slug ? getRenamedCourse(slug) : undefined
  if (renamed) return <Navigate to={coursePath(renamed)} replace />

  // Unknown slug: send visitors to the catalogue rather than a dead end.
  if (!course) return <Navigate to="/courses" replace />

  const status = COURSE_STATUS[displayStatus(course)]
  const facts = courseFacts(course)
  const starts = course.startDate ? formatDate(course.startDate) : undefined
  const ends = course.endDate ? formatDate(course.endDate) : undefined
  const isPlaceholder = !course.summary && !course.outcomes && !course.modules
  // With no programme written yet there is nothing to put in the left column, so
  // the layout collapses to the card alone rather than a wide empty gutter.
  const hasBody = !isPlaceholder || Boolean(course.audience)
  // A dated programme is a schedule: the calls get a timeline, not a numbered list.
  const scheduled = isScheduled(course)
  // Past the cut-off, the page stops selling: the banner says so and the checkout
  // is not rendered at all, so Stripe's script is never even fetched.
  const closed = isEnrolmentClosed(course)

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

        {/* Above the title, because a deadline that appears below the fold is a
            deadline half the visitors meet after it has passed. */}
        {course.enrolmentDeadline && <EnrolmentDeadline course={course} closed={closed} />}

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

              {/* Directly under the promise, because that is where it qualifies
                  something. Buried further down it would read as a disclaimer. */}
              {course.scope && (
                <section aria-labelledby="course-scope-title">
                  <h2 id="course-scope-title" className="subsection-title">
                    What this course is &mdash; and isn&rsquo;t
                  </h2>
                  <div className="course-scope">
                    <div>
                      <p className="course-scope-label">It is</p>
                      <p className="course-scope-text">{course.scope.is}</p>
                    </div>
                    <div className="course-scope-not">
                      <p className="course-scope-label">It isn&rsquo;t</p>
                      <p className="course-scope-text">{course.scope.isNot}</p>
                    </div>
                  </div>
                </section>
              )}

              {course.stack && (
                <section aria-labelledby="course-stack-title">
                  <h2 id="course-stack-title" className="subsection-title">
                    What you&rsquo;ll use
                  </h2>
                  <ul className="course-stack">
                    {course.stack.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Second question a visitor asks, so it sits second — it used to be
                  the last block on the page, below the install instructions. */}
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
                      Lessons are on weekend afternoons, so they don&rsquo;t cost you time off work.
                      The two office hours are midweek. Times are shown as taught, in the
                      instructor&rsquo;s timezone.
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

              {course.instructor && (
                <section aria-labelledby="course-instructor-title">
                  <h2 id="course-instructor-title" className="subsection-title">
                    Taught by
                  </h2>
                  {/* Reuses the About page's bio card: same job, same shape, and it
                      already collapses to one column on narrow screens. */}
                  <div className="host-card">
                    {course.instructor.photo && (
                      <img
                        src={`${import.meta.env.BASE_URL}${course.instructor.photo}`}
                        alt={course.instructor.name}
                        className="host-photo"
                        width={96}
                        height={96}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <div>
                      <h3 className="host-name">{course.instructor.name}</h3>
                      <p className="host-role">{course.instructor.role}</p>
                      <p className="host-bio">{course.instructor.bio}</p>
                      {course.instructor.links && (
                        <ul className="course-instructor-links">
                          {course.instructor.links.map(({ href, label }) => (
                            <li key={label}>
                              <a href={href} target="_blank" rel="noopener noreferrer">
                                {label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
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
            </div>
          )}

          <aside className="course-aside" aria-label="Enrolment">
            {closed ? (
              <>
                <h2 className="course-aside-title">Enrolment has closed</h2>
                <p className="course-aside-text">
                  This cohort is settled and checkout is closed. The next one is announced in the
                  newsletter before anywhere else &mdash; that is where the dates and the
                  early-bird window go first.
                </p>
              </>
            ) : course.registrationUrl ? (
              <>
                <h2 className="course-aside-title">Ready to join?</h2>
                {/* The seat count is the row directly below, so this sells the
                    consequence rather than repeating the number. */}
                <p className="course-aside-text">
                  {course.seats
                    ? 'A cohort this small means your own problem gets time in every session.'
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
                link — the main button will point at a checkout, not at us. Gone
                once enrolment closes: an offer nobody can take is just noise. */}
            {course.priceNote && !closed && (
              <p className="course-aside-discount">
                {course.priceNote}{' '}
                <a href={PLATFORMS.linkedin} target="_blank" rel="noopener noreferrer">
                  Ask for the discount
                </a>
              </p>
            )}

            {closed ? (
              <>
                {/* Dead on purpose, and still shown: a card that simply lost its
                    button reads as a page that failed to load. This one states
                    that the door is shut, and cannot be clicked, tabbed to or
                    submitted — there is no checkout mounted behind it. */}
                <button type="button" className="btn accent block" disabled>
                  Enrolment closed
                </button>
                <a
                  href={PLATFORMS.substack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn primary block"
                >
                  Get the next cohort first
                </a>
              </>
            ) : course.registrationUrl ? (
              <>
                {course.stripeBuyButtonId ? (
                  <StripeBuyButton
                    buyButtonId={course.stripeBuyButtonId}
                    // Checkout is unreachable in this branch, so the fallback must
                    // not promise it: "Enrol now" landing on a LinkedIn page is a
                    // dead end, while "message us" is something you can act on.
                    fallback={<EnrolLink course={course} label="Message us to enrol" />}
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

                {/* The two questions asked between reading the price and paying it.
                    Last in the card: answers to have, not calls to action. */}
                {(course.afterPurchase || course.refundPolicy) && (
                  <div className="course-aside-terms">
                    {course.afterPurchase && <p>{course.afterPurchase}</p>}
                    {course.refundPolicy && <p>{course.refundPolicy}</p>}
                  </div>
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
 * The enrolment deadline, as a banner across the top of the page.
 *
 * Loud on purpose — it is the one thing on the page that expires, and it changes
 * what a visitor should do today. Amber while the window is open, and it flips to
 * a plain closed notice the moment the date passes, so the same component never
 * leaves a stale "seats available" claim behind.
 */
const EnrolmentDeadline = ({ course, closed }: { course: Course; closed: boolean }) => {
  // Formatted from local noon, not from the bare date: 'YYYY-MM-DD' is parsed as
  // UTC midnight, which prints as the day before anywhere west of Greenwich. A
  // deadline shown a day early is the one date on the page that must not drift.
  const date = course.enrolmentDeadline
    ? formatDate(`${course.enrolmentDeadline}T12:00:00`, DEADLINE_DATE)
    : undefined
  if (!date) return null

  const daysLeft = daysUntilEnrolmentCloses(course)

  if (closed) {
    return (
      <p className="course-deadline is-closed" role="status">
        <span className="course-deadline-text">
          <strong>Enrolment for this cohort is closed.</strong> Applications shut on{' '}
          <time dateTime={course.enrolmentDeadline}>{date}</time>, and the seats are taken. The next
          cohort is announced in the newsletter first.
        </span>
      </p>
    )
  }

  return (
    <p className="course-deadline" role="status">
      <span className="course-deadline-pulse" aria-hidden="true" />
      <span className="course-deadline-text">
        <strong>
          Applications close on <time dateTime={course.enrolmentDeadline}>{date}</time>.
        </strong>{' '}
        After that the checkout comes down and this cohort is shut &mdash; there is no late
        enrolment, because the group has to be set before Lesson 1.
      </span>
      {daysLeft !== undefined && (
        <span className="course-deadline-count">{countdown(daysLeft)}</span>
      )}
    </p>
  )
}

/** "Closes today" beats "0 days left", and "1 days left" is not a sentence. */
const countdown = (days: number) =>
  days === 0 ? 'Closes today' : days === 1 ? '1 day left' : `${days} days left`

/**
 * The site's own enrol button.
 *
 * Used directly when a course has no embedded checkout, and as the fallback
 * behind one — an enrolment card with no way to enrol is the worst outcome, so
 * this stands in whenever Stripe's script does not arrive.
 */
const EnrolLink = ({ course, label }: { course: Course; label?: string }) => (
  <a
    href={course.registrationUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="btn accent block"
  >
    {label ?? course.registrationLabel ?? 'Enrol now'}
  </a>
)

export default CourseDetail
