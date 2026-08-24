// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import Home from './Home'
import Podcast from './Podcast'
import Learning from './Learning'
import Courses from './Courses'
import About from './About'
import SEO from '../components/SEO'

/**
 * The homepage: one scrolling document whose sections are the nav targets.
 *
 * The sections have to stay direct children of <main> — useActiveSection observes
 * `main > section[id]` to drive the nav highlight.
 */
function HomePage() {
  return (
    <>
      <SEO
        title="My Data Guest — AI Without the Hype"
        description="AI without the hype. A podcast, newsletter and live courses by Alessandro Romano and Rosaria Silipo — real stories, honest conversations, and practical advice from people building with data and AI."
      />

      <section id="home" className="hero" aria-labelledby="hero-title">
        <Home />
      </section>
      <section id="podcast" className="band band-b" aria-labelledby="podcast-title">
        <Podcast />
      </section>
      <section id="learning" className="band band-c" aria-labelledby="learning-title">
        <Learning />
      </section>
      {/* A teaser, not the content: the catalogue lives on /courses. */}
      <section id="courses" className="band band-b" aria-labelledby="courses-title">
        <Courses />
      </section>
      <section id="about" className="band" aria-labelledby="about-title">
        <About />
      </section>
    </>
  )
}

export default HomePage
