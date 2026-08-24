// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import './pages.css'
import CourseCard from '../components/CourseCard'
import SEO from '../components/SEO'
import JsonLd from '../components/JsonLd'
import { COURSES } from '../data/courses'
import { generateCourseListStructuredData, PLATFORMS, SITE_URL } from '../utils/structuredData'

function CoursesPage() {
  return (
    <section className="page" aria-labelledby="courses-page-title">
      <SEO
        title="Courses — Online live training on AI and data"
        description="Online live courses from My Data Guest. Small cohorts, hands-on sessions and practical AI and data skills you can use the next day."
        url={`${SITE_URL}/courses`}
      />
      <JsonLd id="courses" data={generateCourseListStructuredData(COURSES)} />

      <div className="prose">
        <h1 id="courses-page-title" className="section-title">
          Courses
        </h1>
        <p className="lead">
          Live, online and hands-on. No recorded slideshows — you build alongside us and ask
          questions as they come up.
        </p>
        <p>
          Every course is taught in a small cohort so there is room for real discussion, and every
          session is grounded in work we have actually shipped.
        </p>

        <ul className="course-grid">
          {COURSES.map((course) => (
            <li key={course.slug}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>

        <div className="callout">
          <h2>Want to hear when a cohort opens?</h2>
          <p>
            Dates and enrolment go out through the newsletter first — subscribers get the early-bird
            window.
          </p>
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
