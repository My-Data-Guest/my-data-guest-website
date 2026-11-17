// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { hasPostalAddress, operator, type PostalAddress } from '../data/legal'

/**
 * A postal address as the Impressum and the privacy policy print it, the
 * operator's by default. Until an address is set in src/data/legal.ts only the
 * name shows.
 */
const OperatorAddress = ({ person = operator }: { person?: PostalAddress }) => (
  <address>
    {person.name}
    {hasPostalAddress(person) && (
      <>
        <br />
        {person.careOf && (
          <>
            c/o {person.careOf}
            <br />
          </>
        )}
        {person.street}
        <br />
        {person.postalCode} {person.city}
        {person.country && (
          <>
            <br />
            {person.country}
          </>
        )}
      </>
    )}
  </address>
)

export default OperatorAddress
