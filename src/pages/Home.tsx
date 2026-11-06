import Hero from '../components/Hero'
import About from '../components/About'
import { UpcomingEvents, PastEvents } from '../components/Events'
import Projects from '../components/Projects'

const Home = () => {
  return (
    <div className="home">
      {/* Identity pinned on the left; the page reads down the right. */}
      <Hero />
      <div className="home__main">
        <About />
        <hr className="rule" />
        <UpcomingEvents />
        <hr className="rule" />
        <Projects />
        <hr className="rule" />
        <PastEvents />
      </div>
    </div>
  )
}

export default Home
