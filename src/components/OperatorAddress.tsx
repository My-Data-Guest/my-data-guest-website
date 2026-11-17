// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { hasPostalAddress, operator } from '../data/legal'

/**
 * The site operator's postal address, as the Impressum and the privacy policy
 * print it. Until an address is set in src/data/legal.ts only the name shows.
 */
const OperatorAddress = () => (
  <address>
    {operator.name}
    {hasPostalAddress() && (
      <>
        <br />
        {operator.careOf && (
          <>
            c/o {operator.careOf}
            <br />
          </>
        )}
        {operator.street}
        <br />
        {operator.postalCode} {operator.city}
        <br />
        {operator.country}
      </>
    )}
  </address>
)

export default OperatorAddress
