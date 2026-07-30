import { Link } from 'react-router-dom'

const bodyClass =
  'text-[0.9rem] font-medium leading-relaxed md:text-[0.98rem]'
const bodyStyle = { color: '#3a4050' as const }
const listClass = `${bodyClass} list-disc space-y-2 pl-5`
const nestedListClass = 'mt-2 list-[circle] space-y-1 pl-5'
const h3Class = 'mb-1 mt-8 text-[1rem] font-semibold'
const linkClass = 'underline hover:no-underline'

const DOC_URL =
  'https://docs.google.com/document/d/16mgteN0F91wML5sPbwCWzgaNhK3IQLUn3G2h-fthH7I/edit'

const TaisReadingRecs = () => {
  return (
    <article className="mx-auto max-w-2xl py-14 md:py-20">
      <Link
        to="/"
        className="text-[0.78rem] no-underline hover:underline"
        style={{ color: 'var(--color-ink-mute)' }}
      >
        ← jbergs.eu
      </Link>

      <p
        className="mb-3 mt-8 text-[0.7rem] uppercase tracking-[0.22em]"
        style={{ color: 'var(--color-ink-mute)' }}
      >
        Technical AI Safety
      </p>
      <h1
        className="m-0 text-[2.4rem] leading-none md:text-[3rem]"
        style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, letterSpacing: '-0.02em' }}
      >
        Jess&rsquo; Reading Recommendations
      </h1>

      <div className="mt-8 space-y-5">
        <p className={`${bodyClass} italic`} style={bodyStyle}>
          I particularly focus on scalable human oversight, alignment and human factors;
          agent-to-agent interactions and general software engineering in the age of agentic
          AI! Comments welcome on the{' '}
          <a href={DOC_URL} className={linkClass}>
            Google Doc version
          </a>
          .
        </p>

        <h3 className={h3Class} style={bodyStyle}>
          July 2026
        </h3>
        <ul className={listClass} style={bodyStyle}>
          <li>
            GoodFire blog series on Neural Geometry:{' '}
            <a href="https://www.goodfire.ai/research/neural-geometry" className={linkClass}>
              goodfire.ai/research/neural-geometry
            </a>
          </li>
        </ul>

        <h3 className={h3Class} style={bodyStyle}>
          June 2026
        </h3>
        <ul className={listClass} style={bodyStyle}>
          <li>
            Anthropic Institute – Recursive Self-Improvement blog post{' '}
            <a
              href="https://www.anthropic.com/institute/recursive-self-improvement"
              className={linkClass}
            >
              anthropic.com/institute/recursive-self-improvement
            </a>
          </li>
          <li>
            AISI Loss of Oversight{' '}
            <a
              href="https://cdn.prod.website-files.com/663bd486c5e4c81588db7a1d/6a0ed93f9b4a6a65994235d8_Loss_of_Oversight%20(7).pdf"
              className={linkClass}
            >
              paper
            </a>
          </li>
          <li>
            Alignment is harder than you think –{' '}
            <a
              href="https://www.lesswrong.com/posts/gpuYFbMNH8PJXpmny/automated-alignment-is-harder-than-you-think-1"
              className={linkClass}
            >
              LessWrong post
            </a>
          </li>
          <li>
            AI Alignment is a human problem{' '}
            <a href="https://osf.io/preprints/psyarxiv/zqngj_v1" className={linkClass}>
              osf.io/preprints/psyarxiv/zqngj_v1
            </a>
          </li>
        </ul>

        <h3 className={h3Class} style={bodyStyle}>
          May 2026
        </h3>
        <ul className={listClass} style={bodyStyle}>
          <li>
            SandboxEscapeBench:{' '}
            <a
              href="https://www.aisi.gov.uk/blog/can-ai-agents-escape-their-sandboxes-a-benchmark-for-safely-measuring-container-breakout-capabilities"
              className={linkClass}
            >
              AISI blog post
            </a>
          </li>
          <li>
            UK AISI Mythos{' '}
            <a
              href="https://www.aisi.gov.uk/blog/our-evaluation-of-claude-mythos-previews-cyber-capabilities"
              className={linkClass}
            >
              evaluation report
            </a>
          </li>
          <li>
            Claude Mythos{' '}
            <a
              href="https://www-cdn.anthropic.com/08ab9158070959f88f296514c21b7facce6f52bc.pdf"
              className={linkClass}
            >
              system card
            </a>
          </li>
          <li>
            Anthropic Institute – Recursive Self-Improvement blog post{' '}
            <a
              href="https://www.anthropic.com/institute/recursive-self-improvement"
              className={linkClass}
            >
              anthropic.com/institute/recursive-self-improvement
            </a>
          </li>
          <li>
            AISI Loss of Oversight{' '}
            <a
              href="https://cdn.prod.website-files.com/663bd486c5e4c81588db7a1d/6a0ed93f9b4a6a65994235d8_Loss_of_Oversight%20(7).pdf"
              className={linkClass}
            >
              paper
            </a>
          </li>
          <li>
            X402 protocol for machine-to-machine payments, rolled out by Stripe:{' '}
            <a
              href="https://docs.stripe.com/payments/machine/x402?locale=en-GB"
              className={linkClass}
            >
              docs.stripe.com
            </a>
          </li>
          <li>
            Apart Research Sprint on{' '}
            <a
              href="https://apartresearch.com/sprints/secure-program-synthesis-hackathon-2026-05-22-to-2026-05-24"
              className={linkClass}
            >
              Formal Methods
            </a>
          </li>
        </ul>

        <h3 className={h3Class} style={bodyStyle}>
          General
        </h3>
        <p className={`${bodyClass} italic`} style={bodyStyle}>
          All highly recommended!
        </p>
        <ul className={listClass} style={bodyStyle}>
          <li>
            UK AISI Research Agenda 2025/2026{' '}
            <a href="https://www.aisi.gov.uk/research-agenda" className={linkClass}>
              aisi.gov.uk/research-agenda
            </a>
          </li>
          <li>
            UK AISI AI Trends report 2025{' '}
            <a
              href="https://www.aisi.gov.uk/research/aisi-frontier-ai-trends-report-2025"
              className={linkClass}
            >
              aisi.gov.uk
            </a>
          </li>
          <li>
            International AI Safety Report{' '}
            <a href="https://internationalaisafetyreport.org/" className={linkClass}>
              internationalaisafetyreport.org
            </a>
          </li>
          <li>
            Open Problems in Technical AI Governance (2025){' '}
            <a href="https://arxiv.org/abs/2407.14981" className={linkClass}>
              arxiv.org/abs/2407.14981
            </a>
          </li>
          <li>
            Multi-Agent risks from advanced AI (2025){' '}
            <a href="https://arxiv.org/abs/2502.14143" className={linkClass}>
              arxiv.org/abs/2502.14143
            </a>
          </li>
          <li>
            AI2027 prediction scenarios{' '}
            <a href="https://ai-2027.com/" className={linkClass}>
              ai-2027.com
            </a>
            <ul className={nestedListClass}>
              <li>
                YT vid:{' '}
                <a href="https://www.youtube.com/watch?v=5KVDDfAkRgc" className={linkClass}>
                  youtube.com/watch?v=5KVDDfAkRgc
                </a>
              </li>
            </ul>
          </li>
          <li>Europe 2031</li>
          <li>
            UK AISI&rsquo;s Inspect AI evals framework
            <ul className={nestedListClass}>
              <li>
                Framework{' '}
                <a href="https://inspect.aisi.org.uk/" className={linkClass}>
                  inspect.aisi.org.uk
                </a>
              </li>
              <li>
                Evals library{' '}
                <a href="https://inspect.aisi.org.uk/evals/" className={linkClass}>
                  inspect.aisi.org.uk/evals
                </a>
              </li>
              <li>
                Handy extensions en masse!{' '}
                <a href="https://inspect.aisi.org.uk/extensions/" className={linkClass}>
                  inspect.aisi.org.uk/extensions
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="https://aisafety.com/" className={linkClass}>
              AISafety.com
            </a>{' '}
            – orientation around the AIS landscape
            <ul className={nestedListClass}>
              <li>
                Map{' '}
                <a href="https://aisafety.com/map" className={linkClass}>
                  aisafety.com/map
                </a>
              </li>
              <li>
                All the events and fellowships with application deadlines{' '}
                <a href="https://aisafety.com/events-and-training" className={linkClass}>
                  aisafety.com/events-and-training
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <h2 className="section-h2 !mb-1 mt-10">
          BlueDot Technical AI Safety Project Sprint Course
        </h2>
        <p className={`${bodyClass} italic`} style={bodyStyle}>
          5 weeks facilitated group sessions and 1:1s to support you in publishing your first
          contribution to TAIS! This is the main course I&rsquo;m facilitating with BlueDot.
        </p>
        <ul className={listClass} style={bodyStyle}>
          <li>
            Course page{' '}
            <a
              href="https://bluedot.org/courses/technical-ai-safety-project"
              className={linkClass}
            >
              bluedot.org/courses/technical-ai-safety-project
            </a>
          </li>
          <li>
            Previous projects{' '}
            <a href="https://blog.bluedot.org/s/projects" className={linkClass}>
              blog.bluedot.org/s/projects
            </a>
          </li>
        </ul>

        <p className={bodyClass} style={bodyStyle}>
          Looking for project advice too? See{' '}
          <Link to="/taisp-tips" className="font-semibold underline hover:no-underline">
            Jess&rsquo; TAISP Tips
          </Link>
          .
        </p>
      </div>
    </article>
  )
}

export default TaisReadingRecs
