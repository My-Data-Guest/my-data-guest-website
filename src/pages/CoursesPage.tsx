// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import './pages.css'
import CourseCard from '../components/CourseCard'
import SEO from '../components/SEO'
import JsonLd from '../components/JsonLd'
import { COURSES } from '../data/courses'
import { generateCourseListStructuredData, PLATFORMS, SITE_URL } from '../utils/structuredData'

/** What actually happens if you sign up — the reassurance a paid offer needs. */
const STEPS = [
  {
    title: 'Book a seat',
    // Was "dates and the programme go out through the newsletter before enrolment
    // opens", which stopped being true the moment a course page carried both.
    text: 'Every date and the full programme are on the course page. Pay, and the confirmation email follows within a few hours.',
  },
  {
    title: 'Show up and build',
    text: 'Live sessions, worked examples, and your own questions answered as they come up.',
  },
  {
    title: 'Leave with something that runs',
    text: 'You finish with working code and notes you can take straight back to your own stack.',
  },
]

function CoursesPage() {
  return (
    <section className="page" aria-labelledby="courses-page-title">
      <SEO
        title="Courses — Online live training on AI and data"
        description="Online live courses from My Data Guest. Small cohorts, hands-on sessions and practical AI and data skills you can use the next day."
        url={`${SITE_URL}/courses`}
      />
      <JsonLd id="courses" data={generateCourseListStructuredData(COURSES)} />

      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Live courses</p>
          <h1 id="courses-page-title" className="section-title">
            Online, live, and hands-on
          </h1>
          <p className="section-lead">
            No recorded slideshows. You build alongside us in a small cohort, and every session is
            grounded in work we have actually shipped.
          </p>
        </div>

        <ul className="course-grid">
          {COURSES.map((course) => (
            <li key={course.slug}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>

        <section className="course-how" aria-labelledby="course-how-title">
          <h2 id="course-how-title" className="subsection-title">
            How a cohort works
          </h2>
          <ol className="steps">
            {STEPS.map(({ title, text }) => (
              <li key={title}>
                <h3 className="step-title">{title}</h3>
                <p className="step-text">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="callout">
          <div>
            <h2 className="callout-title">Want to hear when a cohort opens?</h2>
            <p>
              Dates and enrolment go out through the newsletter first — subscribers get the
              early-bird window.
            </p>
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
