// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { stripHtml, truncate } from './text'

export type Episode = {
  /** Undefined for bonus episodes, which the feed publishes without a number. */
  number?: number
  /** Full title as published, e.g. "Ep. 20 - Beyond AI Janitors". */
  title: string
  /** Title without the "Ep. N -" prefix, which the card already shows as a label. */
  displayTitle: string
  summary: string
  /** Canonical link for the episode (Spotify where the feed exposes it). */
  url: string
  pubDate: string
  image?: string
}

// Both prefixes are already shown as the card's label, so they are stripped from
// the headline: "Ep. 20 - Beyond AI Janitors" and "Bonus Episode: Time Series…".
const EPISODE_PREFIX = /^\s*(?:(?:Ep\.?|Episode)\s*\d+|Bonus\s+Episode)\s*[-–—:]\s*/i

const PODCAST_FEED = 'https://api.substack.com/feed/podcast/6037963.rss'

// GitHub Pages serves static files only, so the feed is proxied through
// rss2json, which sends the CORS headers Substack's feed does not.
const RSS_TO_JSON = 'https://api.rss2json.com/v1/api.json?rss_url='

type FeedItem = {
  title: string
  description: string
  link: string
  pubDate: string
  thumbnail?: string
}

const FALLBACK_EPISODES: Episode[] = [
  {
    number: 0,
    title: 'Ep. 0 - The new "My Data Guest"',
    displayTitle: 'The new "My Data Guest"',
    summary:
      'The new "My Data Guest" is more than just a podcast — it\'s a learning experience, and a space to explore AI and data science together.',
    url: 'https://podcasters.spotify.com/pod/show/pigna19908/episodes/Ep--0---The-new-My-Data-Guest-e37lf9t',
    pubDate: '2025-08-25T00:00:00.000Z',
  },
]

export async function fetchEpisodes(): Promise<Episode[]> {
  try {
    const response = await fetch(`${RSS_TO_JSON}${encodeURIComponent(PODCAST_FEED)}`)
    if (!response.ok) throw new Error(`Feed request failed with ${response.status}`)

    const data = await response.json()
    if (data.status !== 'ok' || !Array.isArray(data.items)) {
      throw new Error('Unexpected feed payload')
    }

    const items = data.items as FeedItem[]

    return items
      .map((item) => {
        // Feed titles arrive HTML-encoded, so "Human Skills &amp; AI" has to be
        // decoded before it reaches the page.
        const title = stripHtml(item.title ?? '')
        const numberMatch = title.match(/(?:Ep\.?\s*|Episode\s*)(\d+)/i)
        const spotifyMatch = item.description?.match(/https:\/\/[^\s"']*spotify[^\s"']*/i)

        return {
          number: numberMatch ? Number(numberMatch[1]) : undefined,
          title,
          displayTitle: title.replace(EPISODE_PREFIX, ''),
          summary: truncate(stripHtml(item.description ?? ''), 180),
          url: spotifyMatch?.[0] ?? item.link,
          pubDate: item.pubDate,
          image: item.thumbnail || data.feed?.image,
        }
      })
      // Newest first. Sorting on the date rather than the number keeps unnumbered
      // bonus episodes in their true chronological place.
      .sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate))
  } catch (error) {
    console.error('Failed to fetch episodes:', error)
    return FALLBACK_EPISODES
  }
}
