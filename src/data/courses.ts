// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

// The course catalogue.
//
// Courses are content, not code: everything the section, the index page and the
// detail page render comes from here. Adding a course means adding an entry —
// every field except the first five is optional, and the detail page simply
// leaves out the blocks it has no data for.

export type CourseStatus = 'coming-soon' | 'enrolling' | 'live'

/**
 * One entry in the programme.
 *
 * A self-paced course fills in title/description and nothing else. A live cohort
 * also carries the call it is taught in — `label`, `date`, `time` — and the
 * detail page then renders the programme as a dated schedule instead of a plain
 * numbered list. `kind` only distinguishes the softer, shorter office hours.
 */
export interface CourseModule {
  title: string
  description?: string
  kind?: 'lesson' | 'office-hour'
  /** Short badge, e.g. 'Lesson 1' or 'Office hour'. Replaces the number. */
  label?: string
  /** ISO date (YYYY-MM-DD) of the live call. */
  date?: string
  /** Local time range as taught, e.g. '15:00–16:30 CET'. */
  time?: string
  /** The concrete things covered, shown as chips under the description. */
  topics?: string[]
}

export interface Course {
  /**
   * URL segment: /courses/<slug>. Avoid changing it once a course is announced —
   * and if you must, move the old value into `previousSlugs` so the address that
   * went out in the newsletter keeps working.
   */
  slug: string
  /**
   * Slugs this course used to live at.
   *
   * The site is static, so there is no server to issue a 301: CourseDetail
   * redirects these to the canonical URL on the client instead. Keep them
   * forever — they cost one array entry, and the alternative is a paying
   * visitor landing on the catalogue wondering where the course went.
   */
  previousSlugs?: string[]
  title: string
  /** One line, used on the cards and as the detail-page lead. */
  tagline: string
  status: CourseStatus
  /** e.g. 'Online, live' — shown as a fact on the card and the detail page. */
  format?: string
  /** Longer intro paragraph on the detail page. */
  summary?: string
  /**
   * The scope boundary, set out before anyone pays.
   *
   * A course that covers the whole path to production necessarily gives each
   * component one pass rather than a deep dive. Someone who enrolled expecting a
   * fortnight on RAG alone would be right to feel misled, so the limit is stated
   * next to the promise instead of being discovered in Lesson 3.
   */
  scope?: { is: string; isNot: string }
  duration?: string
  level?: string
  /** Practice between sessions, so the real time commitment is not a surprise. */
  homework?: string
  language?: string
  price?: string
  /** Numeric price and currency, for the schema.org Offer. Keep in step with `price`. */
  priceAmount?: number
  priceCurrency?: string
  /** The discount line under the price in the enrolment card. */
  priceNote?: string
  /** Cohort cap. Shown as a fact, and it is the scarcity argument for enrolling. */
  seats?: number
  /** ISO date (YYYY-MM-DD) of the first session. */
  startDate?: string
  /** ISO date (YYYY-MM-DD) of the last session, when the run is bounded. */
  endDate?: string
  /**
   * Last day enrolment is accepted (ISO YYYY-MM-DD), inclusive.
   *
   * A cohort needs a cut-off: people have to install Python, the group has to be
   * known, and a seat sold the night before Lesson 1 serves nobody. Setting this
   * puts the date on the page as a deadline banner and — once it passes —
   * withdraws checkout entirely rather than taking money for a course that has
   * already started. See `isEnrolmentClosed`.
   */
  enrolmentDeadline?: string
  /** Path relative to the site root, or an absolute URL. */
  image?: string
  audience?: string[]
  outcomes?: string[]
  /**
   * The tools, as chips near the top. The stack is otherwise only discoverable by
   * reading the whole programme, and someone deciding whether this course fits
   * their week needs to see "LangGraph" in the first five seconds — including so
   * they can rule it out.
   */
  stack?: string[]
  modules?: CourseModule[]
  /** Who teaches it. A paid offer needs a name and a reason to trust it, on the page. */
  instructor?: {
    name: string
    role: string
    bio: string
    /** Filename in public/, e.g. 'alessandro.jpg'. */
    photo?: string
    links?: { href: string; label: string }[]
  }
  /** What you keep afterwards — the answer to "and then what?". */
  includes?: string[]
  /** What to have ready before the first session. Rendered as a highlighted block. */
  requirements?: {
    /** Emphasised above the list: the thing people skip and then regret. */
    callout: string
    items: string[]
    /** What not to worry about, so the list does not read as a barrier. */
    provided?: string
  }
  /** What happens between paying and the first session. Shown under the button. */
  afterPurchase?: string
  /** The refund terms, in one line. Shown under the button. */
  refundPolicy?: string
  /** Where "Enrol" points. Until it exists the page offers the newsletter instead. */
  registrationUrl?: string
  /**
   * Stripe Buy Button id. When set, checkout is embedded and `registrationUrl`
   * becomes the fallback for visitors whose browser blocks Stripe's script.
   */
  stripeBuyButtonId?: string
  /** Label for the enrolment button, when "Enrol now" is not the right verb. */
  registrationLabel?: string
}

