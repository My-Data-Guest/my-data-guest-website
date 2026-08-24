// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

// Schema.org structured data for the site.
//
// Everything lives in one @graph so the entities cross-reference each other via
// @id (Google resolves the graph as a single unit). Emitting several disconnected
// <script type="application/ld+json"> blocks instead leaves Google to guess how
// the organisation, website and podcast relate.

import type { Course } from '../data/courses'
import type { Episode } from './rss'

export const SITE_URL = 'https://mydataguest.com'

export const PLATFORMS = {
  substack: 'https://mydataguest.substack.com/',
  substackFeed: 'https://mydataguest.substack.com/feed',
  linkedin: 'https://www.linkedin.com/company/my-data-guest',
  spotify: 'https://podcasters.spotify.com/pod/show/pigna19908',
  youtube: 'https://www.youtube.com/@MyDataGuest1',
  apple: 'https://podcasts.apple.com/us/podcast/my-data-guest/id1837487759',
} as const

export const HOSTS = {
  alessandro: {
    name: 'Alessandro Romano',
    jobTitle: 'Co-host',
    description:
      'Data professional who brings technical depth and practical insight from building data systems at scale.',
    image: `${SITE_URL}/alessandro.jpg`,
    url: 'https://www.aromano.dev/',
    sameAs: [
      'https://www.aromano.dev/',
      'https://www.linkedin.com/in/alessandro-romano-1990/',
      'https://alerom90.substack.com/',
    ],
  },
  rosaria: {
    name: 'Rosaria Silipo',
    jobTitle: 'Co-host',
    description:
      'Data scientist with two decades of experience applying machine learning and analytics in the field.',
    image: `${SITE_URL}/rosaria.jpg`,
    url: 'https://rosariasilipo.com/',
    sameAs: [
      'https://rosariasilipo.com/',
      'https://www.linkedin.com/in/rosaria/',
      'https://substack.com/@rosariasilipo',
    ],
  },
} as const

const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const PODCAST_ID = `${SITE_URL}/#podcast`

const personId = (key: keyof typeof HOSTS) => `${SITE_URL}/#${key}`

const SITE_DESCRIPTION =
  'AI without the hype. A podcast and newsletter about building with data and AI — real stories, honest conversations, and practical advice from practitioners.'

const person = (key: keyof typeof HOSTS) => {
  const host = HOSTS[key]
  return {
    '@type': 'Person',
    '@id': personId(key),
    name: host.name,
    jobTitle: host.jobTitle,
    description: host.description,
    image: host.image,
    url: host.url,
    sameAs: [...host.sameAs],
    worksFor: { '@id': ORGANIZATION_ID },
  }
}

const hostRefs = [{ '@id': personId('alessandro') }, { '@id': personId('rosaria') }]

/** The site-wide graph: organisation, website, podcast series and both hosts. */
export const generateSiteStructuredData = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'My Data Guest',
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#logo`,
        url: `${SITE_URL}/logo.png`,
        width: 1024,
        height: 1024,
        caption: 'My Data Guest',
      },
      image: { '@id': `${SITE_URL}/#logo` },
      founder: hostRefs,
      sameAs: [
        PLATFORMS.substack,
        PLATFORMS.linkedin,
        PLATFORMS.spotify,
        PLATFORMS.youtube,
        PLATFORMS.apple,
      ],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: 'My Data Guest',
      alternateName: 'My Data Guest — AI Without the Hype',
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': ORGANIZATION_ID },
    },
    {
      '@type': 'PodcastSeries',
      '@id': PODCAST_ID,
      name: 'My Data Guest',
      description: SITE_DESCRIPTION,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/logo.png`,
      inLanguage: 'en',
      webFeed: PLATFORMS.substackFeed,
      author: hostRefs,
      publisher: { '@id': ORGANIZATION_ID },
      sameAs: [PLATFORMS.spotify, PLATFORMS.apple, PLATFORMS.youtube],
    },
    person('alessandro'),
    person('rosaria'),
  ],
})

/** Episode-level markup, emitted separately once the RSS feed has loaded. */
export const generateEpisodeListStructuredData = (episodes: Episode[]) => ({
  '@context': 'https://schema.org',
  '@graph': episodes.map((episode) => ({
    '@type': 'PodcastEpisode',
    // Keyed on the episode URL: bonus episodes have no number, so a
    // number-derived @id would collide between them.
    '@id': episode.url,
    ...(episode.number ? { episodeNumber: episode.number } : {}),
    name: episode.title,
    description: episode.summary,
    url: episode.url,
    image: episode.image ?? `${SITE_URL}/logo.png`,
    datePublished: toIsoDate(episode.pubDate),
    inLanguage: 'en',
    partOfSeries: { '@id': PODCAST_ID },
    author: hostRefs,
  })),
})

const courseUrl = (course: Course) => `${SITE_URL}/courses/${course.slug}`

const courseEntity = (course: Course) => ({
  '@type': 'Course',
  '@id': `${courseUrl(course)}#course`,
  name: course.title,
  description: course.summary ?? course.tagline,
  url: courseUrl(course),
  inLanguage: 'en',
  provider: { '@id': ORGANIZATION_ID },
  ...(course.image ? { image: `${SITE_URL}${course.image}` } : {}),
  ...(course.level ? { educationalLevel: course.level } : {}),
  // Courses run as live online cohorts, so each one has a dated instance rather
  // than being self-paced. Only emitted once the dates are known.
  ...(course.startDate
    ? {
        hasCourseInstance: [
          {
            '@type': 'CourseInstance',
            courseMode: 'Online',
            startDate: course.startDate,
            ...(course.duration ? { courseWorkload: course.duration } : {}),
          },
        ],
      }
    : {}),
})

/** The courses index: one ItemList pointing at each course page. */
export const generateCourseListStructuredData = (courses: Course[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/courses#courses`,
  name: 'My Data Guest courses',
  itemListElement: courses.map((course, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: courseUrl(course),
    item: courseEntity(course),
  })),
})

/** A single course page. Placeholder courses skip this — see CourseDetail. */
export const generateCourseStructuredData = (course: Course) => ({
  '@context': 'https://schema.org',
  ...courseEntity(course),
})

function toIsoDate(value: string): string | undefined {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}
