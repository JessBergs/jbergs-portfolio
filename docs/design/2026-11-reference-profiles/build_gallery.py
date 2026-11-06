#!/usr/bin/env python3
"""Build the high-profile gallery page from sites-high-profile.json, the capture metadata in
shots/<key>.json, and the one-line notes in notes-high-profile.json. Grouped by field;
sites whose capture failed or redirected somewhere else are listed at the end."""
import json, os, html
from collections import OrderedDict

here = os.path.dirname(os.path.abspath(__file__))
sites = json.load(open(os.path.join(here, 'sites-high-profile.json')))
notes = json.load(open(os.path.join(here, 'notes-high-profile.json'))) if os.path.exists(os.path.join(here, 'notes-high-profile.json')) else {}

def meta(k):
    p = os.path.join(here, 'shots', k + '.json')
    return json.load(open(p)) if os.path.exists(p) else {}

groups = OrderedDict()
failed = []
for k, s in sites.items():
    m = meta(k)
    ok = m.get('status') and m['status'] < 400 and not m.get('error') and os.path.exists(os.path.join(here, 'shots', k + '-fold.jpg'))
    if not ok:
        failed.append((k, s, m)); continue
    groups.setdefault(s['field'], []).append((k, s, m))

order = ['AI and machine learning', 'AI safety and alignment', 'HCI and visualisation', 'Cognitive science', 'Theory and algorithms', 'Programming languages', 'Computer science, classic', 'Security and systems', 'Mathematics and physics', 'Economics and statistics', 'Networks and complexity', 'Philosophy and ethics', 'Technology and society']
sections = ''
for f in order + [g for g in groups if g not in order]:
    if f not in groups: continue
    cards = ''
    for k, s, m in groups[f]:
        n = notes.get(k, '')
        host = s['url'].replace('https://', '').replace('http://', '').rstrip('/')
        flag = ('<p class="n"><i>' + html.escape(s['note']) + '</i></p>') if s.get('note') else ''
        cards += f'''
    <article>
      <a href="shots/{k}-full.jpg"><img src="shots/{k}-fold.jpg" alt="" loading="lazy"></a>
      <h3>{html.escape(s['who'])}</h3>
      <p><a href="{html.escape(s['url'])}">{html.escape(host)}</a></p>
      {('<p class="n">' + html.escape(n) + '</p>') if n else ''}{flag}
    </article>'''
    sections += f'\n  <h2 id="{f.lower().replace(" ", "-").replace(",", "")}">{html.escape(f)} <small>{len(groups[f])}</small></h2>\n  <div class="g">{cards}\n  </div>'

fail_html = ''.join(f'<li>{html.escape(s["who"])}: <a href="{html.escape(s["url"])}">{html.escape(s["url"])}</a> · {html.escape(str(m.get("error") or m.get("status")))}</li>' for k, s, m in failed)
toc = ' · '.join(f'<a href="#{f.lower().replace(" ", "-").replace(",", "")}">{html.escape(f)}</a>' for f in order if f in groups)
total = sum(len(v) for v in groups.values())
page = f'''<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Academic personal pages, high profile</title>
<style>
  body {{ margin: 0; padding: 2.5rem; font: 16px/1.45 "Charter", Georgia, serif; color: #1d2029; background: #fefcf9; }}
  h1 {{ font-weight: 400; font-size: 1.6rem; }}
  h2 {{ font-weight: 400; font-size: 1.3rem; margin: 3rem 0 0; padding-top: 1rem; border-top: 1px solid rgba(29,32,41,.15); }}
  h2 small {{ color: #8b90a0; font-size: .9rem; margin-left: .5rem; }}
  .intro, .toc {{ max-width: 52rem; color: #4a5062; }}
  .toc {{ font-size: .92rem; }}
  .g {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr)); gap: 1.8rem 1.4rem; margin-top: 1.2rem; }}
  article img {{ width: 100%; aspect-ratio: 16/10; object-fit: cover; object-position: top; border: 1px solid rgba(29,32,41,.15); border-radius: 3px; background: #fff; }}
  h3 {{ font-size: 1rem; font-weight: 700; margin: .55rem 0 0; }}
  p {{ margin: .1rem 0 0; font-size: .9rem; }}
  .n {{ color: #4a5062; }}
  a {{ color: #2f5fb3; text-decoration: none; }} a:hover {{ text-decoration: underline; }}
  ul {{ font-size: .9rem; color: #4a5062; }}
</style></head><body>
<h1>Academic personal pages: {total} high-profile researchers</h1>
<p class="intro">Captured 6 November 2026, first screen at 1440 wide. Click a capture for the full page. The thirty from the earlier set are in <a href="index.html">the first gallery</a>. Captures are local to the VM; the list and notes are in the repo.</p>
<p class="toc">{toc}</p>
{sections}
<h2>Not captured <small>{len(failed)}</small></h2>
<ul>{fail_html}</ul>
</body></html>'''
open(os.path.join(here, 'index-high-profile.html'), 'w').write(page)
print(total, 'captured,', len(failed), 'failed')