/**
 * The badge as shown, which is not always the stored status: an enrolling course
 * whose deadline has passed is closed, and nothing needs to be edited by hand on
 * the day for the site to say so. See `displayStatus`.
 */
export type DisplayStatus = CourseStatus | 'closed'

export const COURSE_STATUS: Record<DisplayStatus, { label: string; className: string }> = {
  'coming-soon': { label: 'Coming soon', className: 'tag-soon' },
  enrolling: { label: 'Enrolling now', className: 'tag-open' },
  live: { label: 'Running now', className: 'tag-live' },
  closed: { label: 'Enrolment closed', className: 'tag-closed' },
}

export const COURSES: Course[] = [
  {
    slug: 'agentic-ai-from-idea-to-production',
    // Renamed from "From 0 to Agentic AI", whose URL is already in the newsletter
    // and on LinkedIn. It redirects here rather than 404ing.
    previousSlugs: ['from-0-to-agentic-ai'],
    title: 'Agentic AI: From Idea to Production',
    tagline:
      'Four live weekend sessions that take you from a single LLM call to a deployed AI agent with tools, RAG and memory.',
    status: 'enrolling',
    format: 'Live on Zoom',
    summary:
      'Most “AI agent” material stops at a demo. This one does not. Over two weekends you build one real system — an AI Knowledge Assistant that searches the web, answers from your own documents, remembers the conversation and runs as a deployed app. We start from a plain model call and add one capability at a time, so you always understand why each piece exists. Lessons are on Saturday and Sunday afternoons on purpose: you should not have to burn holiday to learn this.',
    scope: {
      is: 'A guided path from zero to something running in production. You meet every component an agent actually needs — the ReAct loop, LangGraph, tools, RAG, memory, MCP, tracing, deployment — and you leave with all of them working together in one system you built yourself.',
      isNot: 'A deep dive into any single one of those components. There is a fortnight of material in RAG alone, and here it gets one focused pass: enough to build it, ground it and know what to read next. If you want that depth rather than the whole path, this is the wrong course — and better you know it before you pay than in Lesson 3.',
    },
    duration: '4 live lessons of 1h30, plus 2 office hours of 30 min',
    level: 'Intermediate — you write Python comfortably',
    homework: 'About 2 hours of practice',
    language: 'English',
    price: '€300',
    priceAmount: 300,
    priceCurrency: 'EUR',
    // The claim step is manual on purpose: the email is checked against the
    // Substack subscriber list before a code goes out.
    priceNote:
      '€225 for annual paying subscribers to the My Data Guest Substack — 25% off. Tell us the email address you subscribed with and we’ll send you a discount code.',
    seats: 20,
    startDate: '2026-09-26',
    endDate: '2026-10-07',
    // A week before Lesson 1: long enough for the setup guide to be followed and
    // for the cohort to be a known group rather than a moving target.
    enrolmentDeadline: '2026-09-19',
    audience: [
      'Engineers and data people who want to build agents properly, not paste a framework tutorial.',
      'Anyone who has shipped a chatbot demo and hit the wall the moment it needed real tools, real data or real reliability.',
      'Working professionals who would rather not spend their holiday on training.',
    ],
    outcomes: [
      'A deployed AI Knowledge Assistant you built yourself: LangGraph agent, tools, RAG over your documents, memory, and a chat UI live on the internet.',
      'The judgement to know when an agent is the right answer — and when deterministic code or a single LLM call is cheaper and better.',
      'A working mental model of the ReAct loop, and how LangGraph turns it into a state machine you can inspect and debug.',
      'Tools and grounding you can trust: schemas, error handling, RAG and context engineering, so you control what the model sees and what it is able to do.',
      'Tracing and evaluation with LangSmith, so you can answer "what did my agent actually do?".',
    ],
    // Named up front so nobody discovers the ecosystem three lessons in. It is a
    // LangChain-stack course, and someone who wants framework-agnostic should be
    // able to see that and leave.
    stack: [
      'Python',
      'LangGraph',
      'LangChain',
      'LangSmith',
      'MCP',
      'Streamlit',
      'Render',
      'OpenAI',
    ],
    modules: [
      {
        kind: 'lesson',
        label: 'Lesson 1',
        date: '2026-09-26',
        time: '15:00–16:30 CEST',
        title: 'From LLMs to agents, and the ReAct loop',
        description:
          'When an agent is the right tool and when it is expensive overkill. Then we grow a plain model call into something that can remember, act and loop — and write the ReAct loop by hand, so nothing later is magic.',
        topics: ['Why agentic AI', 'Deterministic vs. LLM vs. agent', 'Tool calling', 'ReAct from scratch'],
      },
      {
        kind: 'lesson',
        label: 'Lesson 2',
        date: '2026-09-27',
        time: '15:00–16:30 CEST',
        title: 'LangGraph: the agent as a state machine',
        description:
          'Why a graph beats a linear chain. Nodes, edges, conditional routing and shared state — and because memory is just state that survives, it lands here too. We wire up LangSmith tracing the moment the graph exists, so you spend the rest of the course able to see inside it instead of guessing. You leave with Knowledge Assistant v1.',
        topics: [
          'Graphs vs. chains',
          'State, memory and checkpoints',
          'Conditional routing',
          'Tracing with LangSmith',
          'Knowledge Assistant v1',
        ],
      },
      {
        kind: 'office-hour',
        label: 'Office hour',
        date: '2026-09-30',
        time: '15:00–15:30 CEST',
        title: 'Midweek office hour',
        description:
          'Bring your homework and whatever broke. Half an hour, cameras optional, no question too small.',
      },
      {
        kind: 'lesson',
        label: 'Lesson 3',
        date: '2026-10-03',
        time: '15:00–16:30 CEST',
        title: 'Tools, and the knowledge layer',
        description:
          'Tools are the hands of the agent — we design them to be reliable, not just callable. Then the grounding layer: RAG over real documents, context engineering, and MCP servers for everything you did not write yourself.',
        topics: ['Reliable tool design', 'RAG pipeline', 'Context engineering', 'MCP servers'],
      },
      {
        kind: 'lesson',
        label: 'Lesson 4',
        date: '2026-10-04',
        time: '15:00–16:30 CEST',
        title: 'Multi-agent, and shipping it',
        description:
          'When one agent is not enough, and how to split responsibility without inventing complexity. Then we make it real: a Streamlit chat UI, evaluation in LangSmith on top of the tracing you already have, and a live deployment.',
        topics: ['Supervisor pattern', 'Streamlit chat UI', 'Evaluation in LangSmith', 'Deploy to Render'],
      },
      {
        kind: 'office-hour',
        label: 'Office hour',
        date: '2026-10-07',
        time: '15:00–15:30 CEST',
        title: 'Closing office hour',
        description:
          'Deployment troubleshooting, code review on what you built, and where to take it next.',
      },
    ],
    includes: [
      'A recording of every session, shared with the cohort — so a weekend you cannot make is not a lesson you lose.',
      'Every notebook, slide deck and exercise — yours to keep, forever, after the course ends.',
      'The full Knowledge Assistant codebase, including the finished reference solution.',
      'Two live office hours between the lessons, for the questions that only show up once you start building.',
    ],
    instructor: {
      name: 'Alessandro Romano',
      role: 'Data Scientist / AI Engineer',
      bio: 'I build data and AI systems for a living, and I host the My Data Guest podcast and newsletter — so I spend most of my week either shipping this stuff or asking other practitioners how they ship it. This course is the material I wish I had when I built my first agent: the parts that matter, in the order they matter, without the framework tour.',
      photo: 'alessandro.jpg',
      links: [
        { href: 'https://www.aromano.dev/', label: 'Website' },
        { href: 'https://www.linkedin.com/in/alessandro-romano-1990/', label: 'LinkedIn' },
      ],
    },
    requirements: {
      callout:
        'Get a working Python environment set up before the first session. Ninety minutes are far better spent building than installing.',
      items: [
        'Python on your own machine, and the ability to install packages into an environment you create. Any package manager works; we use uv, and it will save you the most time.',
        'No prior experience with LangChain, LangGraph or any agent framework — we start from a plain model call.',
        'Zoom, and an editor you are comfortable in — VS Code, Cursor, PyCharm and Jupyter are all fine.',
      ],
      provided:
        'Everything else comes with the course, including OpenAI API keys for the lessons. There is nothing to buy and no billing to set up.',
    },
    afterPurchase:
      'You get a confirmation email within a few hours of paying, with the Zoom link, the setup guide and everything to do before Lesson 1.',
    refundPolicy:
      'If the course does not run, you get a full refund. Otherwise seats are not refundable — the cohort is capped, so a held seat is one nobody else can take.',
    stripeBuyButtonId: 'buy_btn_1U81fuIK7YpsRNbyiakzTDwN',
    // The fallback if Stripe's script is blocked: the same channel as the
    // "Get in touch" call to action on the About page.
    registrationUrl: 'https://www.linkedin.com/company/my-data-guest',
  },
]

