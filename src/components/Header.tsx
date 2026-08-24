// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS, type NavItem } from '../navigation'
import { useActiveSection } from '../hooks/useActiveSection'

/**
 * On the homepage the section links stay plain anchors, so the browser does the
 * scrolling (smooth, and honouring `scroll-padding-top`). From another route
 * they become router links to `/#id`, and <ScrollToHash /> finishes the job.
 */
const SectionLink = ({ item, isHome, ...props }: { item: NavItem; isHome: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
  isHome ? (
    <a href={`#${item.id}`} {...props}>
      {item.label}
    </a>
  ) : (
    <Link to={`/#${item.id}`} {...props}>
      {item.label}
    </Link>
  )

function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection(isHome)

  const active = isHome
    ? activeSection
    : NAV_ITEMS.find((item) => item.path && pathname.startsWith(item.path))?.id

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      {isHome ? (
        <a className="brand" href="#home" aria-label="My Data Guest — home">
          <BrandMark />
        </a>
      ) : (
        <Link className="brand" to="/" aria-label="My Data Guest — home">
          <BrandMark />
        </Link>
      )}
      <nav className="nav" aria-label="Sections">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id
          const linkProps = {
            className: isActive ? 'active' : undefined,
            'aria-current': isActive ? ('true' as const) : undefined,
            // Lets the stylesheet drop individual entries on narrow screens.
            'data-nav-id': item.id,
          }

          return item.path ? (
            <Link key={item.id} to={item.path} {...linkProps}>
              {item.label}
            </Link>
          ) : (
            <SectionLink key={item.id} item={item} isHome={isHome} {...linkProps} />
          )
        })}
      </nav>
    </header>
  )
}

const BrandMark = () => (
  <>
    <img
      src={`${import.meta.env.BASE_URL}mark.png`}
      alt=""
      className="brand-mark"
      width={40}
      height={40}
    />
    <span className="brand-name">
      My Data <span>Guest</span>
    </span>
  </>
)

export default Header
