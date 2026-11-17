// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

declare global {
  interface Window {
    /** Defined by loadAnalytics(), so absent until the visitor has consented. */
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export const GA_TRACKING_ID = 'G-2CDQB829RL'

/** gtag.js checks this window flag before sending anything. */
const setGaDisabled = (disabled: boolean) => {
  ;(window as unknown as Record<string, boolean>)[`ga-disable-${GA_TRACKING_ID}`] = disabled
}

/**
 * Loads Google Analytics, only ever after the visitor has allowed it.
 *
 * This used to load gtag.js on every visit in Consent Mode's "denied" state.
 * That stores no cookies, but the script still runs and sends cookieless pings
 * (with the visitor's IP) to Google before anyone has answered the banner,
 * which § 25 TDDDG does not allow. Not loading it at all is the only state
 * that needs no consent.
 */
export const loadAnalytics = () => {
  setGaDisabled(false)
  if (document.getElementById('ga-loader')) return

  window.dataLayer = window.dataLayer || []
  // gtag.js expects the Arguments object itself, not an array copy.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_TRACKING_ID, { cookie_flags: 'SameSite=Lax;Secure' })

  const loader = document.createElement('script')
  loader.id = 'ga-loader'
  loader.async = true
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  document.head.appendChild(loader)
}

/**
 * For a visitor who withdraws consent after giving it: stops further hits and
 * deletes the GA cookies, on the exact host and on the registrable domain.
 */
export const disableAnalytics = () => {
  setGaDisabled(true)

  const host = window.location.hostname
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`]

  document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0].trim())
    .filter((name) => /^_(ga|gid|gat)(_|$)/.test(name))
    .forEach((name) => {
      domains.forEach((domain) => {
        const scope = domain ? `; domain=${domain}` : ''
        document.cookie = `${name}=; Max-Age=0; path=/${scope}`
      })
    })
}

/**
 * Reports a route change.
 *
 * Router navigations never reload the document, so the gtag snippet's automatic
 * page_view only ever covers the landing page. A no-op until consent.
 */
export const trackPageView = (path: string) => {
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}
