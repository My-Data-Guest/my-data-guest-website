import { useState, useEffect } from 'react';
import { grantAnalyticsConsent, denyAnalyticsConsent } from '../utils/analytics';
import './CookieConsent.css';

const CONSENT_KEY = 'cookie-consent';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    }
    
    // For testing - log current consent status
    console.log('Cookie consent status:', consent ? JSON.parse(consent) : 'No consent stored');
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      necessary: true,
      analytics: true,
      timestamp: Date.now()
    }));
    grantAnalyticsConsent();
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      necessary: true,
      analytics: false,
      timestamp: Date.now()
    }));
    denyAnalyticsConsent();
    setShowBanner(false);
  };

  const handleSavePreferences = (analytics: boolean) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      necessary: true,
      analytics,
      timestamp: Date.now()
    }));
    
    if (analytics) {
      grantAnalyticsConsent();
    } else {
      denyAnalyticsConsent();
    }
    
    setShowBanner(false);
    setShowDetails(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-banner">
        {!showDetails ? (
          <>
            <div className="cookie-consent-content">
              <div className="cookie-consent-text">
                <h3>We value your privacy</h3>
                <p>
                  We use cookies to enhance your browsing experience and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies for analytics purposes.
                </p>
              </div>
              <div className="cookie-consent-actions">
                <button 
                  className="btn-secondary" 
                  onClick={() => setShowDetails(true)}
                >
                  Customize
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={handleRejectAll}
                >
                  Reject All
                </button>
                <button 
                  className="btn-primary" 
                  onClick={handleAcceptAll}
                >
                  Accept All
                </button>
              </div>
            </div>
          </>
        ) : (
          <CookieDetails onSave={handleSavePreferences} onBack={() => setShowDetails(false)} />
        )}
      </div>
    </div>
  );
}

interface CookieDetailsProps {
  onSave: (analytics: boolean) => void;
  onBack: () => void;
}

function CookieDetails({ onSave, onBack }: CookieDetailsProps) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  return (
    <div className="cookie-details">
      <div className="cookie-details-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h3>Cookie Preferences</h3>
      </div>
      
      <div className="cookie-details-content">
        <div className="cookie-category">
          <div className="cookie-category-header">
            <div>
              <h4>Strictly Necessary Cookies</h4>
              <p>These cookies are essential for the website to function properly.</p>
            </div>
            <div className="toggle disabled">
              <span>Always Active</span>
            </div>
          </div>
        </div>

        <div className="cookie-category">
          <div className="cookie-category-header">
            <div>
              <h4>Analytics Cookies</h4>
              <p>
                These cookies help us understand how visitors interact with our website 
                by collecting and reporting information anonymously via Google Analytics.
              </p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="cookie-details-actions">
        <button 
          className="btn-primary"
          onClick={() => onSave(analyticsEnabled)}
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}