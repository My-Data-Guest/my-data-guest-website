// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

/**
 * Everything the Impressum (§ 5 DDG) and the privacy policy need to know
 * about whoever runs the site. Both pages read from here, so this is the only
 * file to edit.
 *
 * Fields set to `null` are optional or not known yet and are simply not
 * shown. The Impressum is incomplete until the postal address is filled in.
 */
export const operator = {
  name: 'Alessandro Romano',

  // Must be an address where post and legal documents can reach you. A PO
  // box is not enough. With an Impressum address service, put the service's
  // name in `careOf` (printed as "c/o ...") and its address below.
  careOf: null as string | null,
  street: null as string | null,
  postalCode: null as string | null,
  city: null as string | null,
  country: 'Deutschland',

  email: 'contact@aromano.dev',

  // Optional second fast channel besides email.
  phone: null as string | null,

  // Only if there is one. Required before any course goes on sale again.
  vatId: null as string | null,
}

/**
 * How long Google Analytics keeps event data. Matches GA4 Admin > Data
 * collection and modification > Data retention (2 or 14 months).
 */
export const analyticsRetentionMonths = 2

/** Shown at the bottom of the privacy policy. Bump it whenever the text changes. */
export const privacyLastUpdated = 'November 17, 2026'

export const hasPostalAddress = () =>
  Boolean(operator.street && operator.postalCode && operator.city)
