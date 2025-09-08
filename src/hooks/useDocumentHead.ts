import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  structuredData?: object | object[]
}

export const useDocumentHead = ({ 
  title = 'My Data Guest - AI Without the Hype',
  description = 'Practical insights about building with data. Real stories, honest conversations, and actionable advice from practitioners across engineering, product, and research.',
  image = '/logo.png',
  url = 'https://mydataguest.com',
  type = 'website',
  structuredData
}: SEOProps) => {
  useEffect(() => {
    const fullTitle = title.includes('My Data Guest') ? title : `${title} | My Data Guest`
    const fullImageUrl = image.startsWith('http') ? image : `https://mydataguest.com${image}`
    
    // Update document title
    document.title = fullTitle
    
    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`
      let meta = document.querySelector(selector) as HTMLMetaElement
      
      if (!meta) {
        meta = document.createElement('meta')
        if (isProperty) {
          meta.setAttribute('property', property)
        } else {
          meta.setAttribute('name', property)
        }
        document.head.appendChild(meta)
      }
      meta.content = content
    }
    
    // Helper function to update or create link tags
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement
      
      if (!link) {
        link = document.createElement('link')
        link.rel = rel
        document.head.appendChild(link)
      }
      link.href = href
    }
    
    // Basic Meta Tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', 'data engineering, AI, machine learning, podcast, analytics, data science, product management')
    updateMetaTag('author', 'Alessandro Romano, Rosaria Silipo')
    updateMetaTag('robots', 'index, follow')
    updateLinkTag('canonical', url)
    
    // Open Graph Tags
    updateMetaTag('og:title', fullTitle, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', fullImageUrl, true)
    updateMetaTag('og:url', url, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:site_name', 'My Data Guest', true)
    
    // Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', fullImageUrl)
    updateMetaTag('twitter:site', '@mydataguest')
    
    // Structured Data
    if (structuredData) {
      // Remove existing structured data scripts
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
      existingScripts.forEach(script => script.remove())
      
      // Add new structured data
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData]
      dataArray.forEach((data, index) => {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.text = JSON.stringify(data)
        script.id = `structured-data-${index}`
        document.head.appendChild(script)
      })
    }
    
    // Cleanup function to remove added elements when component unmounts
    return () => {
      // We don't need to clean up meta tags as they'll be replaced by other pages
      // But we should clean up structured data scripts
      const scripts = document.querySelectorAll('script[id^="structured-data-"]')
      scripts.forEach(script => script.remove())
    }
  }, [title, description, image, url, type, structuredData])
}