// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { useEffect } from 'react'

interface JsonLdProps {
  /** Identifies this block so it can be updated in place, without touching others. */
  id: string
  data: object
}

/** Injects one <script type="application/ld+json"> block into the document head. */
const JsonLd = ({ id, data }: JsonLdProps) => {
  const json = JSON.stringify(data)

  useEffect(() => {
    const selector = `script[type="application/ld+json"][data-jsonld="${id}"]`
    let script = document.head.querySelector<HTMLScriptElement>(selector)

    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.jsonld = id
      document.head.appendChild(script)
    }
    script.textContent = json

    return () => script?.remove()
  }, [id, json])

  return null
}

export default JsonLd
