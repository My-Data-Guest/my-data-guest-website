import './pages.css'

const mockEpisodes = [
  {
    number: 12,
    title: 'Human‑centric analytics: beyond dashboards',
    summary: 'We discuss how teams shape analytics for decisions, not vanity.',
  },
  {
    number: 11,
    title: 'Data contracts in practice',
    summary: 'What contracts are, when they help, and the pitfalls to avoid.',
  },
  {
    number: 10,
    title: 'Generative AI for product research',
    summary: 'Methods, limitations, and how to keep humans in the loop.',
  },
]

function Episodes() {
  return (
    <section>
      <h1>Episodes</h1>
      <p className="muted">A selection of recent episodes.</p>
      <ul className="episode-list">
        {mockEpisodes.map((e) => (
          <li key={e.number} className="episode-card">
            <div className="episode-badge">#{e.number}</div>
            <div>
              <h3>{e.title}</h3>
              <p>{e.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Episodes




