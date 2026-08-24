// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  hellip: '…',
  mdash: '—',
  ndash: '–',
  lsquo: '‘',
  rsquo: '’',
  ldquo: '“',
  rdquo: '”',
}

/**
 * Turns a feed's HTML description into plain text.
 *
 * Entities are decoded rather than blanked out, so "R&amp;D" stays "R&D"
 * instead of becoming "R D".
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name: string) => ENTITIES[name.toLowerCase()] ?? match)
    .replace(/\s+/g, ' ')
    .trim()
}

/** Truncates on a word boundary and appends an ellipsis. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text

  const clipped = text.slice(0, maxLength)
  const lastSpace = clipped.lastIndexOf(' ')
  return `${(lastSpace > maxLength * 0.6 ? clipped.slice(0, lastSpace) : clipped).replace(/[\s,;:.]+$/, '')}…`
}

/** e.g. "12 Mar 2026"; returns undefined for unparseable dates. */
export function formatDate(value: string, options?: Intl.DateTimeFormatOptions): string | undefined {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined

  return date.toLocaleDateString('en-GB', options ?? { day: 'numeric', month: 'short', year: 'numeric' })
}
