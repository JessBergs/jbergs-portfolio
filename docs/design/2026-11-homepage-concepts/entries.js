/* One model for everything on the page. Past work mirrors src/data/projects.json; dates at
   month level are approximate where the source only gives a year. Upcoming items and roles
   are the placeholders to confirm. "kind" picks one of five inks, used consistently:
   speaking, research, mentoring, organising, judging. */

const IMG = '../../../public/images/';
window.TODAY = '2026-11-06';

window.KINDS = {
  speaking:   { label: 'Speaking',   ink: 'apricot' },
  research:   { label: 'Research',   ink: 'sky' },
  mentoring:  { label: 'Mentoring',  ink: 'lilac' },
  organising: { label: 'Organising', ink: 'rose' },
  judging:    { label: 'Judging',    ink: 'sand' },
};

window.INTRO = 'I lead engineering for the human-in-the-loop research tools at the UK AI Security Institute, and my own research is on how people can keep oversight of AI systems. On the side, I design board games.';

window.LINKS = [
  { label: 'hello@jbergs.eu', href: 'mailto:hello@jbergs.eu' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jbergs/' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=jUpxHmsAAAAJ&hl=en' },
  { label: 'Book a coffee chat', href: '/coffee-chat' },
];

window.UPCOMING = [
  { iso: '2026-11-12', day: '12', mon: 'Nov', date: 'Thu 12 Nov', year: 2026, kind: 'speaking',   role: 'Talk',             title: 'Liftoff',                         place: '', note: 'details to follow' },
  { iso: '2026-12-03', day: '3',  mon: 'Dec', date: '3 Dec',      year: 2026, kind: 'speaking',   role: 'Talk',             title: 'SASH',                            place: '' },
  { iso: '2026-12-11', day: '11', mon: 'Dec', date: '11 Dec',     year: 2026, kind: 'speaking',   role: 'Panel',            title: 'NeurIPS 2026',                    place: 'Sydney' },
  { iso: '2026-12-11', day: '11', mon: 'Dec', date: '11 Dec',     year: 2026, kind: 'organising', role: 'Host',             title: 'AI safety social at NeurIPS',     place: 'Sydney', tbc: true },
  { iso: '2027-01-15', day: 'Q1', mon: '2027', date: 'Q1 2027',   year: 2027, kind: 'mentoring',  role: 'Research advisor', title: 'Pivotal AI Safety Fellowship',    place: '' },
  { iso: '2027-02-16', day: '16', mon: 'Feb', date: '16 Feb',     year: 2027, kind: 'speaking',   role: 'Talk',             title: 'Vrije Universiteit Brussel',      place: 'Brussels' },
];

window.ROLES = [
  { org: 'UK AI Security Institute', short: 'AISI', role: 'Engineering lead, Human-AI Interaction', since: '2024', kind: 'research',   from: '2024-01' },
  { org: 'BlueDot Impact',           short: 'BD',   role: 'Mentor, Technical AI Safety Project',     since: '2026', kind: 'mentoring',  from: '2026-03' },
  { org: 'SPAR',                     short: 'SPAR', role: 'Research mentor',                         since: 'Autumn 2026', kind: 'mentoring', from: '2026-09' },
  { org: 'Apart Research',           short: 'Apart', role: 'Research sprint judge',                  since: '2026', kind: 'judging',    from: '2026-06' },
  { org: 'Global Challenges Project', short: 'GCP', role: 'Expert invitee',                          since: '2026', kind: 'mentoring',  from: '2026-06' },
  { org: '80,000 Hours',             short: '80k',  role: 'Career advising, occasionally',           since: '2026', kind: 'mentoring',  from: '2026-06' },
  { org: 'Pivotal Research',         short: 'Pivotal', role: 'Research advisor',                     since: 'from Q1 2027', kind: 'mentoring', from: '2027-01', future: true },
];

