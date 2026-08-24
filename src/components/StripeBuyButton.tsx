// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { useEffect, useState, type ComponentType, type ReactNode } from 'react'

/**
 * Stripe's hosted Buy Button, as a custom element.
 *
 * The site is static (GitHub Pages), so there is no server to create a Checkout
 * Session on. This is the client-only route: Stripe's script registers a
 * <stripe-buy-button> element that opens their hosted checkout. Nothing secret
 * is involved — see PUBLISHABLE_KEY below.
 *
 * Two things this handles that the copy-paste snippet from the dashboard does not:
 *
 * 1. The script loads on mount, not from index.html, so a visitor reading the
 *    podcast page never fetches js.stripe.com.
 * 2. If the script fails — blocked by an extension, offline, Stripe down — the
 *    element renders nothing at all, leaving an enrolment card with no way to
 *    enrol. So a failure falls back to a plain link.
 */

const SCRIPT_SRC = 'https://js.stripe.com/v3/buy-button.js'

/**
 * Publishable keys are designed to ship to the browser: they can start a
 * checkout and nothing else. This one is in the JS bundle every visitor
 * downloads, so keeping it in the repo changes nothing. The *secret* key
 * (sk_live_…) must never come near this file.
 */
const PUBLISHABLE_KEY =
  'pk_live_51HkDlbIK7YpsRNby4m3MfzCdkKm2LryN5w3zpixWTjV4yPEujZudDOaTx9znj8AZuKjq9H12dwt2Ho1kw3Ll7jAz00LGfxP97M'

/**
 * The custom element, typed for JSX.
 *
 * Declared as a component rather than augmenting React's IntrinsicElements: the
 * augmentation would be a global namespace for the sake of one tag used in one
 * file, and this keeps the attribute names checked at the call site.
 */
const BuyButtonElement = 'stripe-buy-button' as unknown as ComponentType<{
  'buy-button-id': string
  'publishable-key': string
}>

type ScriptState = 'loading' | 'ready' | 'failed'

interface StripeBuyButtonProps {
  buyButtonId: string
  /** Shown instead of the button if Stripe's script never arrives. */
  fallback: ReactNode
}

const StripeBuyButton = ({ buyButtonId, fallback }: StripeBuyButtonProps) => {
  const [state, setState] = useState<ScriptState>(() =>
    // Already registered by an earlier mount: skip straight to ready, or the
    // button would flash the fallback on every return to the page.
    window.customElements?.get('stripe-buy-button') ? 'ready' : 'loading'
  )

  useEffect(() => {
    if (state === 'ready') return

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    const script = existing ?? document.createElement('script')

    const onLoad = () => setState('ready')
    const onError = () => setState('failed')
    script.addEventListener('load', onLoad)
    script.addEventListener('error', onError)

    if (!existing) {
      script.src = SCRIPT_SRC
      script.async = true
      document.head.appendChild(script)
    }

    return () => {
      script.removeEventListener('load', onLoad)
      script.removeEventListener('error', onError)
    }
    // Deliberately not cleaning up the script itself: the custom element stays
    // registered once defined, so removing it would only force a second fetch.
  }, [state])

  if (state === 'failed') return <>{fallback}</>

  return (
    <div className="stripe-buy-button" data-loading={state === 'loading' ? '' : undefined}>
      <BuyButtonElement buy-button-id={buyButtonId} publishable-key={PUBLISHABLE_KEY} />
    </div>
  )
}

export default StripeBuyButton
