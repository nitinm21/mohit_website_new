import '@fontsource-variable/cormorant-garamond/wght.css';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import '@fontsource/marcellus/400.css';
import '@fontsource-variable/hanken-grotesk/wght.css';
import '@fontsource-variable/montserrat/wght.css';
import './style.css';
import './about/about.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as C from './content.js';
import { createDrawing } from './drawing.js';
import { tplAboutSection } from './about/about.js';
import { initAboutMotion } from './about/about.motion.js';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pad2 = (n) => String(n).padStart(2, '0');
const img = (name, alt, { sizes = '(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw', eager = false, cls = '' } = {}) =>
  `<img src="/img/${name}.webp" srcset="/img/${name}-800.webp 800w, /img/${name}.webp 1600w" sizes="${sizes}" alt="${esc(alt)}" ${eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async"${cls ? ` class="${cls}"` : ''}>`;
const arrow = '<span class="arr" aria-hidden="true">→</span>';
const split = (text, extraClass = '') => `<span class="split ${extraClass}">${text.split(' ').map((w, i) => `<span class="w"><span class="w__i" style="--i:${i}">${w}</span></span>`).join(' ')}</span>`;
const telHref = (n) => `tel:+91${n}`;
const telFmt = (n) => `${n.slice(0, 5)} ${n.slice(5)}`;
const waHref = (text) => `https://wa.me/${C.contact.whatsapp}?text=${encodeURIComponent(text)}`;

/* ------------------------------------------------------------------ */
/* templates                                                           */
/* ------------------------------------------------------------------ */
function tplNav() {
  return `
  <header class="nav" id="nav">
    <a class="nav__brand" href="#top" aria-label="NASI Group, back to top">
      <img class="nav__mark" src="/img/nasi-griffin.webp" alt="" width="36" height="36">
      <span class="nav__word">NASI Group</span>
    </a>
    <nav class="nav__links" aria-label="Primary">
      ${C.nav.map((l) => `<a href="${l.href}">${l.label}</a>`).join('')}
    </nav>
    <a class="btn btn--ghost nav__cta" href="#contact">Start a conversation</a>
    <button class="nav__menu" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span></button>
  </header>
  <div class="menu" id="menu" aria-hidden="true">
    <nav aria-label="Mobile">
      ${C.nav.map((l) => `<a href="${l.href}">${l.label}</a>`).join('')}
    </nav>
    <a class="btn btn--solid menu__cta" href="#contact">Start a conversation</a>
  </div>`;
}

function tplHero() {
  const h = C.hero;
  const lines = h.headline.split('\n');
  const last = lines.pop();
  return `
  <section class="hero" id="top" aria-label="Introduction">
    <div class="hero__inner">
      <div class="hero__sheet" aria-hidden="true"><svg id="sheet"></svg></div>
      <div class="hero__text">
        <div class="hero__intro" id="heroIntro">
          <p class="eyebrow">${esc(C.brand.descriptor)}</p>
          <h1 class="display display--xl">${lines.map((l) => split(l)).join('<br>')}<br><span class="ital">${esc(last)}</span></h1>
          <p class="lede rv" style="--d:500ms">${esc(h.supporting)}</p>
          <div class="hero__actions rv" style="--d:650ms">
            <a class="btn btn--solid" href="${h.primary.href}">${esc(h.primary.label)}</a>
            <a class="btn btn--ghost" href="${h.secondary.href}">${esc(h.secondary.label)} ${arrow}</a>
          </div>
        </div>
        ${h.stages.map((s, i) => `
        <div class="hero__caption" data-stage="${i}">
          <h2 class="display display--l">${esc(s.title)}</h2>
          <p>${esc(s.note)}</p>
        </div>`).join('')}
      </div>
      <ol class="hero__rail" id="heroRail" aria-label="Stages of the drawing">
        ${h.stages.map((s, i) => `<li class="${i === 0 ? 'is-on' : ''}"><span class="n">${pad2(i + 1)}</span>${esc(s.title)}</li>`).join('')}
        <li class="hero__hint" id="heroHint" aria-hidden="true">Scroll to build</li>
      </ol>
    </div>
  </section>`;
}

