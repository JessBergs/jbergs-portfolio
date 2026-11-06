/* Render helpers shared by the concepts. Each returns an HTML string; the page's CSS
   decides how it looks. Options choose thumbnail size and whether to show summaries. */
const P = {};
P.links = (sep = '') => LINKS.map((l) => `<a href="${l.href}">${esc(l.label)}</a>`).join(sep);
P.photo = (cls = '') => `<img class="${cls}" src="${PERSON.photo}" alt="${esc(PERSON.name)}" width="462" height="456">`;
P.name = () => `<h1>${esc(PERSON.name)}</h1>`;
P.titleLines = () => `<p class="title">${esc(PERSON.title)}<br><a href="${PERSON.orgHref}">${esc(PERSON.org)}</a>, ${esc(PERSON.place)}</p>`;
P.statement = () => `<p class="statement">${esc(PERSON.statement)}</p>`;
P.bio = () => BIO.map((p) => `<p>${p}</p>`).join('');
P.status = (withDate = true) => `<p class="status">${withDate ? `<b>${esc(STATUS.when)}.</b> ` : ''}${STATUS.text}</p>`;
P.upcoming = () => UPCOMING.map((u) => `
  <div class="row k-${u.kind}">
    <div class="d">${esc(u.date)}</div>
    <div class="t"><span class="ti">${esc(u.title)}</span>${u.place ? `, ${esc(u.place)}` : ''}<span class="m"><span class="ty">${esc(u.role)}</span>${u.tbc ? ' · date to be confirmed' : ''}${u.note ? ` · ${esc(u.note)}` : ''}</span></div>
  </div>`).join('');
P.projects = ({ summary = true, n = PROJECTS.length } = {}) => PROJECTS.slice(0, n).map((p) => `
  <div class="row proj">
    <div class="d">${esc(p.when)}</div>
    <figure><img src="${p.image}" alt="" loading="lazy"></figure>
    <div class="t"><a class="ti" href="#">${esc(p.title)}</a><span class="m"><span class="ty">${esc(p.type)}</span>, ${esc(p.venue)}</span>${summary ? `<span class="s">${esc(p.blurb)}</span>` : ''}</div>
  </div>`).join('');
P.talks = ({ thumbs = true } = {}) => TALKS.map((t) => `
  <div class="row talk">
    <div class="d">${esc(t.when)}</div>
    ${thumbs ? `<figure><img src="${t.image}" alt="" loading="lazy"></figure>` : ''}
    <div class="t"><span class="ti">${esc(t.title)}</span><span class="m"><span class="ty">${esc(t.type)}</span>, ${esc(t.venue)}${t.place ? `, ${esc(t.place)}` : ''}</span></div>
  </div>`).join('');
P.roles = () => ROLES.map((r) => `<div class="row"><div class="d">${esc(r.since)}</div><div class="t"><span class="ti">${esc(r.org)}</span><span class="m">${esc(r.role)}</span></div></div>`).join('');
P.updated = () => `<p class="updated">Last updated November 2026.</p>`;
window.P = P;
