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
  /** Path relative to the site root, or an absolute URL. */
  image?: string
  audience?: string[]
  outcomes?: string[]
  modules?: CourseModule[]
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

export const COURSE_STATUS: Record<CourseStatus, { label: string; className: string }> = {
  'coming-soon': { label: 'Coming soon', className: 'tag-soon' },
  enrolling: { label: 'Enrolling now', className: 'tag-open' },
  live: { label: 'Running now', className: 'tag-live' },
}

export const COURSES: Course[] = [
  {
    slug: 'from-0-to-agentic-ai',
    title: 'From 0 to Agentic AI',
    tagline:
      'Four live weekend sessions that take you from a single LLM call to a deployed AI agent with tools, RAG and memory.',
    status: 'enrolling',
    format: 'Live on Zoom',
    summary:
      'Most “AI agent” material stops at a demo. This one does not. Over two weekends you build one real system — an AI Knowledge Assistant that searches the web, answers from your own documents, remembers the conversation and runs as a deployed app. We start from a plain model call and add one capability at a time, so you always understand why each piece exists. Sessions are on Saturday and Sunday afternoons on purpose: you should not have to burn holiday to learn this.',
    duration: '4 live lessons of 1h30, plus 2 office hours of 30 min',
    level: 'Intermediate — comfortable writing Python',
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
    audience: [
      'Engineers and data people who can write Python and want to build agents properly, not paste a framework tutorial.',
      'Anyone who has shipped a chatbot demo and hit the wall the moment it needed real tools, real data or real reliability.',
      'Working professionals — every session is on a weekend afternoon, so no holiday required.',
    ],
    outcomes: [
      'A deployed AI Knowledge Assistant you built yourself: LangGraph agent, tools, RAG over your documents, memory, and a chat UI live on the internet.',
      'The judgement to know when an agent is the right answer — and when deterministic code or a single LLM call is cheaper and better.',
      'A working mental model of the ReAct loop, and how LangGraph turns it into a state machine you can inspect and debug.',
      'Tool design you can trust: schemas, error handling and the failure modes that quietly break agents in production.',
      'RAG, context engineering and MCP as one grounding layer, so you control exactly what the model sees.',
      'Tracing and evaluation with LangSmith, so you can answer "what did my agent actually do?".',
    ],
    modules: [
      {
        kind: 'lesson',
        label: 'Lesson 1',
        date: '2026-09-26',
        time: '15:00–16:30 CET',
        title: 'From LLMs to agents, and the ReAct loop',
        description:
          'When an agent is the right tool and when it is expensive overkill. Then we grow a plain model call into something that can remember, act and loop — and write the ReAct loop by hand, so nothing later is magic.',
        topics: ['Why agentic AI', 'Deterministic vs. LLM vs. agent', 'Tool calling', 'ReAct from scratch'],
      },
      {
        kind: 'lesson',
        label: 'Lesson 2',
        date: '2026-09-27',
        time: '15:00–16:30 CET',
        title: 'LangGraph: the agent as a state machine',
        description:
          'Why a graph beats a linear chain. Nodes, edges, conditional routing and shared state — then your first real agent graph, and the start of the Knowledge Assistant you keep building all course.',
        topics: ['Graphs vs. chains', 'State, nodes, edges', 'Conditional routing', 'Knowledge Assistant v1'],
      },
      {
        kind: 'office-hour',
        label: 'Office hour',
        date: '2026-09-30',
        time: '15:00–15:30 CET',
        title: 'Midweek office hour',
        description:
          'Bring your homework and whatever broke. Half an hour, cameras optional, no question too small.',
      },
      {
        kind: 'lesson',
        label: 'Lesson 3',
        date: '2026-10-03',
        time: '15:00–16:30 CET',
        title: 'Tools, and the knowledge layer',
        description:
          'Tools are the hands of the agent — we design them to be reliable, not just callable. Then the grounding layer: RAG over real documents, context engineering, memory across sessions, and MCP servers for everything you did not write yourself.',
        topics: ['Reliable tool design', 'RAG pipeline', 'Context engineering', 'Memory', 'MCP servers'],
      },
      {
        kind: 'lesson',
        label: 'Lesson 4',
        date: '2026-10-04',
        time: '15:00–16:30 CET',
        title: 'Multi-agent, and shipping it',
        description:
          'When one agent is not enough, and how to split responsibility without inventing complexity. Then we make it real: a Streamlit chat UI, tracing and evaluation in LangSmith, and a live deployment.',
        topics: ['Supervisor pattern', 'Streamlit chat UI', 'LangSmith tracing & eval', 'Deploy to Render'],
      },
      {
        kind: 'office-hour',
        label: 'Office hour',
        date: '2026-10-07',
        time: '15:00–15:30 CET',
        title: 'Closing office hour',
        description:
          'Deployment troubleshooting, code review on what you built, and where to take it next.',
      },
    ],
    includes: [
      'Every notebook, slide deck and homework — yours to keep, forever, after the course ends.',
      'The full Knowledge Assistant codebase, including the finished reference solution.',
      'Two live office hours between the lessons, for the questions that only show up once you start building.',
      'A cohort capped at 20, so there is room for your actual problem in every session.',
    ],
    requirements: {
      callout:
        'Please get a working Python environment set up before the first session. Setting one up is step one of Lesson 1, but ninety minutes are far better spent building than installing — come prepared and you will get much more out of the course.',
      items: [
        'Python on your own machine, and the ability to install packages into an environment you create. Any package manager works; we use uv, and it will save you the most time.',
        'Enough Python to read and edit a script. No prior experience with LangChain, LangGraph or any agent framework is needed.',
        'Zoom, and an editor you are comfortable in — VS Code, Cursor, PyCharm and Jupyter are all fine.',
      ],
      provided:
        'Everything else comes with the course, including OpenAI API keys for the lessons. There is nothing to buy and no billing to set up.',
    },
    stripeBuyButtonId: 'buy_btn_1U81fuIK7YpsRNbyiakzTDwN',
    // The fallback if Stripe's script is blocked: the same channel as the
    // "Get in touch" call to action on the About page.
    registrationUrl: 'https://www.linkedin.com/company/my-data-guest',
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