function tplPathways() {
  return `
  <section class="paths" aria-label="Three pathways">
    <div class="paths__track">
      ${C.pathways.map((p, i) => `
      <a class="path" href="${p.href}">
        ${img(p.img, p.alt, { sizes: '(min-width: 900px) 34vw, 82vw', cls: 'path__img' })}
        <span class="path__idx eyebrow">${pad2(i + 1)}</span>
        <span class="path__cap">
          <span class="eyebrow">${esc(p.title)}</span>
          <span class="display display--m">${esc(p.line)}</span>
          <span class="link-arrow">Explore ${arrow}</span>
        </span>
      </a>`).join('')}
    </div>
  </section>`;
}

function tplEcosystem() {
  const e = C.ecosystem;
  return `
  <section class="section section--light" id="ecosystem">
    <div class="wrap">
      <div class="head head--split">
        <div><p class="eyebrow">${esc(e.eyebrow)}</p><h2 class="display display--l">${split(e.headline)}</h2></div>
        <p class="lede rv">${esc(e.copy)}</p>
      </div>
      <ol class="chain">
        ${e.chain.map((n, i) => `<li class="chain__node rv" style="--d:${i * 90}ms" tabindex="0"><h3 class="display display--m">${esc(n.title)}</h3><p>${esc(n.body)}</p></li>`).join('')}
      </ol>
    </div>
  </section>`;
}