export const coursePath = (course: Course) => `/courses/${course.slug}`

export const getCourse = (slug: string) => COURSES.find((course) => course.slug === slug)

/** The course a retired URL used to point at, so it can be redirected. */
export const getRenamedCourse = (slug: string) =>
  COURSES.find((course) => course.previousSlugs?.includes(slug))

/**
 * The instant enrolment closes: the end of the deadline day, as lived by the
 * instructor.
 *
 * Pinned to +02:00 rather than the visitor's clock so the door shuts at the same
 * moment for everyone — otherwise "closes on the 19th" would mean eleven hours
 * later in Los Angeles than in Berlin, and someone would pay for a seat after
 * the cohort was settled. The course is taught in CEST, so that is the offset the
 * deadline is written in.
 */
const enrolmentClosesAt = (course: Course) =>
  course.enrolmentDeadline ? new Date(`${course.enrolmentDeadline}T23:59:59+02:00`) : undefined

/**
 * Whether the deadline has passed.
 *
 * The site is static, so this is decided by the visitor's own clock — someone
 * determined can move it and see the button again. That is fine: the button is
 * the invitation, and the real gate is the Stripe payment link, which has to be
 * deactivated in the dashboard when the cohort closes. This stops the honest
 * visitor from paying for a course that has started; it is not a security
 * boundary, and nothing here should be the only thing standing between a late
 * payment and a refund.
 */
