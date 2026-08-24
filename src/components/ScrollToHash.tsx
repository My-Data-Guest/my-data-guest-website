// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Renders nothing; restores the scroll position on navigation.
 *
 * A router navigation never reloads the document, so the browser does not act on
 * the URL fragment — arriving at `/#podcast` from a course page would otherwise
 * leave you halfway down the page you came from. Mounted after <main /> so the
 * new route's DOM already exists when this effect runs.
 */
const ScrollToHash = () => {
  const { pathname, hash, key } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    const isInitialLoad = isFirstRender.current
    isFirstRender.current = false

    if (!hash) {
      // On a reload the browser restores the previous offset itself, so only a
      // navigation should reset the position.
      if (!isInitialLoad) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    // rAF, not a direct call: images and feeds mount in the same frame and the
    // target's offset is only final once the browser has laid them out.
    const frame = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    })

    return () => cancelAnimationFrame(frame)
    // `key` changes even when the URL repeats, so re-clicking a link still scrolls.
  }, [pathname, hash, key])

  return null
}

export default ScrollToHash