function tplRealEstate() {
  const r = C.realEstate;
  return `
  <section class="section section--light" id="real-estate">
    <div class="wrap">
      <div class="head head--split">
        <div><p class="eyebrow">${esc(r.eyebrow)}</p><h2 class="display display--l">${split(r.headline)}</h2></div>
        <p class="lede rv">${esc(r.copy)}</p>
      </div>
      <div class="chips rv" role="group" aria-label="Filter properties" id="chips">
        ${r.categories.map((c, i) => `<button class="chip" aria-pressed="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join('')}
      </div>
      <div class="props" id="props">
        ${r.properties.map((p, i) => `
        <article class="prop rv ${p.feature ? 'prop--feature' : ''}" data-cat="${esc(p.category)}" style="--d:${(i % 3) * 80}ms">
          <a class="prop__media" href="${waHref(`Hello NASI, I'm interested in ${p.name} (${p.location}).`)}" target="_blank" rel="noopener" aria-label="Enquire about ${esc(p.name)} on WhatsApp">
            ${img(p.img, p.alt, { sizes: p.feature ? '(min-width: 1100px) 66vw, (min-width: 700px) 50vw, 100vw' : undefined })}
            <div class="prop__over">
              <dl class="prop__stats">${p.stats.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
              <span class="link-arrow">Explore property ${arrow}</span>
            </div>
          </a>
          <div class="prop__body">
            <div class="prop__meta"><span>${esc(p.location)}</span><span>${esc(p.type)}</span></div>
            <h3 class="prop__name">${esc(p.name)}</h3>
            <p class="prop__pos">${esc(p.positioning)}</p>
            <div class="prop__row"><span class="num prop__price">${esc(p.price)}</span><span class="prop__status">${esc(p.status)}</span></div>
            <p class="prop__touchstats">${p.stats.map(([k, v]) => `<span>${esc(k)} <b>${esc(v)}</b></span>`).join('')}</p>
          </div>
        </article>`).join('')}
      </div>
      <div class="cta-row rv">
        <div class="cta-row__text"><span class="cta-row__lead">${esc(r.cta.lead)}</span><span class="cta-row__line">${esc(r.cta.line)}</span></div>
        <a class="btn btn--ink" href="#contact" data-intent="buy">${esc(r.cta.label)} ${arrow}</a>
      </div>
    </div>
  </section>`;
}

function tplDifference() {
  const d = C.difference;
  return `
  <section class="section section--dark" id="difference">
    <div class="wrap diff">
      <div class="diff__head"><p class="eyebrow">${esc(d.eyebrow)}</p><h2 class="display display--l">${split(d.headline)}</h2></div>
      <ul class="diff__list">
        ${d.points.map((p, i) => `<li class="rv" style="--d:${i * 70}ms"><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></li>`).join('')}
      </ul>
    </div>
  </section>`;
}

function tplConstruction() {
  const c = C.construction;
  const imgs = [...new Set(c.journey.map((j) => j.img))];
  return `
  <section class="section section--light" id="construction">
    <div class="wrap">
      <div class="head head--split">
        <div><p class="eyebrow">${esc(c.eyebrow)}</p><h2 class="display display--l">${split(c.headline)}</h2></div>
        <p class="lede rv">${esc(c.copy)}</p>
      </div>
      <div class="journey" id="journey">
        <div class="journey__visual" aria-hidden="true">
          ${imgs.map((n, i) => img(n, '', { sizes: '(min-width: 900px) 50vw, 100vw', cls: i === 0 ? 'is-active' : '' })).join('')}
          <div class="journey__stage"><span class="eyebrow">Site progress</span><span class="display display--m" id="journeyStage">${esc(c.journey[0].stage)}</span></div>
          <div class="journey__bar"><i id="journeyBar"></i></div>
        </div>
        <ol class="journey__steps">
          ${c.journey.map((j, i) => `<li class="step ${i === 0 ? 'is-active' : ''}" data-img="${j.img}" data-stage="${esc(j.stage)}"><span class="step__n">${pad2(i + 1)}</span><div><h3>${esc(j.step)}</h3><p>${esc(j.body)}</p></div></li>`).join('')}
        </ol>
      </div>
      <div class="details">
        <h3 class="display display--m rv">${esc(c.details.headline)}</h3>
        <ul class="details__grid rv">${c.details.items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      </div>
      <div class="cta-row rv">
        <div class="cta-row__text"><span class="cta-row__lead">${esc(c.cta.lead)}</span><span class="cta-row__line">${esc(c.cta.line)}</span></div>
        <a class="btn btn--ink" href="#contact" data-intent="build">${esc(c.cta.label)} ${arrow}</a>
      </div>
    </div>
  </section>`;
}

function tplInteriors() {
  const it = C.interiors;
  const ar = { 'int-kitchen-garden': '2 / 3', 'int-dining-wood': '4 / 5', 'int-kitchen-marble': '3 / 4', 'int-linen-light': '2 / 3', 'int-office-garden': '16 / 9', 'int-living-dusk': '2 / 3' };
  return `
  <section class="section section--dark-2" id="interiors">
    <div class="wrap">
      <div class="head head--split">
        <div><p class="eyebrow">${esc(it.eyebrow)}</p><h2 class="display display--l">${split(it.headline)}</h2></div>
        <p class="lede rv">${esc(it.copy)}</p>
      </div>
      <div class="gal">
        <div class="gal__head rv">
          <p class="eyebrow">Selected interiors</p>
          <div class="gal__nav"><button id="galPrev" aria-label="Previous">←</button><button id="galNext" aria-label="Next">→</button></div>
        </div>
        <div class="gal__track" id="galTrack">
          ${it.gallery.map((g) => `
          <div class="gal__item" style="--ar:${ar[g.img] || '4 / 5'}">
            <figure>${img(g.img, g.alt, { sizes: '(min-width: 900px) 40vw, 80vw' })}</figure>
            <figcaption><span class="cat">${esc(g.category)}</span><span class="cap">${esc(g.caption)}</span></figcaption>
          </div>`).join('')}
        </div>
      </div>
      <div class="feels rv">
        <p class="eyebrow">What it feels like</p>
        <ul class="feels__list">${it.feels.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
      </div>
      <div class="mats">
        <div class="rv"><p class="eyebrow">Material collection</p><h3 class="display display--m" style="margin-top:.75rem">${esc(it.materials.headline)}</h3></div>
        <ul class="mats__grid">
          ${it.materials.items.map((m, i) => `<li class="mat rv" style="--d:${i * 60}ms" tabindex="0"><div class="mat__img">${img(m.img, `${m.title} close-up`, { sizes: '(min-width: 900px) 12vw, 33vw' })}</div><h4>${esc(m.title)}</h4><p>${esc(m.note)}</p></li>`).join('')}
        </ul>
      </div>
      <ol class="proc rv">
        ${it.process.map((p, i) => `<li><span class="n">${pad2(i + 1)}</span><h4>${esc(p.step)}</h4><p>${esc(p.body)}</p></li>`).join('')}
      </ol>
      <div class="cta-row rv">
        <div class="cta-row__text"><span class="cta-row__lead">${esc(it.cta.lead)}</span><span class="cta-row__line">${esc(it.cta.line)}</span></div>
        <a class="btn btn--solid" href="#contact" data-intent="design">${esc(it.cta.label)} ${arrow}</a>
      </div>
    </div>
  </section>`;
}

function tplContact() {
  const f = C.finalCta, c = C.contact;
  return `
  <section class="section section--dark-2" id="contact">
    <div class="wrap">
      <div class="head"><p class="eyebrow">Contact</p><h2 class="display display--l" style="max-width:24ch">${split(f.headline)}</h2></div>
      <div class="contact__grid">
        <div>
          <div class="opts rv" id="opts" role="group" aria-label="What would you like to do?">
            ${f.options.map((o, i) => `<button class="opt" data-key="${o.key}" aria-pressed="${i === 0}"><h3>${esc(o.title)}</h3><p>${esc(o.body)}</p></button>`).join('')}
          </div>
          <form class="form rv" id="form" novalidate>
            <p class="form__ctx" id="formCtx"></p>
            <div class="form__fields">
              <div class="form__row">
                <div class="field"><label for="fName">Name</label><input id="fName" name="name" type="text" autocomplete="name" required></div>
                <div class="field"><label for="fPhone">Phone or email</label><input id="fPhone" name="contact" type="text" autocomplete="tel" required></div>
              </div>
              <div class="field"><label for="fMsg">Tell us a little about it</label><textarea id="fMsg" name="message"></textarea></div>
              <div class="form__foot">
                <button class="btn btn--solid" type="submit">${esc(f.form.submit)} ${arrow}</button>
                <p class="form__note">We reply personally, usually within a working day.</p>
              </div>
            </div>
            <p class="form__ok" role="status">${esc(f.form.success)}</p>
          </form>
        </div>
        <aside class="cinfo">
          <div class="cinfo__block"><h4>Office</h4><address>${c.addressLines.map(esc).join('<br>')}</address></div>
          <div class="cinfo__block"><h4>Phone</h4>${c.phones.map((n) => `<a class="tel" href="${telHref(n)}">${telFmt(n)}</a>`).join('')}
            <a class="btn btn--ghost wa" href="${waHref('Hello NASI Group, I would like to start a conversation.')}" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c1.7.7 2.1.6 2.8.5a2.4 2.4 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.6-.4Z"/></svg>
              Chat on WhatsApp</a>
          </div>
          <div class="cinfo__block"><h4>Email</h4><a class="mail" href="mailto:${c.email}">${esc(c.email)}</a></div>
        </aside>
      </div>
    </div>
  </section>`;
}

function tplFooter() {
  const c = C.contact;
  return `
  <footer class="footer">
    <div class="wrap">
      <div class="footer__grid">
        <div class="footer__brand">
          <img src="/img/nasi-griffin.webp" alt="NASI Group griffin mark" width="64" height="64">
          <span class="word">NASI Group</span>
          <span class="tag">${esc(C.brand.tagline)}</span>
        </div>
        ${C.footer.columns.map((col) => `<div class="footer__col"><h4>${esc(col.title)}</h4><ul>${col.links.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join('')}</ul></div>`).join('')}
        <div class="footer__col"><h4>Contact</h4>
          <address>${c.addressLines.map(esc).join('<br>')}</address>
          <ul style="margin-top:.8rem">${c.phones.map((n) => `<li><a class="tel" href="${telHref(n)}">${telFmt(n)}</a></li>`).join('')}<li><a href="mailto:${c.email}">${esc(c.email)}</a></li></ul>
        </div>
      </div>
      <div class="footer__bot"><span>${esc(C.footer.copyright)}</span><span>Bengaluru, Karnataka</span></div>
    </div>
  </footer>
  <div class="mbar" id="mbar">
    <a class="btn btn--solid" href="${waHref('Hello NASI Group, I would like to start a conversation.')}" target="_blank" rel="noopener">WhatsApp</a>
    <a class="btn btn--ghost" href="${telHref(c.phones[0])}">Call</a>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* render                                                              */
/* ------------------------------------------------------------------ */
document.getElementById('app').innerHTML =
  tplNav() + `<main id="main">` + tplHero() + tplPathways() + tplEcosystem() + tplRealEstate() + tplDifference() +
  tplConstruction() + tplInteriors() + tplAboutSection() + tplContact() + `</main>` + tplFooter();

/* ------------------------------------------------------------------ */
/* nav                                                                 */
/* ------------------------------------------------------------------ */
(function initNav() {
  const nav = document.getElementById('nav');
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  const mbar = document.getElementById('mbar');
  const onScroll = () => {
    nav.classList.toggle('is-compact', window.scrollY > 60);
    mbar.classList.toggle('is-on', window.scrollY > window.innerHeight * 4.9);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
  };
  btn.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
})();

/* ------------------------------------------------------------------ */
/* hero drawing                                                        */
/* ------------------------------------------------------------------ */
(function initHero() {
  const svg = document.getElementById('sheet');
  const draw = createDrawing(svg, { photo: '/img/hero-experience.webp' });
  const intro = document.getElementById('heroIntro');
  const captions = [...document.querySelectorAll('.hero__caption')];
  const rail = [...document.querySelectorAll('#heroRail li:not(.hero__hint)')];
  const hint = document.getElementById('heroHint');

  let stage = -1;
  const setStage = (i, showCaption) => {
    rail.forEach((li, k) => li.classList.toggle('is-on', k === i));
    captions.forEach((c, k) => c.classList.toggle('is-on', showCaption && k === i));
    stage = i;
  };

  // headline words + reveals on load
  requestAnimationFrame(() => {
    document.querySelectorAll('.hero .split').forEach((el) => el.classList.add('is-in'));
    document.querySelectorAll('.hero .rv').forEach((el) => el.classList.add('is-in'));
  });

  if (reduceMotion) {
    draw.complete();
    setStage(3, false);
    return;
  }

  // load: the site plan draws itself
  const load = { v: 0 };
  gsap.to(load, { v: 1, duration: 2.2, ease: 'power2.inOut', delay: 0.25, onUpdate: () => draw.setLoad(load.v) });

  draw.onStage((idx) => {});

  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: '+=380%',
    pin: true,
    scrub: true,
    anticipatePin: 1,
    onUpdate(self) {
      const P = self.progress;
      draw.setProgress(P);
      const showCaption = P > 0.07;
      intro.classList.toggle('is-off', P > 0.04);
      hint.classList.toggle('is-off', P > 0.02);
      const idx = P < 0.2 ? 0 : P < 0.45 ? 1 : P < 0.7 ? 2 : 3;
      if (idx !== stage || showCaption !== captions[idx]?.classList.contains('is-on')) setStage(idx, showCaption);
    },
  });
})();

initAboutMotion(document.getElementById('about'));

/* ------------------------------------------------------------------ */
/* reveals                                                             */
/* ------------------------------------------------------------------ */
(function initReveals() {
  const els = document.querySelectorAll('main .rv:not(.hero .rv), main .split:not(.hero .split), .rv-img');
  if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
  els.forEach((e) => io.observe(e));
})();

/* ------------------------------------------------------------------ */
/* pathways: cursor parallax                                           */
/* ------------------------------------------------------------------ */
(function initPathways() {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll('.path').forEach((p) => {
    const im = p.querySelector('.path__img');
    p.addEventListener('pointermove', (e) => {
      const r = p.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      im.style.transform = `translate(${dx * -14}px, ${dy * -14}px) scale(1.04)`;
    });
    p.addEventListener('pointerleave', () => { im.style.transform = ''; });
  });
})();

/* ------------------------------------------------------------------ */
/* property filter                                                     */
/* ------------------------------------------------------------------ */
(function initFilter() {
  const chips = document.querySelectorAll('#chips .chip');
  const grid = document.getElementById('props');
  const cards = [...grid.querySelectorAll(".prop")];
  chips.forEach((chip) => chip.addEventListener('click', () => {
    const cat = chip.dataset.cat;
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    grid.classList.add('is-swapping');
    setTimeout(() => {
      grid.classList.toggle('is-filtered', cat !== 'All');
      cards.forEach((card) => { card.hidden = cat !== 'All' && card.dataset.cat !== cat; card.classList.add('is-in'); });
      grid.classList.remove('is-swapping');
    }, 220);
  }));
})();

/* ------------------------------------------------------------------ */
/* construction journey                                                */
/* ------------------------------------------------------------------ */
(function initJourney() {
  const steps = [...document.querySelectorAll('#journey .step')];
  const imgs = [...document.querySelectorAll('#journey .journey__visual img')];
  const stageEl = document.getElementById('journeyStage');
  const bar = document.getElementById('journeyBar');
  const activate = (i) => {
    steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
    const name = steps[i].dataset.img;
    imgs.forEach((im) => im.classList.toggle('is-active', im.getAttribute('src').includes(`/${name}.webp`)));
    stageEl.textContent = steps[i].dataset.stage;
    bar.style.height = `${((i + 1) / steps.length) * 100}%`;
  };
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) activate(steps.indexOf(en.target)); });
  }, { rootMargin: window.matchMedia('(max-width: 899px)').matches ? '-58% 0px -22% 0px' : '-45% 0px -45% 0px', threshold: 0 });
  steps.forEach((s) => io.observe(s));
})();

/* ------------------------------------------------------------------ */
/* interiors gallery                                                   */
/* ------------------------------------------------------------------ */
(function initGallery() {
  const track = document.getElementById('galTrack');
  const step = () => (track.querySelector('.gal__item')?.getBoundingClientRect().width || 400) + 20;
  document.getElementById('galPrev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  document.getElementById('galNext').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  if (!finePointer) return;
  let down = false, startX = 0, startLeft = 0, moved = false;
  track.addEventListener('pointerdown', (e) => { down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft; track.classList.add('is-dragging'); });
  track.addEventListener('pointermove', (e) => { if (!down) return; const dx = e.clientX - startX; if (Math.abs(dx) > 3) moved = true; track.scrollLeft = startLeft - dx; });
  const up = () => { if (!down) return; down = false; track.classList.remove('is-dragging'); };
  track.addEventListener('pointerup', up); track.addEventListener('pointerleave', up);
  track.addEventListener('click', (e) => { if (moved) e.preventDefault(); }, true);
})();

/* ------------------------------------------------------------------ */
/* contact intents + form                                              */
/* ------------------------------------------------------------------ */
(function initContact() {
  const ctx = {
    buy: 'Locality, budget and the kind of home or asset.',
    build: 'The plot, what you want to build, and when.',
    design: 'The space, and what it should feel like.',
    partner: 'The land or development you have in mind.',
  };
  const opts = [...document.querySelectorAll('#opts .opt')];
  const ctxEl = document.getElementById('formCtx');
  const msg = document.getElementById('fMsg');
  const setIntent = (key) => {
    opts.forEach((o) => o.setAttribute('aria-pressed', String(o.dataset.key === key)));
    ctxEl.textContent = ctx[key];
    msg.placeholder = '';
  };
  setIntent('buy');
  opts.forEach((o) => o.addEventListener('click', () => setIntent(o.dataset.key)));
  document.querySelectorAll('[data-intent]').forEach((a) => a.addEventListener('click', () => setIntent(a.dataset.intent)));

  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#fName'), contact = form.querySelector('#fPhone');
    if (!name.value.trim()) { name.focus(); return; }
    if (!contact.value.trim()) { contact.focus(); return; }
    // No backend in this draft: the form confirms locally.
    form.classList.add('is-sent');
  });
})();

/* ------------------------------------------------------------------ */
/* magnetic primary buttons                                            */
/* ------------------------------------------------------------------ */
(function initMagnetic() {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll('.btn--solid, .btn--ink').forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      b.style.transform = `translate(${dx * 8}px, ${dy * 8}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
})();

// Recalculate pinned hero after fonts/images settle.
window.addEventListener('load', () => ScrollTrigger.refresh());