window.PAST = [
  { id: 'women4aisafety-talk',        iso: '2026-10-28', year: 2026, when: 'Oct 2026', kind: 'speaking',   role: 'Guest speaker', title: 'Women4AISafety',                                 org: 'Women4AISafety', place: 'online', image: IMG + 'women4aisafety-2026.jpg', blurb: 'Talk: Pathways into Technical AI Safety.' },
  { id: 'arxiv-political-knowledge',  iso: '2026-10-06', year: 2026, when: 'Oct 2026', kind: 'research',   role: 'Paper',         title: 'AI and political knowledge',                     org: 'PNAS Nexus', place: '', image: IMG + 'pnas-nexus-political-knowledge.jpg', blurb: 'Survey (n = 2,499) and randomised trials (n = 2,858) around the 2024 UK election.' },
  { id: 'lateral-workshop-2026',      iso: '2026-09-11', year: 2026, when: 'Sep 2026', kind: 'mentoring',  role: 'Expert invitee', title: 'Lateral Workshop',                              org: 'Lateral', place: 'Berkeley', image: IMG + 'lateral-workshop-2026.jpg', blurb: 'One-to-ones on career pathways for professionals moving into AI safety.' },
  { id: 'spar-auditing-games-debate', iso: '2026-09-01', year: 2026, when: 'Autumn 2026', kind: 'mentoring', role: 'Mentor',      title: 'Auditing games for debate',                      org: 'SPAR', place: 'remote', image: IMG + 'spar-auditing-games-for-debate.jpg', blurb: 'Can models learn human spot-checking patterns?', to: '2026-12-15' },
  { id: 'successif-womens-retreat',   iso: '2026-06-15', year: 2026, when: '2026',     kind: 'speaking',   role: 'Invitee',        title: 'Women in AI Safety Retreat',                     org: 'Successif', place: 'Pendley Manor', image: IMG + 'successif-womens-retreat-2026.jpg', blurb: 'Three days with 35 women in technical AI safety, governance and leadership.' },
  { id: 'aisi-future-of-work',        iso: '2026-06-01', year: 2026, when: '2026',     kind: 'research',   role: 'Study',          title: 'AI and the future of work',                      org: 'UK AISI', place: '', image: IMG + 'aisi-ai-and-the-future-of-work.jpg', blurb: '500 participants: 25% higher quality, 61% faster with AI assistance.' },
  { id: 'bluedot-taisp-mentor',       iso: '2026-03-01', year: 2026, when: 'since Mar 2026', kind: 'mentoring', role: 'Mentor',   title: 'Technical AI Safety Project',                    org: 'BlueDot Impact', place: 'remote', image: IMG + 'bluedot-taisp.jpg', blurb: 'Guiding cohorts to a first contribution to AI safety.', to: '2026-11-06' },
  { id: 'aisi-eurips-2025',           iso: '2025-12-03', year: 2025, when: 'Dec 2025', kind: 'organising', role: 'Organiser',      title: 'AISI social at EurIPS',                          org: 'UK AISI', place: 'Copenhagen', image: IMG + 'eurips.jpg', blurb: 'Around 50 people from the AI safety research community.' },
  { id: 'arxiv-ai-advice',            iso: '2025-11-15', year: 2025, when: 'Nov 2025', kind: 'research',   role: 'Study',          title: 'AI advice-giving',                               org: 'UK AISI', place: '', image: IMG + 'arxiv.jpg', blurb: '75% followed GPT-4o advice on personal matters; no sustained well-being gain.' },
  { id: 'public-design-conference',   iso: '2025-09-11', year: 2025, when: 'Sep 2025', kind: 'organising', role: 'Co-organiser',   title: 'Public Design Conference',                       org: 'World Design Congress', place: 'London', image: IMG + 'publicDesignConf.jpg', blurb: 'First global conference for government designers, with the RCA and the GLA.' },
  { id: 'chi-staig-2025',             iso: '2025-04-27', year: 2025, when: 'Apr 2025', kind: 'speaking',   role: 'Panel',          title: 'Sociotechnical AI governance, CHI 2025',         org: 'CHI STAIG', place: 'Yokohama', image: IMG + 'staig-chi.jpg', blurb: 'Panel at the CHI workshop on sociotechnical AI governance.' },
  { id: 'services-week-2025',         iso: '2025-03-01', year: 2025, when: 'Mar 2025', kind: 'speaking',   role: 'Talk',           title: 'Services Week',                                  org: 'UK government', place: 'London', image: IMG + 'servicesWeek2025.png', blurb: "AISI's research tools, presented to public-sector service designers." },
  { id: 'bbc-together',               iso: '2020-06-01', year: 2021, when: '2020 to 2021', kind: 'research', role: 'Project',      title: 'BBC Together',                                   org: 'BBC R&D', place: 'London', image: IMG + 'bbcTogether.jpg', blurb: 'Synchronised social viewing on iPlayer; 18 months on BBC Taster.', to: '2021-06-01' },
  { id: 'bbc-explainable-ai',         iso: '2019-06-01', year: 2021, when: '2019 to 2021', kind: 'research', role: 'Project',      title: 'Making AI more understandable',                  org: 'BBC R&D', place: 'London', image: IMG + 'MakingAIUnderstandable.jpg', blurb: 'Explainable AI prototypes, including generative art and interactive visualisations.', to: '2021-06-01' },
  { id: 'bbc-tech-meetup',            iso: '2019-03-01', year: 2021, when: '2019 to 2021', kind: 'organising', role: 'Co-organiser', title: 'BBC Tech Meetup',                             org: 'BBC', place: 'London', image: IMG + 'bbctechmeetup.jpg', blurb: 'Knowledge sharing on technologies and development practice.', to: '2021-06-01' },
  { id: 'trent-basin',                iso: '2018-03-01', year: 2019, when: '2018 to 2019', kind: 'research', role: 'Experience design', title: 'Trent Basin community information model',  org: 'IES Ltd', place: 'Nottingham', image: IMG + 'trent.jpg', blurb: 'Visualising building energy data for a re-development project.', to: '2019-06-01' },
  { id: 'entrust',                    iso: '2015-06-01', year: 2018, when: '2015 to 2018', kind: 'research', role: 'Requirements and UX', title: 'EU Horizon ENTRUST',                  org: 'IES Ltd', place: 'Glasgow', image: IMG + 'EntrustHorizon.png', blurb: 'Energy citizenship and community engagement in sustainable energy transitions.', to: '2018-06-01' },
  { id: 'lab2',                       iso: '2015-06-01', year: 2015, when: '2015',     kind: 'research',   role: "Master's thesis", title: 'Lab², a cross-reality game for team building', org: 'Glasgow School of Art', place: 'Glasgow', image: IMG + 'lab2.jpg', blurb: 'Best research poster at iLRN.' },
  { id: 'masters-portfolio',          iso: '2014-09-01', year: 2015, when: '2014 to 2015', kind: 'research', role: 'MSc',          title: 'Visualisation and serious games',                org: 'Glasgow School of Art', place: 'Glasgow', image: IMG + 'masterspf.jpg', blurb: 'Lab², GoMA and Spartathlon.', to: '2015-09-01' },
  { id: 'tedx-stuttgart',             iso: '2011-03-01', year: 2018, when: '2011 to 2018', kind: 'organising', role: 'Co-organiser', title: 'TEDxStuttgart',                               org: 'TEDx', place: 'Stuttgart', image: IMG + 'tedxstuttgartnexteveent.jpg', blurb: 'Seven years of an event series on technology, education and design.', to: '2018-06-01' },
];

window.byYearDesc = (list) => [...list].sort((a, b) => (a.iso < b.iso ? 1 : -1));
window.esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
window.linksHtml = (cls = '') => window.LINKS.map((l) => `<a class="${cls}" href="${l.href}">${l.label}</a>`).join('');
