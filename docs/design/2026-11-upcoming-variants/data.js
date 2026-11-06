/* Mockup data for the five "upcoming + roles" homepage variants.
   Tiles mirror src/data/projects.json (image paths rewritten for the docs folder).
   Upcoming items and roles are placeholders for the content Jess asked to add. */

const IMG = '../../../public/images/';

window.UPCOMING = [
  { iso: '2026-11-12', day: '12', mon: 'Nov', year: '2026', when: 'Thu 12 Nov 2026', kind: 'Talk',    title: 'Liftoff',                         where: 'details to follow' },
  { iso: '2026-12-03', day: '03', mon: 'Dec', year: '2026', when: '3 Dec 2026',      kind: 'Talk',    title: 'SASH',                            where: '' },
  { iso: '2026-12-11', day: '11', mon: 'Dec', year: '2026', when: '11 Dec 2026',     kind: 'Panel',   title: 'NeurIPS 2026',                    where: 'Sydney' },
  { iso: '2026-12-11', day: '11', mon: 'Dec', year: '2026', when: '11 Dec 2026',     kind: 'Host',    title: 'AI safety social at NeurIPS',     where: 'Sydney', tbc: true },
  { iso: '2027-01-01', day: 'Q1', mon: '2027', year: '2027', when: 'Q1 2027',        kind: 'Advisor', title: 'Pivotal AI Safety Fellowship',    where: 'research advisor', quarter: true },
  { iso: '2027-02-16', day: '16', mon: 'Feb', year: '2027', when: '16 Feb 2027',     kind: 'Talk',    title: 'Vrije Universiteit Brussel (VUB)', where: 'Brussels' },
];

window.ROLES = [
  { org: 'UK AI Security Institute', role: 'Engineering lead, Human-AI Interaction', since: 'since 2024', url: 'https://www.aisi.gov.uk/' },
  { org: 'BlueDot Impact',           role: 'Mentor & facilitator, Technical AI Safety Project', since: 'since 2026', url: 'https://bluedot.org/courses/technical-ai-safety-project' },
  { org: 'SPAR',                     role: 'Research mentor', since: 'Fall 2026', url: 'https://sparai.org/' },
  { org: 'Apart Research',           role: 'Research sprint judge', since: '2026', url: 'https://apartresearch.com/sprints' },
  { org: 'Global Challenges Project',role: 'Expert invitee', since: '2026', url: '#' },
  { org: '80,000 Hours',             role: 'Career advising, occasional', since: '2026', url: 'https://80000hours.org/' },
  { org: 'Pivotal Research',         role: 'Research advisor', since: 'from Q1 2027', url: 'https://www.pivotal-research.org/mentors/profile/jess-bergs' },
];

