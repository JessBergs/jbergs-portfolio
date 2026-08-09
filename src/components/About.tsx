const About = () => {
  return (
    <section id="about" className="relative isolate flex flex-col">
      <h2 className="section-h2 mb-6">Hi, there!</h2>
      <div>
        <p
          className="mb-5 text-[0.88rem] font-medium leading-relaxed md:text-[0.95rem]"
          style={{ color: '#3a4050' }}
        >
          I lead engineering &amp; product strategy at the{' '}
          <a
            href="https://www.aisi.gov.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:no-underline"
          >
            UK AI Security Institute
          </a>{' '}
          for our human-in-the-loop research tools enabling our scientists to source empirical
          data for their groundbreaking AI security research experiments at scale. I&apos;m
          currently working on human oversight for automated R&amp;D to keep humans
          meaningfully in the loop.
        </p>
        <p
          className="mb-5 text-[0.88rem] font-medium leading-relaxed md:text-[0.95rem]"
          style={{ color: '#3a4050' }}
        >
          My career so far has been a wild mix of R&amp;D, public sector innovation and
          creative tech; spanning EU Horizon R&amp;D projects, research on Explainable AI at
          BBC R&amp;D and since 2024 technical AI safety within British Government.
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
          programme,{' '}
          <a
            href="https://algoverseairesearch.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:no-underline"
          >
            Algoverse AI Research
          </a>{' '}
          and from this Autumn also{' '}
          <a
            href="https://sparai.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:no-underline"
          >
            SPAR
          </a>
          .
        </p>
        <p
          className="text-[0.88rem] font-medium leading-relaxed md:text-[0.95rem]"
          style={{ color: '#3a4050' }}
        >
          I&apos;m a proud generalist and love bringing people together via events &amp;
          conferences I (co-)organise. Outside work, I design and playtest board games!
        </p>
      </div>
    </section>
  )
}

export default About
