import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  structuredData?: object
}

const SEO = ({ 
  title = 'My Data Guest - AI Without the Hype',
  description = 'Practical insights about building with data. Real stories, honest conversations, and actionable advice from practitioners across engineering, product, and research.',
  image = '/logo.png',
  url = 'https://mydataguest.com',
  type = 'website',
  structuredData
}: SEOProps) => {
  const fullTitle = title.includes('My Data Guest') ? title : `${title} | My Data Guest`
  const fullImageUrl = image.startsWith('http') ? image : `https://mydataguest.com${image}`
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="data engineering, AI, machine learning, podcast, analytics, data science, product management" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="My Data Guest" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@mydataguest" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="Alessandro Romano, Rosaria Silipo" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="en" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO