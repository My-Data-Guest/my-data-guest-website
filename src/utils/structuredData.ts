// Structured Data generators for SEO

export const generateOrganizationStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "My Data Guest",
  "url": "https://mydataguest.com",
  "logo": "https://mydataguest.com/logo.png",
  "description": "AI Without the Hype. Podcast, Learnings and Stories about building with data.",
  "sameAs": [
    "https://mydataguest.substack.com/",
    "https://www.linkedin.com/company/my-data-guest",
    "https://podcasters.spotify.com/pod/show/pigna19908",
    "https://www.youtube.com/@MyDataGuest1",
    "https://podcasts.apple.com/us/podcast/my-data-guest/id1837487759"
  ],
  "founder": [
    {
      "@type": "Person",
      "name": "Alessandro Romano"
    },
    {
      "@type": "Person", 
      "name": "Rosaria Silipo"
    }
  ]
})

export const generateWebsiteStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "My Data Guest",
  "url": "https://mydataguest.com",
  "description": "AI Without the Hype. Podcast, Learnings and Stories about building with data.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://mydataguest.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
})

export const generatePodcastSeriesStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  "name": "My Data Guest",
  "description": "AI Without the Hype. Real stories, honest conversations, and actionable advice from practitioners across engineering, product, and research.",
  "url": "https://mydataguest.com",
  "image": "https://mydataguest.com/logo.png",
  "author": [
    {
      "@type": "Person",
      "name": "Alessandro Romano"
    },
    {
      "@type": "Person",
      "name": "Rosaria Silipo"
    }
  ],
  "publisher": {
    "@type": "Organization",
    "name": "My Data Guest",
    "url": "https://mydataguest.com"
  },
  "webFeed": "https://mydataguest.substack.com/feed"
})

export const generatePodcastEpisodeStructuredData = (episode: {
  number: number
  title: string
  summary: string
  image?: string
  url?: string
  datePublished?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "PodcastEpisode",
  "episodeNumber": episode.number,
  "name": episode.title,
  "description": episode.summary,
  "url": episode.url || `https://mydataguest.com/episodes/${episode.number}`,
  "image": episode.image || "https://mydataguest.com/logo.png",
  "datePublished": episode.datePublished || new Date().toISOString(),
  "partOfSeries": {
    "@type": "PodcastSeries",
    "name": "My Data Guest",
    "url": "https://mydataguest.com"
  },
  "author": [
    {
      "@type": "Person",
      "name": "Alessandro Romano"
    },
    {
      "@type": "Person",
      "name": "Rosaria Silipo"
    }
  ]
})

export const generatePersonStructuredData = (person: {
  name: string
  jobTitle?: string
  description?: string
  image?: string
  sameAs?: string[]
}) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": person.name,
  "jobTitle": person.jobTitle,
  "description": person.description,
  "image": person.image,
  "sameAs": person.sameAs || [],
  "worksFor": {
    "@type": "Organization",
    "name": "My Data Guest"
  }
})

export const generateArticleStructuredData = (article: {
  title: string
  description: string
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "url": article.url,
  "image": article.image || "https://mydataguest.com/logo.png",
  "datePublished": article.datePublished || new Date().toISOString(),
  "dateModified": article.dateModified || new Date().toISOString(),
  "author": {
    "@type": "Person",
    "name": article.author || "My Data Guest Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "My Data Guest",
    "url": "https://mydataguest.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mydataguest.com/logo.png"
    }
  }
})