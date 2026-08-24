// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

// The course catalogue.
//
// Courses are content, not code: everything the section, the index page and the
// detail page render comes from here. Adding a course means adding an entry —
// every field except the first five is optional, and the detail page simply
// leaves out the blocks it has no data for.

export type CourseStatus = 'coming-soon' | 'enrolling' | 'live'

export interface CourseModule {
  title: string
  description?: string
}

export interface Course {
  /** URL segment: /courses/<slug>. Never change it once a course is announced. */
  slug: string
  title: string
  /** One line, used on the cards and as the detail-page lead. */
  tagline: string
  status: CourseStatus
  /** e.g. 'Online, live' — shown as a fact on the card and the detail page. */
  format?: string
  /** Longer intro paragraph on the detail page. */
  summary?: string
  duration?: string
  level?: string
  language?: string
  price?: string
  /** ISO date (YYYY-MM-DD) of the first session. */
  startDate?: string
  /** Path relative to the site root, or an absolute URL. */
  image?: string
  audience?: string[]
  outcomes?: string[]
  modules?: CourseModule[]
  /** Where "Enrol" points. Until it exists the page offers the newsletter instead. */
  registrationUrl?: string
}

export const COURSE_STATUS: Record<CourseStatus, { label: string; className: string }> = {
  'coming-soon': { label: 'Coming soon', className: 'tag-soon' },
  enrolling: { label: 'Enrolling now', className: 'tag-open' },
  live: { label: 'Running now', className: 'tag-live' },
}

export const COURSES: Course[] = [
  {
    slug: 'from-0-to-agentic-ai',
    title: 'From 0 to Agentic AI',
    tagline: 'A live, hands-on course that takes you from the basics to shipping AI agents.',
    status: 'coming-soon',
    format: 'Online, live',
  },
]

export const coursePath = (course: Course) => `/courses/${course.slug}`

export const getCourse = (slug: string) => COURSES.find((course) => course.slug === slug)

/** The facts strip: label/value pairs a course actually has, in a fixed order. */
export const courseFacts = (course: Course): [string, string][] =>
  (
    [
      ['Format', course.format],
      ['Duration', course.duration],
      ['Level', course.level],
      ['Language', course.language],
      ['Price', course.price],
    ] as [string, string | undefined][]
  ).filter((entry): entry is [string, string] => Boolean(entry[1]))
