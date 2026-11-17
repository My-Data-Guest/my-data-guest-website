// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import './pages.css'
import SEO from '../components/SEO'
import { coProvider, operator } from '../data/legal'
import { SITE_URL } from '../utils/structuredData'
import OperatorAddress from '../components/OperatorAddress'

/**
 * Provider identification under § 5 DDG and § 18 Abs. 2 MStV.
 *
 * noindex: the Impressum has to be reachable from the site, not from search,
 * and keeping it out of the index keeps the postal address off Google.
 */
function Impressum() {
  return (
    <section className="page" aria-labelledby="impressum-title">
      <SEO
        title="Impressum — My Data Guest"
        description="Impressum (legal notice) of mydataguest.com."
        url={`${SITE_URL}/impressum`}
        noindex
      />

      <div className="container legal-prose">
        <p className="eyebrow">Legal notice</p>
        <h1 id="impressum-title" className="section-title">
          Impressum
        </h1>

        <h2>Angaben gemäß § 5 DDG</h2>
        <p>My Data Guest wird betrieben von:</p>
        <OperatorAddress />
        <OperatorAddress person={coProvider} />

        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href={`mailto:${operator.email}`}>{operator.email}</a>
          {operator.phone && (
            <>
              <br />
              Telefon: <a href={`tel:${operator.phone.replace(/[^+\d]/g, '')}`}>{operator.phone}</a>
            </>
          )}
        </p>

        {operator.vatId && (
          <>
            <h2>Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
              <br />
              {operator.vatId}
            </p>
          </>
        )}

        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>{operator.name}, Anschrift wie oben.</p>
      </div>
    </section>
  )
}

export default Impressum
