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

      {/* The order is the funnel: the podcast is the evidence that the teaching is
          worth paying for, so it comes before the courses pitch. */}
      <section id="home" className="hero" aria-labelledby="hero-title">
        <Home />
      </section>
      <section id="podcast" className="band band-hairline" aria-labelledby="podcast-title">
        <Podcast />
      </section>
      {/* A pitch, not the catalogue: the full list lives on /courses. */}
      <section id="courses" className="band band-inverse" aria-labelledby="courses-title">
        <Courses />
      </section>
      <section id="learning" className="band" aria-labelledby="learning-title">
        <Learning />
      </section>
      <section id="about" className="band band-subtle" aria-labelledby="about-title">
        <About />
      </section>
    </>
  )
}

export default HomePage
