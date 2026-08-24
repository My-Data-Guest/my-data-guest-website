// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

export const CONSENT_KEY = 'cookie-consent'

export type StoredConsent = { necessary: true; analytics: boolean; timestamp: number }

export const readConsent = (): StoredConsent | null => {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    return raw ? (JSON.parse(raw) as StoredConsent) : null
  } catch {
    localStorage.removeItem(CONSENT_KEY)
    return null
  }
}

export const writeConsent = (analytics: boolean) => {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ necessary: true, analytics, timestamp: Date.now() } satisfies StoredConsent)
  )
}

const OPEN_PREFERENCES_EVENT = 'mdg:open-cookie-preferences'

/** Lets the footer reopen the banner after a choice has already been made. */
export const openCookiePreferences = () => {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))
}

export const onOpenCookiePreferences = (listener: () => void) => {
  window.addEventListener(OPEN_PREFERENCES_EVENT, listener)
  return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, listener)
}
