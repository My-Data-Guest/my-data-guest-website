// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

/**
 * GitHub Pages has no SPA rewrites, so a deep link is only served if a file
 * exists at that path. Without one it falls through to 404.html: the page
 * still renders, but with an HTTP 404 and a noindex tag, which is wrong for
 * real routes and especially for the Impressum, which has to be reliably
 * reachable. This writes a copy of index.html for each route, and the 404
 * page itself.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
const ROBOTS = /<meta name="robots" content="[^"]*"\s*\/?>/

const html = readFileSync(join(DIST, 'index.html'), 'utf8')
const noindex = html.replace(ROBOTS, '<meta name="robots" content="noindex, follow" />')

if (noindex === html) throw new Error('postbuild: robots meta not found in index.html')

// Routes and whether search engines may index them. The Impressum stays out
// of the index so the postal address does not show up when someone searches
// a host's name.
const ROUTES = { courses: true, privacy: true, impressum: false }

for (const [route, indexable] of Object.entries(ROUTES)) {
  mkdirSync(join(DIST, route), { recursive: true })
  writeFileSync(join(DIST, route, 'index.html'), indexable ? html : noindex)
}

writeFileSync(join(DIST, '404.html'), noindex)
console.log(`postbuild: wrote ${Object.keys(ROUTES).join(', ')} and 404.html`)
