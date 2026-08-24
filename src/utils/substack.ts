// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { stripHtml, truncate } from './text'

export type SubstackPost = {
  title: string
  description: string
  link: string
  pubDate: string
  image?: string
}

const NEWSLETTER_FEED = 'https://mydataguest.substack.com/feed'
const RSS_TO_JSON = 'https://api.rss2json.com/v1/api.json?rss_url='
const MAX_POSTS = 6

type FeedItem = {
  title: string
  description: string
  link: string
  pubDate: string
  thumbnail?: string
  enclosure?: { link?: string; type?: string }
  content?: string
}

/**
 * Substack sends `thumbnail: ""` for audio posts and puts the MP3 in `enclosure`,
 * so the enclosure is only usable when it actually declares an image type —
 * otherwise the card ends up with an <img> pointing at an audio file.
 */
function resolveImage(item: FeedItem): string | undefined {
  if (item.thumbnail) return item.thumbnail
  if (item.enclosure?.link && item.enclosure.type?.startsWith('image/')) {
    return item.enclosure.link
  }
  return item.content?.match(/<img[^>]+src="([^">]+)"/)?.[1]
}

const FALLBACK_POSTS: SubstackPost[] = [
  {
    title: 'Welcome to My Data Guest',
    description:
      'Practical insights about building with data and AI — real stories, honest conversations, and actionable advice from practitioners across engineering, product and research.',
    link: 'https://mydataguest.substack.com/',
    pubDate: '2025-08-25T00:00:00.000Z',
  },
]

export async function fetchSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const response = await fetch(`${RSS_TO_JSON}${encodeURIComponent(NEWSLETTER_FEED)}`)
    if (!response.ok) throw new Error(`Feed request failed with ${response.status}`)

    const data = await response.json()
    if (data.status !== 'ok' || !Array.isArray(data.items)) {
      throw new Error('Unexpected feed payload')
    }

    return (data.items as FeedItem[]).slice(0, MAX_POSTS).map((item) => ({
      title: stripHtml(item.title ?? ''),
      description: truncate(stripHtml(item.description ?? ''), 180),
      link: item.link,
      pubDate: item.pubDate,
      image: resolveImage(item),
    }))
  } catch (error) {
    console.error('Failed to fetch Substack posts:', error)
    return FALLBACK_POSTS
  }
}
