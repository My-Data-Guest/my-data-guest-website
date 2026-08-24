// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { useDocumentHead, type DocumentHeadOptions } from '../hooks/useDocumentHead'

/**
 * Renders nothing; syncs the document head.
 *
 * The site is a single scrolling page, so exactly one <SEO /> should be mounted
 * (in App). Mounting one per section made every section race for the same title,
 * description and canonical URL — and the last one mounted won.
 */
const SEO = (props: DocumentHeadOptions) => {
  useDocumentHead(props)
  return null
}

export default SEO
