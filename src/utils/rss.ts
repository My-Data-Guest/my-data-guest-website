export type Episode = {
  number: number
  title: string
  summary: string
  links: { spotify?: string; apple?: string; youtube?: string }
  pubDate: string
  image?: string
}

export async function fetchEpisodes(): Promise<Episode[]> {
  try {
    // For GitHub Pages hosting, we'll use RSS2JSON service which supports CORS
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://anchor.fm/s/108aca4c8/podcast/rss')}`)
    const data = await response.json()
    
    if (data.status !== 'ok') {
      throw new Error('Failed to fetch RSS feed')
    }
    
    const episodes: Episode[] = data.items.map((item: { title: string; description: string; link: string; pubDate: string; enclosure?: { url?: string }; thumbnail?: string }, index: number) => {
      // Extract episode number from title if available
      const episodeMatch = item.title.match(/(?:Ep\.?\s*|Episode\s*)(\d+)/i)
      const episodeNumber = episodeMatch ? parseInt(episodeMatch[1]) : data.items.length - index
      
      // Clean up description and truncate
      const cleanDescription = item.description
        .replace(/<[^>]*>/g, '')
        .replace(/&[^;]+;/g, ' ')
        .trim()
      
      // Keep only first sentence or about 100 characters, whichever is shorter
      const sentences = cleanDescription.split(/[.!?]+/)
      const firstSentence = sentences[0]?.trim()
      const summary = firstSentence && firstSentence.length > 20 && firstSentence.length < 120 
        ? firstSentence + '.'
        : cleanDescription.substring(0, 100).trim() + (cleanDescription.length > 100 ? '...' : '')
      
      // Extract links from description or use the main link
      const spotifyMatch = item.description.match(/https:\/\/[^\s"]*spotify[^\s"]*/i)
      
      return {
        number: episodeNumber,
        title: item.title,
        summary: summary,
        links: {
          spotify: spotifyMatch ? spotifyMatch[0] : item.link,
          apple: undefined,
          youtube: undefined
        },
        pubDate: item.pubDate,
        image: item.thumbnail || data.feed.image
      }
    })
    
    // Sort by episode number descending
    return episodes.sort((a, b) => b.number - a.number)
    
  } catch (error) {
    console.error('Failed to fetch episodes:', error)
    // Fallback to hardcoded episodes based on the RSS feed
    return [
      {
        number: 0,
        title: 'Ep. 0 - The new "My Data Guest"',
        summary: 'The new "My Data Guest" is more than just a podcast – it\'s a learning experience. We\'re building a space to explore AI and Data Science...',
        links: {
          spotify: 'https://podcasters.spotify.com/pod/show/pigna19908/episodes/Ep--0---The-new-My-Data-Guest-e37lf9t',
        },
        pubDate: new Date().toISOString(),
        image: undefined
      }
    ]
  }
}