window.PROJECTS = [
  { id: 'lateral-workshop-2026', year: '2026', image: IMG + 'lateral-workshop-2026.jpg', title: 'Lateral Workshop 2026 – Expert Invitee', description: 'Ran one-to-ones and small-group sessions on career pathways into the field for experienced professionals from policy and comms backgrounds during a three-day workshop in Berkeley.', categories: ['Public Speaking', 'Mentorship', 'AI Security'] },
  { id: 'spar-auditing-games-debate', year: '2026', image: IMG + 'spar-auditing-games-for-debate.jpg', title: 'Auditing Games for Debate: Can Models Learn Human Spot-Checking Patterns?', description: 'Mentoring a Fall 2026 AI safety research project through the SPAR fellowship by Kairos, studying whether models can learn the patterns behind human spot-checks used for AI oversight.', categories: ['Mentorship', 'AI Security', 'Scalable Oversight'] },
  { id: 'aisi-future-of-work', year: '2026', image: IMG + 'aisi-ai-and-the-future-of-work.jpg', title: 'AI and the Future of Work – Study', description: 'UK AISI pilot study measuring AI-driven productivity gains across workplace tasks. The study with 500 participants found 25% higher quality and 61% faster completion with AI assistance.', categories: ['Research Tooling', 'Empirical Study', 'AI Security', 'Paper'] },
  { id: 'arxiv-ai-advice', year: '2025', image: IMG + 'arxiv.jpg', title: 'AI Advice-Giving – Study', description: 'UK AISI longitudinal controlled study examining how people follow AI advice. Found 75% of participants followed GPT-4o advice on personal matters, though with no sustained well-being improvements.', categories: ['Research Tooling', 'Empirical Study', 'AI Security', 'Paper'] },
  { id: 'arxiv-political-knowledge', year: '2026', image: IMG + 'pnas-nexus-political-knowledge.jpg', title: 'AI and Political Knowledge – PNAS Nexus', description: 'UK AISI survey (n = 2,499) and randomised trials (n = 2,858) around the 2024 UK election. 13% of eligible voters used AI chatbots for political information; AI raised political knowledge as much as internet search.', categories: ['Research Tooling', 'Empirical Study', 'AI Security', 'Paper'] },
  { id: 'bluedot-taisp-mentor', year: '2026', image: IMG + 'bluedot-taisp.jpg', title: 'BlueDot Technical AI Safety Project – Mentor & Facilitator', description: "Since March 2026 I've been working with BlueDot Impact on guiding technical talent through regular cohorts to a first impactful contribution to AI safety.", categories: ['Mentorship', 'AI Security'] },
  { id: 'successif-womens-retreat', year: '2026', image: IMG + 'successif-womens-retreat-2026.jpg', title: 'Successif Women in AI Safety Retreat', description: 'Invitee at a three-day residential conference at Pendley Manor for 35 women with established careers in technical AI safety, AI governance and organisational leadership.', categories: ['AI Security', 'Public Speaking', 'Conference'] },
  { id: 'women4aisafety-talk', year: '2026', image: IMG + 'women4aisafety-2026.jpg', title: 'Women4AISafety – Guest Speaker', description: 'Guest speaker at Women4AISafety, the career network for women entering or working in AI safety. Talk: Pathways into Technical AI Safety.', categories: ['AI Security', 'Public Speaking'] },
  { id: 'public-design-conference', year: '2025', image: IMG + 'publicDesignConf.jpg', title: 'Public Design Conference 2025', description: 'Co-organised the inaugural global public design conference bringing together government designers worldwide. Part of World Design Congress, with the Royal College of Art and Greater London Authority.', categories: ['Event Organisation', 'Conference'] },
  { id: 'services-week-2025', year: '2025', image: IMG + 'servicesWeek2025.png', title: 'AISI HAI @ Services Week 2025', description: "Presented AISI's research tools at Services Week 2025, the UK government's annual event for public sector professionals on service design and digital innovation.", categories: ['Public Speaking', 'Conference'] },
  { id: 'chi-staig-2025', year: '2025', image: IMG + 'staig-chi.jpg', title: 'AISI HAI @ CHI 2025 STAIG Panel', description: 'Panel speaker at the CHI 2025 workshop on Sociotechnical AI Governance: Opportunities and Challenges for HCI. Hybrid event held in Yokohama, Japan.', categories: ['Public Speaking', 'Conference', 'AI Security'] },
  { id: 'aisi-eurips-2025', year: '2025', image: IMG + 'eurips.jpg', title: 'AISI EurIPS 2025 Social', description: "Organised the UK AI Security Institute's social during EurIPS 2025 in Copenhagen, bringing together roughly 50 attendees from the AI safety research community.", categories: ['Event Organisation', 'AI Security'] },
  { id: 'bbc-explainable-ai', year: '2019-2021', image: IMG + 'MakingAIUnderstandable.jpg', title: 'Making AI More Understandable', description: 'BBC R&D project researching Explainable AI to make AI decision-making transparent and interpretable. Prototyped ML-powered proofs-of-concept.', categories: ['Explainable AI', 'Experimental'] },
  { id: 'bbc-together', year: '2020-2021', image: IMG + 'bbcTogether.jpg', title: 'BBC Together', description: 'A trial of a social watching and listening experience from BBC R&D. Multi-user iPlayer viewer enabling synchronised viewing. Ran on BBC Taster for 1.5 years.', categories: ['Real-Time Collaboration', 'Experimental'] },
  { id: 'bbc-tech-meetup', year: '2019-2021', image: IMG + 'bbctechmeetup.jpg', title: 'BBC Tech Meetup', description: 'Co-organised the BBC Tech Meetup, facilitating knowledge sharing on latest technologies and development practices.', categories: ['Event Organisation'] },
  { id: 'trent-basin', year: '2018-2019', image: IMG + 'trent.jpg', title: 'Trent Basin Community Information Model', description: 'Experience design for a data visualisation of building energy data for the Trent Basin re-development project while at IES Ltd.', categories: ['Energy Efficiency'] },
  { id: 'entrust', year: '2015-2018', image: IMG + 'EntrustHorizon.png', title: 'EU HORIZON – ENTRUST', description: 'EU H2020 R&D project at IES Ltd on energy efficiency for the built environment and social factors in energy citizenship. Led requirements analysis and UX development.', categories: ['Energy Efficiency'] },
  { id: 'lab2', year: '2015', image: IMG + 'lab2.jpg', title: 'Lab² – A collaborative cross-reality game for virtual team building', description: "Master's thesis project. A collaborative cross-reality game for virtual team building. Best Research Poster at iLRN.", categories: ['Paper', 'Experimental', 'Real-Time Collaboration'] },
  { id: 'masters-portfolio', year: '2014-2015', image: IMG + 'masterspf.jpg', title: "Master's Portfolio", description: 'Three projects from my M.Sc. in Visualisation: Serious Games Development at Glasgow School of Art: Lab², GoMA and Spartathlon.', categories: ['Experimental'] },
  { id: 'tedx-stuttgart', year: '2011-2018', image: IMG + 'tedxstuttgartnexteveent.jpg', title: 'TEDxStuttgart', description: 'Co-organised the TEDx event series showcasing ideas in technology, education and design from and for Stuttgart and Baden-Württemberg.', categories: ['Event Organisation', 'Conference'] },
];

