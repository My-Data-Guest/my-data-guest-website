// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { useEffect, useState } from 'react'

/**
 * Tracks which homepage section is in view, for the nav highlight.
 *
 * `enabled` is false on the standalone pages: there are no sections to observe
 * there, and the last homepage section would otherwise stay highlighted.
 */
export const useActiveSection = (enabled: boolean) => {
  const [active, setActive] = useState('home')

  useEffect(() => {
    if (!enabled) return

    const sections = document.querySelectorAll<HTMLElement>('main > section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [enabled])

  return active
}
