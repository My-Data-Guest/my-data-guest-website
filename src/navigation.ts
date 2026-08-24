// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

/**
 * The header nav, shared by <Header /> and the active-section highlight.
 *
 * Most entries scroll the homepage to a section of the same id. An entry with a
 * `path` opens its own route instead — the homepage still carries a teaser
 * section with that id, so the highlight key works either way.
 */
export interface NavItem {
  id: string
  label: string
  path?: string
  /** Rendered as a button to the right of the nav rather than as a nav link. */
  cta?: boolean
}

/* Courses sits third — after the podcast, which is the proof that the teaching
   is worth paying for, and before the newsletter. */
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'podcast', label: 'Podcast' },
  { id: 'learning', label: 'Learning' },
  { id: 'about', label: 'About' },
  { id: 'courses', label: 'Courses', path: '/courses', cta: true },
]
