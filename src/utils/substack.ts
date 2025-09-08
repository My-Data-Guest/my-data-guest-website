export type SubstackPost = {
  title: string
  description: string
  link: string
  pubDate: string
  image?: string
}

export async function fetchSubstackPosts(): Promise<SubstackPost[]> {
  try {
    // Use RSS2JSON to fetch Substack RSS feed
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://mydataguest.substack.com/feed')}`)
    const data = await response.json()
    
    if (data.status !== 'ok') {
      throw new Error('Failed to fetch Substack feed')
    }
    
    const posts: SubstackPost[] = data.items.slice(0, 6).map((item: { title: string; description: string; link: string; pubDate: string; thumbnail?: string; enclosure?: { link?: string }; content?: string }) => {
      // Clean up description and truncate
      const cleanDescription = item.description
        .replace(/<[^>]*>/g, '')
        .replace(/&[^;]+;/g, ' ')
        .trim()
      
      const description = cleanDescription.length > 200 
        ? cleanDescription.substring(0, 200) + '...'
        : cleanDescription
      
      return {
        title: item.title,
        description: description,
        link: item.link,
        pubDate: item.pubDate,
        image: item.thumbnail || item.enclosure?.link || item.content?.match(/<img[^>]+src="([^">]+)"/)?.[1]
      }
    })
    
    return posts
    
  } catch (error) {
    console.error('Failed to fetch Substack posts:', error)
    // Fallback content
    return [
      {
        title: 'Welcome to My Data Guest',
        description: 'Explore practical insights about building with data. Real stories, honest conversations, and actionable advice from practitioners across engineering, product, and research.',
        link: 'https://mydataguest.substack.com/',
        pubDate: new Date().toISOString()
      }
    ]
  }
}