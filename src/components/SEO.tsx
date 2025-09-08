import { useDocumentHead } from '../hooks/useDocumentHead'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  structuredData?: object | object[]
}

const SEO = ({ 
  title = 'My Data Guest - AI Without the Hype',
  description = 'Practical insights about building with data. Real stories, honest conversations, and actionable advice from practitioners across engineering, product, and research.',
  image = '/logo.png',
  url = 'https://mydataguest.com',
  type = 'website',
  structuredData
}: SEOProps) => {
  useDocumentHead({
    title,
    description,
    image,
    url,
    type,
    structuredData
  })
  
  return null
}

export default SEO