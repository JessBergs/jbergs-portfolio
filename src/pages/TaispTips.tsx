import { Link } from 'react-router-dom'

const bodyClass =
  'text-[0.9rem] font-medium leading-relaxed md:text-[0.98rem]'
const bodyStyle = { color: '#3a4050' as const }
const listClass = `${bodyClass} list-disc space-y-2 pl-5`
const nestedListClass = 'mt-2 list-[circle] space-y-1 pl-5'
const h3Class = 'mb-1 mt-8 text-[1rem] font-semibold'
const linkClass = 'underline hover:no-underline'

const DOC_URL =
  'https://docs.google.com/document/d/1VIXrgibCpWo_oR76f89rDLGLjA3XT_FwZ8sAXGYXyoY/edit'

const TaispTips = () => {
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
        v0.4 – July 2026
      </p>
      <h1
        className="m-0 text-[2.4rem] leading-none md:text-[3rem]"
        style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 500, letterSpacing: '-0.02em' }}
      >
        Jess&rsquo; TAISP Tips!
      </h1>

      <div className="mt-8 space-y-5">
        <p className={`${bodyClass} italic`} style={bodyStyle}>
          In here, I&rsquo;ve collated the most common bits and bobs of advice I&rsquo;ve been
          giving to participants across the cohorts I&rsquo;ve been facilitating with
          BlueDot&rsquo;s{' '}
          <a href="https://bluedot.org/courses/technical-ai-safety-project" className={linkClass}>
            Technical AI Safety Project Sprint
          </a>{' '}
          and{' '}
          <a href="https://algoverseairesearch.org/" className={linkClass}>
            Algoverse
          </a>{' '}
          programme. This is still an early draft, hence mostly bullet points – your comments
          &amp; feedback are very much welcome, ideally on the{' '}
          <a href={DOC_URL} className={linkClass}>
            Google Doc version
          </a>
          !
        </p>

        <h2 className="section-h2 !mb-1 mt-10">Shaping your project</h2>

        <h3 className={h3Class} style={bodyStyle}>
          Your project idea &amp; what to get out of the project that works for <em>you</em>!
        </h3>
        <p className={bodyClass} style={bodyStyle}>
          For inspiration for project ideas:
        </p>
        <ul className={listClass} style={bodyStyle}>
          <li>
            The BlueDot{' '}
            <a href="https://blog.bluedot.org/s/projects/archive?sort=new" className={linkClass}>
              project archive
            </a>
          </li>
          <li>Workshop papers at conferences like ICML and NeurIPS</li>
          <li>TAIS research publications that outline open problems</li>
        </ul>
        <p className={bodyClass} style={bodyStyle}>
          And remember: learning is fine! Replicating a paper, targeting a workshop paper, or
          findings that aren&rsquo;t novel can all still make for a worthwhile project – it
          doesn&rsquo;t need to be super technical. For example, Inspect&rsquo;s evals have
          plenty of open issues (bugs, missing token-usage / cost-per-run listings, scanners
          and transcript analysis) and welcome PRs.
        </p>

        <h3 className={h3Class} style={bodyStyle}>
          Scoping &amp; timelining
        </h3>
        <p className={bodyClass} style={bodyStyle}>
          For any project with short timelines and/or hard deadlines, rigorous scoping is key!
          Some suggested approaches:
        </p>
        <ul className={listClass} style={bodyStyle}>
          <li>
            Set tiered goals, e.g.
            <ul className={nestedListClass}>
              <li>baseline goal (&lsquo;publish a blog post&rsquo;)</li>
              <li>ambitious goal (&lsquo;open PR on open-source project XYZ&rsquo;)</li>
              <li>stretch goal (&lsquo;run eval on additional frontier models&rsquo;)</li>
            </ul>
          </li>
          <li>
            Define a de-risking strategy:
            <ul className={nestedListClass}>
              <li>
                Plan in sufficient buffer time / budget – for example, allow for an additional
                experiment run if your first one fails unexpectedly
              </li>
              <li>Time-box experiment runs or debugging attempts</li>
              <li>
                Fallback plans – for example, if self-hosting a certain model turns out tricky,
                fall back to a different model or API provider
              </li>
            </ul>
          </li>
          <li>
            Consider time required for learning new tools, working through your reading list,
            and turnaround time for feedback or other correspondence
            <ul className={nestedListClass}>
              <li>Sort papers into categories like must-read, skim-only, nice-to-have</li>
              <li>
                Reaching out to paper authors can often be helpful but also have significant
                turnaround times
              </li>
            </ul>
          </li>
          <li>
            Action beats perfection! Prioritise towards a Minimum Viable Product (MVP), then
            decide on potential add-ons.
          </li>
        </ul>

        <h3 className={h3Class} style={bodyStyle}>
          Managing pivots
        </h3>
        <p className={bodyClass} style={bodyStyle}>
          Over the course of the project sprint, many participants come across new research
          ideas inspired by surprising results they encounter during their experiments,
          intriguing research directions or novel problems they come across during lit rev,
          and so on – which is all super exciting! In those cases, pivoting your project idea
          can be very tempting, and recommended approaches vary by how far along your project
          you are:
        </p>
        <ul className={listClass} style={bodyStyle}>
          <li>
            <strong>Kick-off:</strong> you might have multiple candidate ideas you&rsquo;re
            still deciding between. That&rsquo;s absolutely fine, and the kick-off session(s)
            intends to help you explore which one to pick.
          </li>
          <li>
            <strong>~25%–33% in:</strong> at this point in time, you&rsquo;ll want to have
            pinned a single idea to pursue. If you decide to pivot, I recommend picking a
            project within the same research area (e.g. MechInterp) and similar tools /
            infrastructure setup / experiment methodology.
          </li>
          <li>
            <strong>Midway through and beyond:</strong> by this time, you&rsquo;ll be running
            your experiments. This is prime-time for coming across surprises, new insights and
            ideas for extending the project, and it&rsquo;s very tempting to shift the project
            focus onto those. Advice here:
            <ul className={nestedListClass}>
              <li>
                See if rather than pivoting, you can add on the additional idea(s) as stretch
                goals.
              </li>
              <li>
                Consider if your new idea(s) could be developed into follow-up projects: you
                could use the project to validate (/ reality-check) that your general idea is
                holding up, then use the resulting deliverable to support an application for
                additional funding or entering in a bring-your-own-project fellowship, etc.
              </li>
            </ul>
          </li>
        </ul>

        <h3 className={h3Class} style={bodyStyle}>
          Defining your project
        </h3>
        <ul className={listClass} style={bodyStyle}>
          <li>
            It greatly helps to keep a TL;DR project overview in your log document, updated on
            every iteration. This can be a half-pager with e.g. &hellip;
            <ul className={nestedListClass}>
              <li>your research question(s) / hypotheses;</li>
              <li>
                rough outline of your intended approach (does not need to be a fully-fledged
                methodology);
              </li>
              <li>
                relevance framing towards wider AI Safety (&lsquo;why this matters to AI
                Safety&rsquo;);
              </li>
              <li>route-to-impact for your project (usually based on your theory of impact).</li>
            </ul>
          </li>
          <li>
            Which publishable deliverable(s) are you targeting? Popular choices are
            <ul className={nestedListClass}>
              <li>a blog post, e.g. on SubStack or LessWrong</li>
              <li>a &lsquo;companion&rsquo; GitHub repository for your write-up</li>
              <li>a workshop paper for a conference (e.g. ICML TAIGR)</li>
              <li>a video presentation</li>
            </ul>
          </li>
          <li>
            Stress-test your research hypotheses for robustness:
            <ul className={nestedListClass}>
              <li>
                Suppose your experiments don&rsquo;t yield the expected outcomes. What would a
                meaningful <em>negative</em> result look like?
              </li>
              <li>
                How could you show your results generalise (e.g. by running your experiment on
                multiple models)? Also great for setting out &lsquo;next steps&rsquo;!
              </li>
            </ul>
          </li>
        </ul>

        <h3 className={h3Class} style={bodyStyle}>
          Getting feedback
        </h3>
        <ul className={listClass} style={bodyStyle}>
          <li>
            I highly recommend posting in the wider Slack channels for feedback and questions,
            e.g. &lsquo;feedback and collaborators&rsquo;. There are 10.5k fellow
            BlueDot&rsquo;ers on the BD Slack, hence highly likely you&rsquo;ll get an echo!
          </li>
          <li>Ask other community members for 1:1s.</li>
          <li>
            Keeping a project log makes it easier for others to step through your work and
            leave comments async.
          </li>
        </ul>

        <h2 className="section-h2 !mb-1 mt-10">Commonly used tools</h2>
        <ul className={listClass} style={bodyStyle}>
          <li>
            <a href="https://inspect.aisi.org.uk/" className={linkClass}>
              Inspect AI
            </a>{' '}
            – framework for running evaluations
            <ul className={nestedListClass}>
              <li>
                Inspect evals – wide range of evals and benchmarks ready to use in Inspect:{' '}
                <a
                  href="https://github.com/Generality-Labs/inspect-evals-template/blob/main/CONTRIBUTING.md"
                  className={linkClass}
                >
                  contributing guide
                </a>
                ,{' '}
                <a
                  href="https://github.com/UKGovernmentBEIS/inspect_evals/blob/main/EVALUATION_CHECKLIST.md"
                  className={linkClass}
                >
                  evaluation checklist
                </a>
                ,{' '}
                <a
                  href="https://github.com/Generality-Labs/inspect-evals-template/blob/main/BEST_PRACTICES.md"
                  className={linkClass}
                >
                  best practices
                </a>
                ,{' '}
                <a
                  href="https://github.com/Generality-Labs/inspect-evals-template/blob/main/AUTOMATED_CHECKS.md"
                  className={linkClass}
                >
                  list of automated checks
                </a>
              </li>
              <li>
                <a href="https://meridianlabs-ai.github.io/inspect_scout/" className={linkClass}>
                  Inspect Scout
                </a>{' '}
                – framework for transcript analysis. Particularly handy for analysing beefy
                agentic eval transcripts!
              </li>
              <li>
                Other handy Inspect{' '}
                <a href="https://inspect.aisi.org.uk/extensions/" className={linkClass}>
                  extensions
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="https://openrouter.ai/" className={linkClass}>
              OpenRouter
            </a>{' '}
            models API – wide range of hosted LLMs!
            <ul className={nestedListClass}>
              <li>Many OW models on there support Zero Data Retention.</li>
              <li>
                Make sure to check their Acceptable Usage Policy before running loads that
                might be refusal-heavy.
              </li>
            </ul>
          </li>
          <li>
            <a href="https://vast.ai/" className={linkClass}>
              Vast.ai
            </a>{' '}
            and{' '}
            <a href="https://www.runpod.io/" className={linkClass}>
              Runpod
            </a>{' '}
            on-demand GPUs
            <ul className={nestedListClass}>
              <li>For hosting and fine-tuning open-weight models.</li>
              <li>
                VMs come with PyTorch or vLLM (= LLM serving engine) presets and HuggingFace
                plug-and-play integration to take the pain out of infra setups.
              </li>
              <li>
                Once your instance is spun up, you&rsquo;ll get a ready-to-use API endpoint URL
                + key to directly plug into e.g. Inspect.
              </li>
              <li>Usually cheaper than AWS or other cloud providers.</li>
            </ul>
          </li>
          <li>
            Hetzner Cloud compute / VMs – much cheaper than AWS or similar cloud infra
            providers
          </li>
          <li>
            <a href="https://www.overleaf.com/" className={linkClass}>
              Overleaf
            </a>{' '}
            online LaTeX editor
          </li>
        </ul>

        <h2 className="section-h2 !mb-1 mt-10">Compute costs</h2>

        <h3 className={h3Class} style={bodyStyle}>
          Your compute grant application
        </h3>
        <ul className={listClass} style={bodyStyle}>
          <li>
            You can apply for funding towards your compute cost for the project, e.g. for
            tokens and commissioning cloud infrastructure. Refer to the{' '}
            <a href="https://bluedot.org/programs/rapid-grants" className={linkClass}>
              BD Rapid Grants policy
            </a>
            .
          </li>
          <li>
            Make sure to list your estimated costs in as much detail as possible. Feel free to
            send me your estimate calculation for feedback.
          </li>
          <li>
            Applications take some turnaround time for approval – do make sure to submit your
            application early in the project!
          </li>
        </ul>

        <h3 className={h3Class} style={bodyStyle}>
          Common cost types
        </h3>
        <p className={`${bodyClass} font-semibold`} style={bodyStyle}>
          Cloud GPUs / Virtual Machines
        </p>
        <p className={bodyClass} style={bodyStyle}>
          For providers, see section &lsquo;Commonly used tools&rsquo;.
        </p>
        <ul className={listClass} style={bodyStyle}>
          <li>
            Instances are usually available on-demand and usage is charged per hour or even
            per second. Schedule a shutdown time (e.g. via Cron jobs) to ensure you don&rsquo;t
            leave your VM running unintendedly (and accrue a hefty bill!).
          </li>
          <li>
            Secure usage: if you&rsquo;re running agents, make sure they are sandboxed via a
            disposable VM or a Docker container.
          </li>
          <li>
            Workable inference: if you&rsquo;re running a model for use in an eval, make sure
            your inference throughput is workable for your needs, e.g. sufficient
            tokens-per-second, stable connectivity, etc.
          </li>
        </ul>
        <p className={`${bodyClass} font-semibold`} style={bodyStyle}>
          Tokens via model API providers
        </p>
        <p className={bodyClass} style={bodyStyle}>
          Evals are token-heavy – <em>easily</em> &gt;2m!
        </p>
        <ul className={listClass} style={bodyStyle}>
          <li>
            Estimating token usage and cost can be a bit tricky:
            <ul className={nestedListClass}>
              <li>Many benchmarks don&rsquo;t list their token counts.</li>
              <li>Token counts differ by model (up to ±5%).</li>
              <li>
                Frontier models are disproportionately pricey, particularly on the output
                tokens. Example: GPT 5.5 $5 input / $30 output per 1M tokens, vs GPT 5.4 half
                the cost! (May 2026)
              </li>
            </ul>
          </li>
          <li>
            When you&rsquo;re still setting up or developing your eval, run tests with
            <ul className={nestedListClass}>
              <li>a smaller model, e.g. a nano variant</li>
              <li>
                only one or two epochs. Pitfall: many eval run presets run ~10 epochs by
                default! Make sure to check config files!
              </li>
              <li>OpenRouter often offer some free models at limited quotas</li>
            </ul>
          </li>
          <li>
            To get an impression of your expected token costs&hellip;
            <ul className={nestedListClass}>
              <li>
                See{' '}
                <a href="https://www.vals.ai/" className={linkClass}>
                  Vals.ai
                </a>{' '}
                leaderboards with run costs per model for popular benchmarks, for example{' '}
                <a href="https://www.vals.ai/benchmarks/medcode" className={linkClass}>
                  MedCode
                </a>
                .
              </li>
              <li>Run your eval with a single epoch.</li>
            </ul>
          </li>
          <li>
            Pitfalls: when using APIs, make sure to check quota allowances (tokens per minute /
            TPM; tokens per day / TPD; requests per minute / RPM) and check if these are
            workable for your eval.
            <ul className={nestedListClass}>
              <li>If you run into &lsquo;quota exceeded&rsquo; issues, consider throttling your requests.</li>
              <li>E.g. OpenRouter free models have <em>very</em> limited quotas.</li>
              <li>
                Particularly mind tokens-per-day / TPD limits for long-running evals (e.g. that
                you let run overnight), as tight limits here might bring your eval run to a
                grinding halt.
              </li>
            </ul>
          </li>
        </ul>

        <h3 className={h3Class} style={bodyStyle}>
          Copyright considerations
        </h3>
        <p className={`${bodyClass} italic`} style={bodyStyle}>
          Below is not legal advice, please ensure compliance based on your individual
          location / jurisdiction.
        </p>
        <p className={bodyClass} style={bodyStyle}>
          When replicating papers and working with existing codebases or datasets, please do
          check for relevant copyright licenses.
        </p>
        <ul className={listClass} style={bodyStyle}>
          <li>
            For code, the copyright license will usually be stated on the GitHub / HuggingFace
            repo and/or in the code.
          </li>
          <li>
            <strong>No license = no permission!</strong> If you don&rsquo;t spot copyright
            statements in the usual places, the legal default is &lsquo;all rights
            reserved&rsquo;! Reach out to the authors for written permission. However, consider
            turnaround times for such correspondence and how much this blocks your
            project&rsquo;s progress.
          </li>
          <li>
            Workable licenses for you include the right to copy and modify the original
            code/data, and redistribute your version. Examples: MIT license, BSD, Apache 2.0,
            Creative Commons (data).
          </li>
        </ul>
        <p className={bodyClass} style={bodyStyle}>
          When publishing your work, please make sure to include license information yourself.
          Also mind license and attribution requirements resulting from the open-source
          material you used – some might require you to attribute the original authors, or
          redistribute under the same license.
        </p>

        <h2 className="section-h2 !mb-1 mt-10">AI Safety community</h2>

        <h3 className={h3Class} style={bodyStyle}>
          Fellowships and conferences
        </h3>
        <p className={bodyClass} style={bodyStyle}>
          See the overview on{' '}
          <a href="https://aisafety.com/events-and-training" className={linkClass}>
            AISafety.com
          </a>
          . Let me know if you&rsquo;re looking to apply for a fellowship or conference /
          conference workshop and want to use your project deliverable to support your
          application!
        </p>

        <h3 className={h3Class} style={bodyStyle}>
          Coworking
        </h3>
        <ul className={listClass} style={bodyStyle}>
          <li>
            <a href="https://far.ai/" className={linkClass}>
              FAR.AI
            </a>
            , Berkeley, CA.
          </li>
          <li>
            <a href="https://www.safeai.org.uk/" className={linkClass}>
              LISA
            </a>
            , London, UK. Most of the London-based fellowships are hosted here.
          </li>
          <li>
            <a href="https://www.aisafety.sg/coworking" className={linkClass}>
              SASH
            </a>
            , Singapore.
          </li>
        </ul>

        <h2 className="section-h2 !mb-1 mt-10">
          What comes after your BlueDot TAISP course finishes?
        </h2>
        <p className={bodyClass} style={bodyStyle}>
          Here&rsquo;s a great{' '}
          <a
            href="https://strategy.techne.ai/after-bluedot-what-can-I-do/method/"
            className={linkClass}
          >
            playbook
          </a>{' '}
          by Khullani Abdullahi!
        </p>

        <h2 className="section-h2 !mb-1 mt-10">Reading recommendations</h2>
        <p className={bodyClass} style={bodyStyle}>
          Broader reading list{' '}
          <Link to="/tais-reading-recs" className="font-semibold underline hover:no-underline">
            here
          </Link>
          .
        </p>
        <ul className={listClass} style={bodyStyle}>
          <li>
            Open Problems in Mechanistic Interpretability (2025){' '}
            <a href="https://arxiv.org/abs/2501.16496" className={linkClass}>
              arxiv.org/abs/2501.16496
            </a>
          </li>
          <li>
            <a
              href="https://docs.google.com/document/d/1b4uzouubZWNmrbkaZqh2nDgno0rFOnZVu7Obeia1YNY/edit?tab=t.0#heading=h.k5d1ti2xoxul"
              className={linkClass}
            >
              30 hr Open Weight Safety Projects
            </a>{' '}
            (by BlueDot&rsquo;s Sam Dower)
          </li>
          <li>
            200 Concrete Open Problems in MechInterp (2022){' '}
            <a
              href="https://www.alignmentforum.org/posts/LbrPTJ4fmABEdEnLf/200-concrete-open-problems-in-mechanistic-interpretability"
              className={linkClass}
            >
              Alignment Forum post
            </a>
          </li>
          <li>
            Best practices guide for creating transcript analysis rubrics{' '}
            <a
              href="https://www.techrxiv.org/doi/full/10.36227/techrxiv.177223089.95759468/v1"
              className={linkClass}
            >
              TechRxiv
            </a>
          </li>
          <li>
            SandboxEscapeBench:{' '}
            <a
              href="https://www.aisi.gov.uk/blog/can-ai-agents-escape-their-sandboxes-a-benchmark-for-safely-measuring-container-breakout-capabilities"
              className={linkClass}
            >
              AISI blog post
            </a>
          </li>
        </ul>
      </div>
    </article>
  )
}

export default TaispTips
