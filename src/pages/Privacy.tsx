// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import './pages.css'
import SEO from '../components/SEO'
import OperatorAddress from '../components/OperatorAddress'
import { analyticsRetentionMonths, operator, privacyLastUpdated } from '../data/legal'
import { openCookiePreferences } from '../utils/cookiePreferences'
import { SITE_URL } from '../utils/structuredData'

/**
 * Privacy policy (GDPR Art. 13). Every third party the site talks to is
 * listed here; adding an embed, a font host, a checkout or an API means
 * adding a section.
 */
function Privacy() {
  return (
    <section className="page" aria-labelledby="privacy-title">
      <SEO
        title="Privacy policy — My Data Guest"
        description="What personal data mydataguest.com processes, why, and your rights."
        url={`${SITE_URL}/privacy`}
      />

      <div className="container legal-prose">
        <p className="eyebrow">Datenschutz</p>
        <h1 id="privacy-title" className="section-title">
          Privacy policy
        </h1>

        <p>
          This policy explains what personal data is processed when you visit mydataguest.com,
          why, and what rights you have.
        </p>

        <h2>1. Controller</h2>
        <p>The controller responsible for this website under the GDPR is:</p>
        <OperatorAddress />
        <p>
          Email: <a href={`mailto:${operator.email}`}>{operator.email}</a>
        </p>

        <h2>2. Hosting</h2>
        <p>
          This site is hosted on GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr.
          Street, San Francisco, CA 94107, USA. When you open a page, GitHub&apos;s servers
          necessarily receive your IP address and log technical request data (date and time, page
          requested, browser and operating system, referring page) to deliver the site and keep
          it secure.
        </p>
        <p>
          Legal basis: Art. 6(1)(f) GDPR. Our legitimate interest is serving the website reliably
          and securely. GitHub, Inc. is certified under the EU-US Data Privacy Framework, on which
          transfers to the USA are based (Art. 45 GDPR). Details:{' '}
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Privacy Statement
          </a>
          .
        </p>
        <p>Fonts are served from this site itself, so no font provider receives your data.</p>

        <h2>3. Storage in your browser</h2>
        <p>
          The site stores your cookie choice in your browser&apos;s local storage (
          <code>cookie-consent</code>), so the banner does not ask again on every page. It is not
          sent anywhere. Storing it is strictly necessary to provide what you asked for, so it
          needs no consent (§ 25(2) no. 2 TDDDG).
        </p>

        <h2 id="analytics">4. Google Analytics (only with your consent)</h2>
        <p>
          If, and only if, you allow analytics in the cookie banner, the site loads Google
          Analytics 4, a web analytics service of Google Ireland Limited, Gordon House, Barrow
          Street, Dublin 4, Ireland. Until then, no request is made to Google.
        </p>
        <p>
          Google Analytics sets cookies (<code>_ga</code> and <code>_ga_&lt;ID&gt;</code>, valid
          for up to 2 years) and records how the site is used: pages viewed, time on page,
          referring site, device, browser, screen size and approximate location derived from your
          IP address. We only see aggregated reports, which tell us which episodes and articles
          people find useful. Google deletes the event data after {analyticsRetentionMonths}{' '}
          months. Data may be transferred to Google LLC in the USA, which is certified under the
          EU-US Data Privacy Framework (Art. 45 GDPR).
        </p>
        <p>
          Legal basis: your consent, Art. 6(1)(a) GDPR and § 25(1) TDDDG. You can withdraw it at
          any time, with effect for the future, through the{' '}
          <button type="button" className="legal-inline-button" onClick={openCookiePreferences}>
            cookie preferences
          </button>{' '}
          (also linked in the footer of every page). Withdrawing deletes the Google Analytics
          cookies. More information:{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </a>
          .
        </p>

        <h2>5. Podcast episodes and newsletter posts</h2>
        <p>
          The podcast and newsletter sections show our latest episodes and posts. To fetch them,
          your browser requests the Substack feeds through rss2json.com (operated from the USA),
          and the cover images load from Substack&apos;s servers (Substack, Inc., USA,{' '}
          <code>substackcdn.com</code>). These providers receive your IP address and technical
          browser data as part of the request; rss2json logs it to run the service, apply rate
          limits and keep it secure. We receive no data from them.
        </p>
        <p>
          Legal basis: Art. 6(1)(f) GDPR. Our legitimate interest is showing current episodes and
          posts without maintaining a copy by hand.
        </p>

        <h2>6. Links to other sites</h2>
        <p>
          The site links to Spotify, Apple Podcasts, YouTube, Substack, LinkedIn and the
          hosts&apos; own websites. Nothing is loaded from them until you click a link; from then
          on, that site&apos;s own privacy policy applies.
        </p>

        <h2>7. Contact by email</h2>
        <p>
          If you email us, we use your address and message only to reply, and delete them once
          the conversation is over unless a legal retention duty applies. Emails to{' '}
          {operator.email} are received by Cloudflare Email Routing (Cloudflare, Inc., USA,
          certified under the EU-US Data Privacy Framework) and forwarded to our mailbox. Legal
          basis: Art. 6(1)(f) GDPR, our legitimate interest in answering messages sent to us.
          Giving us your data is neither a legal nor a contractual requirement, but without a way
          to reach you we cannot reply.
        </p>

        <h2>8. Your rights</h2>
        <p>Under the GDPR you have the right to:</p>
        <ul>
          <li>access the personal data we hold about you (Art. 15)</li>
          <li>have inaccurate data corrected (Art. 16)</li>
          <li>have your data erased (Art. 17)</li>
          <li>restrict processing (Art. 18)</li>
          <li>receive your data in a portable format (Art. 20)</li>
          <li>
            object at any time to processing based on Art. 6(1)(f) GDPR, on grounds relating to
            your particular situation (Art. 21)
          </li>
          <li>withdraw consent at any time, with effect for the future (Art. 7(3))</li>
        </ul>
        <p>
          To exercise any of these, email <a href={`mailto:${operator.email}`}>{operator.email}</a>.
          You also have the right to lodge a complaint with a data protection supervisory
          authority (Art. 77), in particular in the EU member state where you live or work.
        </p>

        <h2>9. Automated decisions</h2>
        <p>
          No automated decision-making or profiling within the meaning of Art. 22 GDPR takes
          place.
        </p>

        <p className="legal-updated">Last updated: {privacyLastUpdated}</p>
      </div>
    </section>
  )
}

export default Privacy
