/*
  NASI GROUP — About section markup
  A (intro) → B (architectural detail) → C (founders) → D (shared direction)
  → E (principles) → F (purpose / legacy) → G (exit)
*/
import * as A from './about.data.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const photo = (name, alt, sizes, cls) =>
  `<img class="${cls}" src="/img/${name}.webp" srcset="/img/${name}-800.webp 800w, /img/${name}.webp 1600w" sizes="${sizes}" alt="${esc(alt)}" width="1600" height="2000" loading="lazy" decoding="async">`;
const initials = (name) => name.split(' ').filter((w) => w.length > 1).slice(0, 2).map((w) => w[0]).join('');

// Simplified building elevation, 17 straight lines. The first is the ground datum
// the gold point travels along once the drawing completes.
const ELEVATION = [
  [0, 360, 480, 360],
  [80, 360, 80, 150], [400, 360, 400, 150], [80, 150, 400, 150],
  [80, 290, 400, 290], [80, 220, 400, 220],
  [160, 150, 160, 80], [160, 80, 340, 80], [340, 80, 340, 150],
  [187, 360, 187, 150], [293, 360, 293, 150],
  [220, 360, 220, 315], [220, 315, 260, 315], [260, 315, 260, 360],
  [80, 40, 400, 40], [80, 33, 80, 47], [400, 33, 400, 47],
];

function tplIntro() {
  const d = A.intro;
  return `
  <div class="ab-intro ab-wrap" data-ab="intro">
    <div class="ab-grid">
      <p class="eyebrow ab-intro__eyebrow">${esc(d.eyebrow)}</p>
      <h2 class="display ab-intro__head">${d.headline.map((w) => `<span>${esc(w)}</span>`).join(' ')}</h2>
      <div class="ab-intro__copy">
        <p class="ab-intro__body">${esc(d.body)}</p>
        <p class="ab-intro__sec">${esc(d.secondary)}</p>
      </div>
      <span class="ab-intro__rule" aria-hidden="true"></span>
    </div>
  </div>`;
}

function tplDetail() {
  return `
  <div class="ab-detail" id="about-detail" data-ab="detail">
    ${photo(A.detail.image, '', '100vw', 'ab-detail__img')}
    <div class="ab-detail__lines" aria-hidden="true">
      <i class="h"></i><i class="v"></i><i class="t t1"></i><i class="t t2"></i>
    </div>
  </div>`;
}

function tplFounderCard(f) {
  const portrait = f.image
    ? photo(f.image, f.alt, '(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw', 'ab-founder__img')
    : `<div class="ab-founder__img ab-founder__img--pending" role="img" aria-label="${esc(f.alt)}"><span aria-hidden="true">${esc(initials(f.name))}</span></div>`;
  return `
  <li class="ab-founder">
    <span class="ab-founder__n num">${esc(f.index)}</span>
    <div class="ab-founder__frame">${portrait}</div>
    <div class="ab-founder__id">
      <h3 class="ab-founder__name">${esc(f.name)}</h3>
      <p class="ab-founder__role">${esc(f.designation)}</p>
    </div>
    <p class="ab-founder__bio">${esc(f.bio)}</p>
  </li>`;
}

function tplFounders() {
  const h = A.foundersHead;
  return `
  <div class="ab-founders ab-wrap" id="about-founders" data-ab="founders">
    <div class="ab-founders__head">
      <p class="eyebrow">${esc(h.eyebrow)}</p>
      <h2 class="display ab-h2">${esc(h.headline)}</h2>
      <p class="ab-founders__sup">${esc(h.supporting)}</p>
    </div>
    <ul class="ab-founders__grid">${A.founders.map(tplFounderCard).join('')}</ul>
  </div>`;
}

function tplDirection() {
  const d = A.direction;
  return `
  <div class="ab-direction ab-wrap" id="about-direction" data-ab="direction">
    <div class="ab-direction__text">
      <h2 class="display ab-h2">${esc(d.statement)}</h2>
      <p class="ab-direction__body">${esc(d.body)}</p>
    </div>
    <div class="ab-direction__art">
      <svg viewBox="0 0 480 400" aria-hidden="true" focusable="false">
        ${ELEVATION.map(([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" data-to="${x2},${y2}" />`).join('')}
        <circle class="ab-direction__pt" cx="0" cy="360" r="3.5" />
      </svg>
    </div>
  </div>`;
}

function tplPrinciples() {
  return `
  <div class="ab-principles ab-wrap" id="about-principles" data-ab="principles">
    <ol class="ab-principles__grid">
      ${A.principles.map((p) => `
      <li class="ab-principle">
        <span class="ab-principle__n num">${esc(p.index)}</span>
        <span class="ab-principle__rule" aria-hidden="true"></span>
        <h3 class="ab-principle__title">${esc(p.title)}</h3>
        <p class="ab-principle__body">${esc(p.body)}</p>
      </li>`).join('')}
    </ol>
  </div>`;
}

function tplPurpose() {
  const p = A.purpose;
  return `
  <div class="ab-purpose" id="about-purpose" data-ab="purpose">
    <div class="ab-purpose__media">${photo(p.image, '', '(min-width: 768px) 50vw, 100vw', 'ab-purpose__img')}</div>
    <div class="ab-purpose__text">
      <p class="eyebrow">${esc(p.eyebrow)}</p>
      <h2 class="display ab-h2 ab-purpose__head">${esc(p.headline)}</h2>
      <p class="ab-purpose__body">${esc(p.body)}</p>
    </div>
  </div>`;
}

export function tplAboutSection() {
  return `
  <section class="ab" id="about" aria-label="About NASI Group">
    ${tplIntro()}${tplDetail()}${tplFounders()}${tplDirection()}${tplPrinciples()}${tplPurpose()}
    <div class="ab-exit" id="about-exit" aria-hidden="true"><span></span></div>
  </section>`;
}
