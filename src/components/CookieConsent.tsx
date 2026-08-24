// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { useCallback, useEffect, useState } from 'react'
import { grantAnalyticsConsent, denyAnalyticsConsent } from '../utils/analytics'
import { onOpenCookiePreferences, readConsent, writeConsent } from '../utils/cookiePreferences'
import './CookieConsent.css'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (!readConsent()) setShowBanner(true)

    return onOpenCookiePreferences(() => {
      setShowDetails(true)
      setShowBanner(true)
    })
  }, [])

  const save = useCallback((analytics: boolean) => {
    writeConsent(analytics)

    if (analytics) {
      grantAnalyticsConsent()
    } else {
      denyAnalyticsConsent()
    }

    setShowBanner(false)
    setShowDetails(false)
  }, [])

  useEffect(() => {
    if (!showBanner) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') save(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [showBanner, save])

  if (!showBanner) return null

  return (
    <div className="cookie-consent-overlay">
      <div
        className="cookie-consent-banner"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
      >
        {showDetails ? (
          <CookieDetails onSave={save} onBack={() => setShowDetails(false)} />
        ) : (
          <div className="cookie-consent-content">
            <div className="cookie-consent-text">
              <h3 id="cookie-consent-title">We value your privacy</h3>
              <p>
                We use cookies to understand how the site is used. Analytics cookies are optional and
                stay off until you allow them.
              </p>
            </div>
            <div className="cookie-consent-actions">
              <button className="btn-secondary" onClick={() => setShowDetails(true)}>
                Customise
              </button>
              <button className="btn-secondary" onClick={() => save(false)}>
                Reject all
              </button>
              <button className="btn-primary" onClick={() => save(true)}>
                Accept all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface CookieDetailsProps {
  onSave: (analytics: boolean) => void
  onBack: () => void
}

function CookieDetails({ onSave, onBack }: CookieDetailsProps) {
  // Reflect the visitor's current choice rather than always starting at "off".
  const [analyticsEnabled, setAnalyticsEnabled] = useState(() => readConsent()?.analytics ?? false)

  return (
    <div className="cookie-details">
      <div className="cookie-details-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h3 id="cookie-consent-title">Cookie preferences</h3>
      </div>

      <div className="cookie-details-content">
        <div className="cookie-category">
          <div className="cookie-category-header">
            <div>
              <h4>Strictly necessary</h4>
              <p>Required for the site to work. These cannot be switched off.</p>
            </div>
            <div className="toggle disabled">
              <span>Always active</span>
            </div>
          </div>
        </div>

        <div className="cookie-category">
          <div className="cookie-category-header">
            <div>
              <h4>Analytics</h4>
              <p>
                Help us see which episodes and articles people read, via Google Analytics with IP
                anonymisation enabled.
              </p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(event) => setAnalyticsEnabled(event.target.checked)}
              />
              <span className="slider" />
              <span className="visually-hidden">Allow analytics cookies</span>
            </label>
          </div>
        </div>
      </div>

      <div className="cookie-details-actions">
        <button className="btn-primary" onClick={() => onSave(analyticsEnabled)}>
          Save preferences
        </button>
      </div>
    </div>
  )
}