/* Shared renderers */
window.renderTile = function (p, opts = {}) {
  const compact = opts.compact ? ' project-card--compact' : '';
  const tags = (p.categories || []).map((c) => `<span class="project-card__tag">${c}</span>`).join('');
  const desc = opts.compact ? '' : `<p class="project-card__desc">${p.description}</p>`;
  return `<li><a class="project-card${compact}" href="#">
    <div class="project-card__media"><img src="${p.image}" alt="" loading="eager"></div>
    <div class="project-card__body">
      <h3 class="project-card__title">${p.title}</h3>${desc}
      <div class="project-card__tags">${tags}</div>
    </div></a></li>`;
};

window.allCategories = function () {
  return Array.from(new Set(window.PROJECTS.flatMap((p) => p.categories))).sort();
};

window.renderFilters = function () {
  return `<div class="filters"><div class="pills"><button class="filter-pill filter-pill--on">All</button>${window
    .allCategories()
    .map((c) => `<button class="filter-pill">${c}</button>`)
    .join('')}</div><input class="search-input" placeholder="Search…" aria-label="Search projects"></div>`;
};

/* Shared page chrome: header, hero, about copy, footer. */
const ICON = {
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  scholar: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  coffee: '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>',
};
const svg = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;

window.renderHeader = function (items) {
  return `<header class="site-header"><div class="wrap"><nav aria-label="Primary">${items
    .map((i) => `<a href="#${i.toLowerCase()}">${i}</a>`)
    .join('')}</nav></div></header>`;
};

window.renderHero = function (opts = {}) {
  const sub = opts.sub || 'R&amp;D Engineering Lead<br>Human-AI Interaction @ UK AISI, Research Unit';
  return `<section class="hero" aria-labelledby="hero-title">
    <h1 id="hero-title" class="hero-h1">Jess Bergs</h1>
    <p class="hero-sub">${sub}</p>
    ${opts.extra || ''}
    <ul class="hero-links">
      <li>${svg('mail')}<a href="#">hello@jbergs.eu</a></li>
      <li>${svg('linkedin')}<a href="#">LinkedIn</a></li>
      <li>${svg('scholar')}<a href="#">Google Scholar</a></li>
      <li>${svg('coffee')}<a href="#">Let&rsquo;s have a coffee chat!</a></li>
    </ul></section>`;
};

/* About copy as on main today, minus the mentoring paragraph (that moves into the roles block). */
window.ABOUT = {
  work: `I&rsquo;m an engineering lead at the <a href="#">UK AI Security Institute</a> for our human-in-the-loop research tools, enabling our scientists to run their empirical research experiments at scale.`,
  research: `Currently, my independent research focuses on how we can design for effective scalable human oversight.`,
  career: `My career so far has been in R&amp;D and public sector innovation, from EU Horizon projects to Explainable AI at BBC R&amp;D and since 2024 technical AI safety in the British government.`,
  mentoring: `I&rsquo;m mentoring at BlueDot Impact&rsquo;s <a href="#">Technical AI Safety Project</a> programme and the <a href="#">SPAR</a> and <a href="#">Pivotal</a> research fellowships.`,
  generalist: `I&rsquo;m a proud generalist and love bringing people together through events &amp; conferences I (co-)organise. Outside work, I design and playtest board games!`,
};

window.renderAbout = function (keys, heading = 'Hi, there!') {
  return `<section id="about" class="about"><h2 class="section-h2" style="margin-bottom:1.25rem">${heading}</h2>${keys
    .map((k) => `<p>${window.ABOUT[k]}</p>`)
    .join('')}</section>`;
};

window.renderFooter = function () {
  return `<footer id="contact" class="site-footer"><div class="wrap"><p>© 2026 Jessica Bergs</p><p><a href="#">Contact</a></p></div></footer>`;
};

window.kindClass = (k) => 'kind kind--' + k.toLowerCase();