export const isEnrolmentClosed = (course: Course, now: Date = new Date()): boolean => {
  const closes = enrolmentClosesAt(course)
  return closes ? now.getTime() > closes.getTime() : false
}

/**
 * Whole days left to enrol — 0 on the final day, undefined once it has passed.
 *
 * Counting from the closing instant rather than between calendar dates, so "1 day
 * left" means roughly a day of real time and not "some time tomorrow, maybe".
 */
export const daysUntilEnrolmentCloses = (
  course: Course,
  now: Date = new Date()
): number | undefined => {
  const closes = enrolmentClosesAt(course)
  if (!closes) return undefined

  const remaining = closes.getTime() - now.getTime()
  return remaining < 0 ? undefined : Math.floor(remaining / 86_400_000)
}

/**
 * The badge to render.
 *
 * Only `enrolling` is rewritten: a course that is `live` has of course stopped
 * taking enrolments, but "Running now" is the more useful thing to say about it,
 * and a `coming-soon` course has no deadline to pass.
 */
export const displayStatus = (course: Course): DisplayStatus =>
  course.status === 'enrolling' && isEnrolmentClosed(course) ? 'closed' : course.status

/** The facts strip: label/value pairs a course actually has, in a fixed order. */
export const courseFacts = (course: Course): [string, string][] =>
  (
    [
      ['Format', course.format],
      ['Duration', course.duration],
      ['Between sessions', course.homework],
      ['Cohort', course.seats ? `${course.seats} seats max` : undefined],
      ['Level', course.level],
      ['Language', course.language],
      ['Price', course.price],
    ] as [string, string | undefined][]
  ).filter((entry): entry is [string, string] => Boolean(entry[1]))

/**
 * The short version, for the cards.
 *
 * Cards render facts as chips, and the detail-page values are written as prose
 * ("4 live lessons of 1h30, plus…") — long enough to wrap a card into a wall of
 * grey. So the chips are only the three facts that drive the click: where it
 * happens, how small the group is, what it costs.
 */
export const courseChips = (course: Course): string[] =>
  [
    course.format,
    course.seats ? `${course.seats} seats` : undefined,
    course.price,
  ].filter((value): value is string => Boolean(value))

/** Whether the programme is a set of dated live calls rather than plain modules. */
export const isScheduled = (course: Course) =>
  Boolean(course.modules?.some((module) => module.date))
