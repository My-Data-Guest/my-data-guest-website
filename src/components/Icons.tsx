// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

// One shared set of platform badges. Every glyph sits in a filled 24×24 circle so
// a row of them lines up regardless of which platforms are shown.

interface IconProps {
  size?: number
}

const Badge = ({ size = 40, children }: IconProps & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    {children}
  </svg>
)

export const SpotifyIcon = ({ size }: IconProps) => (
  <Badge size={size}>
    <circle cx="12" cy="12" r="11" fill="#1DB954" />
    <path d="M6.8 9.4c3.4-1.1 7.3-.9 10.2.7" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M7.4 12.4c2.8-.9 5.9-.7 8.3.6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 15.3c2.1-.7 4.4-.5 6.3.4" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
  </Badge>
)

export const ApplePodcastsIcon = ({ size }: IconProps) => (
  <Badge size={size}>
    <circle cx="12" cy="12" r="11" fill="#9933CC" />
    <rect x="10" y="5.5" width="4" height="7.5" rx="2" fill="#fff" />
    <path d="M8.2 11.4v1.1a3.8 3.8 0 0 0 7.6 0v-1.1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 16.3v2.2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </Badge>
)

export const YouTubeIcon = ({ size }: IconProps) => (
  <Badge size={size}>
    <circle cx="12" cy="12" r="11" fill="#FF0033" />
    <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="#fff" />
  </Badge>
)

export const LinkedInIcon = ({ size }: IconProps) => (
  <Badge size={size}>
    <circle cx="12" cy="12" r="11" fill="#0A66C2" />
    <path
      d="M7.6 9.9h2v7h-2v-7zm1-3.4a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"
      fill="#fff"
    />
    <path
      d="M11.5 9.9h1.9v1h.03c.27-.52.95-1.06 1.95-1.06 2.08 0 2.46 1.37 2.46 3.15v3.9h-2v-3.45c0-.77-.01-1.76-1.07-1.76-1.06 0-1.22.83-1.22 1.7v3.51h-2v-7z"
      fill="#fff"
    />
  </Badge>
)

export const SubstackIcon = ({ size }: IconProps) => (
  <Badge size={size}>
    <circle cx="12" cy="12" r="11" fill="#FF6719" />
    <path d="M7 7.5h10v1.6H7V7.5zm0 3.1h10v1.6H7v-1.6zm0 3.1h10v4.8l-5-2.6-5 2.6v-4.8z" fill="#fff" />
  </Badge>
)

export const WebsiteIcon = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18M3.2 12h17.6"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
)

/** Monochrome variants for the small social row on the About section. */
export const LinkedInGlyph = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3v-11zm6.5 0h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11z" />
  </svg>
)

export const SubstackGlyph = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M4 3h16v2.6H4V3zm0 4.7h16v2.6H4V7.7zM4 12.4h16V21l-8-4.3L4 21v-8.6z" />
  </svg>
)

/* Line icons for the course selling points. Stroked, not filled, so they sit
   quietly next to the type instead of reading as another badge row. */
const Line = ({ size = 22, children }: IconProps & { children: React.ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
)

/** Live / broadcasting. */
export const LiveIcon = ({ size }: IconProps) => (
  <Line size={size}>
    <circle cx="12" cy="12" r="2.5" />
    <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 16.2a6 6 0 0 0 0-8.4" />
    <path d="M4.9 4.9a10 10 0 0 0 0 14.2M19.1 19.1a10 10 0 0 0 0-14.2" />
  </Line>
)

/** A small group. */
export const CohortIcon = ({ size }: IconProps) => (
  <Line size={size}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <path d="M16.5 5.2a3.2 3.2 0 0 1 0 5.9M18 14.4a5.5 5.5 0 0 1 2.5 4.6" />
  </Line>
)

/** Hands-on / built from real work. */
export const BuildIcon = ({ size }: IconProps) => (
  <Line size={size}>
    <path d="M9.5 4.5 4 10l5.5 5.5" />
    <path d="M14.5 8.5 20 14l-5.5 5.5" />
  </Line>
)
