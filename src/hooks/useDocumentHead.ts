// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { useEffect } from 'react'
import { SITE_URL } from '../utils/structuredData'

export interface DocumentHeadOptions {
  title: string
  description: string
  /** Absolute URL, or a path relative to the site root. */
  image?: string
  imageAlt?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  /** Keeps thin or placeholder pages out of the index without hiding the links. */
  noindex?: boolean
}

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  const selector = `meta[${attr}="${key}"]`
  let meta = document.head.querySelector<HTMLMetaElement>(selector)

  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attr, key)
    document.head.appendChild(meta)
  }
  meta.content = content
}

const setCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = href
}

/**
 * Keeps the document title, meta description and social-card tags in sync.
 *
 * Structured data is deliberately not handled here — see <JsonLd /> — so that
 * each block can be updated independently instead of the last render winning.
 */
export const useDocumentHead = ({
  title,
  description,
  image = '/og-image.png',
  imageAlt = 'My Data Guest — AI Without the Hype',
  url = `${SITE_URL}/`,
  type = 'website',
  noindex = false,
}: DocumentHeadOptions) => {
  useEffect(() => {
    const fullTitle = title.includes('My Data Guest') ? title : `${title} | My Data Guest`
    const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

    document.title = fullTitle

    setMeta('name', 'description', description)
    setMeta('name', 'author', 'Alessandro Romano, Rosaria Silipo')
    setMeta(
      'name',
      'robots',
      noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'
    )
    setCanonical(url)

    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:image', imageUrl)
    setMeta('property', 'og:image:alt', imageAlt)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:site_name', 'My Data Guest')
    setMeta('property', 'og:locale', 'en_US')

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', imageUrl)
    setMeta('name', 'twitter:image:alt', imageAlt)
  }, [title, description, image, imageAlt, url, type, noindex])
}
