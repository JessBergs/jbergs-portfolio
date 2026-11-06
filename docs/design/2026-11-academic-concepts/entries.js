/* One model for every concept in this folder. Past work mirrors src/data/projects.json
   with a section each: project (papers, studies, built things) or talk (talks, panels,
   conferences, events organised). Month-level dates are approximate where the source only
   gives a year. Upcoming items and roles are placeholders to confirm. */

const IMG = '../../../public/images/';
window.IMG = IMG;
window.TODAY = '2026-11-06';

window.PERSON = {
  name: 'Jess Bergs',
  title: 'Engineering lead, Human-AI Interaction',
  org: 'UK AI Security Institute',
  orgHref: 'https://www.aisi.gov.uk/',
  place: 'London',
  photo: IMG + 'profile.png',
  statement: 'I study how people keep meaningful oversight of AI systems, and build the tools to find out.',
};

window.LINKS = [
  { label: 'hello@jbergs.eu', href: 'mailto:hello@jbergs.eu' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=jUpxHmsAAAAJ&hl=en' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jbergs/' },
  { label: 'Coffee chat', href: '/coffee-chat' },
];

window.BIO = [
  'I lead engineering for the human-in-the-loop research tools at the <a href="https://www.aisi.gov.uk/">UK AI Security Institute</a>: the platforms our scientists use to run experiments with people at scale. My own research is on human oversight of AI: what a spot-check is worth, when people follow AI advice, and how to design tooling so that oversight stays meaningful as systems do more of the work.',
  'Before AISI I worked in R&amp;D and public-sector innovation: explainable AI and social viewing at <a href="https://www.bbc.co.uk/rd">BBC R&amp;D</a>, EU Horizon energy projects, and a master’s in visualisation and serious games at the Glasgow School of Art. I mentor on the <a href="https://bluedot.org/courses/technical-ai-safety-project">BlueDot Impact</a>, <a href="https://sparai.org/">SPAR</a> and <a href="https://www.pivotal-research.org/mentors/profile/jess-bergs">Pivotal</a> fellowships, judge research sprints at <a href="https://apartresearch.com/">Apart Research</a>, and design board games.',
];

window.STATUS = { when: 'November 2026', text: 'This winter I am speaking at Liftoff, SASH and NeurIPS in Sydney, and hosting an AI safety social there. From 2027 I advise on the Pivotal fellowship. I keep a few <a href="/coffee-chat">coffee-chat slots</a> a month for people moving into AI safety or oversight research.' };

window.UPCOMING = [
  { iso: '2026-11-12', date: '12 Nov', year: 2026, kind: 'speaking',   role: 'Talk',             title: 'Liftoff',                      place: '', note: 'details to follow' },
  { iso: '2026-12-03', date: '3 Dec',  year: 2026, kind: 'speaking',   role: 'Talk',             title: 'SASH',                         place: '' },
  { iso: '2026-12-11', date: '11 Dec', year: 2026, kind: 'speaking',   role: 'Panel',            title: 'NeurIPS 2026',                 place: 'Sydney' },
  { iso: '2026-12-11', date: '11 Dec', year: 2026, kind: 'organising', role: 'Host',             title: 'AI safety social at NeurIPS',  place: 'Sydney', tbc: true },
  { iso: '2027-01-15', date: 'Q1 2027', year: 2027, kind: 'mentoring', role: 'Research advisor', title: 'Pivotal AI Safety Fellowship', place: '' },
  { iso: '2027-02-16', date: '16 Feb', year: 2027, kind: 'speaking',   role: 'Talk',             title: 'Vrije Universiteit Brussel',   place: 'Brussels' },
];

window.ROLES = [
  { org: 'BlueDot Impact',           role: 'Mentor, Technical AI Safety Project', since: '2026' },
  { org: 'SPAR',                     role: 'Research mentor',                     since: 'Autumn 2026' },
  { org: 'Pivotal Research',         role: 'Research advisor',                    since: 'from 2027', future: true },
  { org: 'Apart Research',           role: 'Research sprint judge',               since: '2026' },
  { org: 'Global Challenges Project', role: 'Expert invitee',                     since: '2026' },
  { org: '80,000 Hours',             role: 'Career advising, occasionally',       since: '2026' },
];

