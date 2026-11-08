// The <noscript> block in index.html carries a text-only copy of this section.
// Change both together (see AGENTS.md, "Conventions").
const About = () => {
  return (
    <section id="about" className="relative isolate flex flex-col">
      <h2 className="section-h2 mb-6">Hi, there!</h2>
      <div className="about-copy">
        <p>
          I&apos;m an engineering lead at the{' '}
          <a href="https://www.aisi.gov.uk/" target="_blank" rel="noopener noreferrer">
            UK AI Security Institute
          </a>{' '}
          for our human-in-the-loop research tools, enabling our scientists to run their
          empirical research experiments at scale.
        </p>
        <p>
          Currently, my independent research focuses on how we can design for effective
          scalable human oversight.
        </p>
        <p>
          My career so far has been in R&amp;D and public sector innovation, from EU
          Horizon projects to Explainable AI at BBC R&amp;D and since 2024 technical AI
          safety in the British government.
        </p>
        <p>
          I&apos;m mentoring at BlueDot Impact&apos;s{' '}
          <a
            href="https://bluedot.org/courses/technical-ai-safety-project"
            target="_blank"
            rel="noopener noreferrer"
          >
            Technical AI Safety Project
          </a>{' '}
          programme and the{' '}
          <a href="https://sparai.org/" target="_blank" rel="noopener noreferrer">
            SPAR
          </a>{' '}
          and{' '}
          <a
            href="https://www.pivotal-research.org/mentors/profile/jess-bergs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pivotal
          </a>{' '}
          research fellowships, and do occasional career advising with{' '}
          <a href="https://80000hours.org/" target="_blank" rel="noopener noreferrer">
            80,000 Hours
          </a>
          .
        </p>
        <p>Outside of work, I design and playtest board games!</p>
      </div>
    </section>
  )
}

export default About
