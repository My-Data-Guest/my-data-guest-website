// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

declare global {
  interface Window {
    /** Defined by the gtag bootstrap snippet, so absent until it has run. */
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export const GA_TRACKING_ID = 'G-2CDQB829RL'

/**
 * Loads Google Analytics in "denied by default" mode (Consent Mode v2).
 *
 * Nothing is stored until grantAnalyticsConsent() runs, so the script can load
 * before the visitor has answered the cookie banner.
 */
export const initializeGAWithConsent = () => {
  if (document.getElementById('ga-loader')) return

  const loader = document.createElement('script')
  loader.id = 'ga-loader'
  loader.async = true
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  document.head.appendChild(loader)

  const config = document.createElement('script')
  config.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
      wait_for_update: 500,
    });

    gtag('config', '${GA_TRACKING_ID}', {
      anonymize_ip: true,
      cookie_flags: 'SameSite=Lax;Secure'
    });
  `
  document.head.appendChild(config)
}

export const grantAnalyticsConsent = () => {
  window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
}

/**
 * Reports a route change.
 *
 * Router navigations never reload the document, so the gtag snippet's automatic
 * page_view only ever covers the landing page.
 */
export const trackPageView = (path: string) => {
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export const denyAnalyticsConsent = () => {
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
}