window.PROJECTS = [
  { id: 'arxiv-political-knowledge', iso: '2026-10-06', year: 2026, when: 'Oct 2026', type: 'Paper',   title: 'Conversational AI increases political knowledge as effectively as self-directed internet search', venue: 'PNAS Nexus', image: IMG + 'pnas-nexus-political-knowledge.jpg', blurb: 'A survey of 2,499 people and randomised trials with 2,858 around the 2024 UK election.' },
  { id: 'spar-auditing-games-debate', iso: '2026-09-01', year: 2026, when: 'Autumn 2026', type: 'Project', title: 'Auditing games for debate: can models learn human spot-checking patterns?', venue: 'SPAR, mentor', image: IMG + 'spar-auditing-games-for-debate.jpg', blurb: 'A mentored research project with Konstantinos Voudouris.' },
  { id: 'aisi-future-of-work',       iso: '2026-06-01', year: 2026, when: '2026',     type: 'Study',   title: 'AI and the future of work: measuring AI-driven productivity gains for workplace tasks', venue: 'UK AISI', image: IMG + 'aisi-ai-and-the-future-of-work.jpg', blurb: '500 participants. Work with AI assistance was rated 25% higher in quality and finished 61% faster.' },
  { id: 'arxiv-ai-advice',           iso: '2025-11-15', year: 2025, when: 'Nov 2025', type: 'Preprint', title: 'AI advice-giving: who follows it, and does it help?', venue: 'arXiv', image: IMG + 'arxiv.jpg', blurb: '75% followed GPT-4o advice on personal matters. No sustained gain in well-being.' },
  { id: 'bbc-together',              iso: '2020-06-01', year: 2021, when: '2020 to 2021', type: 'Project', title: 'BBC Together: synchronised social viewing on iPlayer', venue: 'BBC R&D', image: IMG + 'bbcTogether.jpg', blurb: 'Eighteen months live on BBC Taster.' },
  { id: 'bbc-explainable-ai',        iso: '2019-06-01', year: 2021, when: '2019 to 2021', type: 'Project', title: 'Making AI more understandable', venue: 'BBC R&D', image: IMG + 'MakingAIUnderstandable.jpg', blurb: 'Explainable AI prototypes: generative art and interactive visualisations.' },
  { id: 'trent-basin',               iso: '2018-03-01', year: 2019, when: '2018 to 2019', type: 'Project', title: 'Trent Basin community information model', venue: 'IES Ltd', image: IMG + 'trent.jpg', blurb: 'Visualising building energy data for a re-development in Nottingham.' },
  { id: 'entrust',                   iso: '2015-06-01', year: 2018, when: '2015 to 2018', type: 'Project', title: 'ENTRUST: energy citizenship and community engagement', venue: 'EU Horizon 2020', image: IMG + 'EntrustHorizon.png', blurb: 'Requirements and UX for a sustainable energy transitions project.' },
  { id: 'lab2',                      iso: '2015-06-01', year: 2015, when: '2015',     type: 'Thesis',  title: 'Lab², a cross-reality game for team building', venue: 'iLRN 2015, best research poster', image: IMG + 'lab2.jpg', blurb: 'Master’s thesis, Glasgow School of Art.' },
];

window.TALKS = [
  { id: 'women4aisafety-talk',      iso: '2026-10-28', year: 2026, when: 'Oct 2026', type: 'Talk',         title: 'Pathways into technical AI safety',             venue: 'Women4AISafety', place: 'online', image: IMG + 'women4aisafety-2026.jpg' },
  { id: 'lateral-workshop-2026',    iso: '2026-09-11', year: 2026, when: 'Sep 2026', type: 'Expert invitee', title: 'Lateral Workshop',                            venue: 'Lateral', place: 'Berkeley', image: IMG + 'lateral-workshop-2026.jpg' },
  { id: 'successif-womens-retreat', iso: '2026-06-15', year: 2026, when: 'Jun 2026', type: 'Invitee',      title: 'Women in AI Safety Retreat',                    venue: 'Successif', place: 'Pendley Manor', image: IMG + 'successif-womens-retreat-2026.jpg' },
  { id: 'aisi-eurips-2025',         iso: '2025-12-03', year: 2025, when: 'Dec 2025', type: 'Host',         title: 'AISI social at EurIPS',                         venue: 'EurIPS', place: 'Copenhagen', image: IMG + 'eurips.jpg' },
  { id: 'public-design-conference', iso: '2025-09-11', year: 2025, when: 'Sep 2025', type: 'Co-organiser', title: 'Public Design Conference',                      venue: 'World Design Congress', place: 'London', image: IMG + 'publicDesignConf.jpg' },
  { id: 'chi-staig-2025',           iso: '2025-04-27', year: 2025, when: 'Apr 2025', type: 'Panel',        title: 'What is sociotechnical about AI governance?',  venue: 'STAIG workshop, CHI 2025', place: 'Yokohama', image: IMG + 'staig-chi.jpg' },
  { id: 'services-week-2025',       iso: '2025-03-01', year: 2025, when: 'Mar 2025', type: 'Talk',         title: 'AISI’s research tools for service designers', venue: 'Services Week, UK government', place: 'London', image: IMG + 'servicesWeek2025.png' },
  { id: 'bbc-tech-meetup',          iso: '2019-03-01', year: 2021, when: '2019 to 2021', type: 'Co-organiser', title: 'BBC Tech Meetup',                           venue: 'BBC', place: 'London', image: IMG + 'bbctechmeetup.jpg' },
  { id: 'tedx-stuttgart',           iso: '2011-03-01', year: 2018, when: '2011 to 2018', type: 'Co-organiser', title: 'TEDxStuttgart',                             venue: 'TEDx', place: 'Stuttgart', image: IMG + 'tedxstuttgartnexteveent.jpg' },
];

window.esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
window.byDateDesc = (list) => [...list].sort((a, b) => (a.iso < b.iso ? 1 : -1));
