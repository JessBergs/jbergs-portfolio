const About = () => {
  return (
    <section id="about" className="relative isolate flex flex-col">
      <h2 className="section-h2 mb-6">Hi, there!</h2>
      <div>
        <p
          className="mb-5 text-[0.88rem] font-medium leading-relaxed md:text-[0.95rem]"
          style={{ color: '#3a4050' }}
        >
          I&apos;m an engineering lead at the{' '}
          <a
            href="https://www.aisi.gov.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:no-underline"
          >
            UK AI Security Institute
          </a>{' '}
          for our human-in-the-loop research tools, enabling our scientists to run their
          empirical research experiments at scale.
          <br />
          Currently, my independent research focuses on how we can design for effective
          scalable human oversight.
        </p>
        <p
          className="mb-5 text-[0.88rem] font-medium leading-relaxed md:text-[0.95rem]"
          style={{ color: '#3a4050' }}
        >
          My career so far has been in R&amp;D and public sector innovation, from EU
          Horizon projects to Explainable AI at BBC R&amp;D and since 2024 technical AI
          safety in the British government.
        </p>
        <p
          className="mb-5 text-[0.88rem] font-medium leading-relaxed md:text-[0.95rem]"
          style={{ color: '#3a4050' }}
        >
          I&apos;m mentoring at BlueDot Impact&apos;s{' '}
          <a
            href="https://bluedot.org/courses/technical-ai-safety-project"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:no-underline"
          >
            Technical AI Safety Project
          </a>{' '}
          programme and the{' '}
          <a
            href="https://sparai.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:no-underline"
          >
            SPAR
          </a>{' '}
          and{' '}
          <a
            href="https://www.pivotal-research.org/mentors/profile/jess-bergs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:no-underline"
          >
            Pivotal
          </a>{' '}
          research fellowships.
        </p>
        <p
          className="text-[0.88rem] font-medium leading-relaxed md:text-[0.95rem]"
          style={{ color: '#3a4050' }}
        >
          I&apos;m a proud generalist and love bringing people together through events &amp;
          conferences I (co-)organise. Outside work, I design and playtest board games!
        </p>
      </div>
    </section>
  )
}

export default About
