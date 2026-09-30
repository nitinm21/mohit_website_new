/*
  NASI GROUP — About section motion
  One-time, finite reveals on GSAP + ScrollTrigger. Initial states are set
  here rather than in CSS, so reduced-motion and no-JS visitors get the
  final composition with nothing hidden.
*/
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const ABOUT_CONFIG = {
  once: true,
  start: 'top 75%', // rootMargin "0px 0px -25% 0px"
  startLate: 'top 70%',
  easing: 'power3.out',
};

const reveal = (trigger, build, start = ABOUT_CONFIG.start) => {
  const tl = gsap.timeline({ paused: true });
  build(tl);
  ScrollTrigger.create({ trigger, start, once: ABOUT_CONFIG.once, onEnter: () => tl.play() });
};

export function initAboutMotion(root) {
  if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const q = (sel) => root.querySelector(sel);
  const qa = (sel) => [...root.querySelectorAll(sel)];
  const ease = ABOUT_CONFIG.easing;

  // A — intro: headline and copy fade up
  const introEls = qa('.ab-intro__eyebrow, .ab-intro__head, .ab-intro__copy');
  gsap.set(introEls, { opacity: 0, y: 24 });
  gsap.set('.ab-intro__rule', { scaleX: 0, transformOrigin: 'left center' });
  reveal(q('.ab-intro'), (tl) => tl
    .to(introEls, { opacity: 1, y: 0, duration: 0.65, ease, stagger: 0.08 })
    .to('.ab-intro__rule', { scaleX: 1, duration: 0.65, ease }, 0.3));

  // B — architectural detail: image .55 → .85, line overlay rises 18px
  const detailImg = q('.ab-detail__img'), detailLines = q('.ab-detail__lines');
  gsap.set(detailImg, { opacity: 0.55 });
  reveal(q('.ab-detail'), (tl) => tl
    .to(detailImg, { opacity: 0.85, duration: 0.7, ease: 'power2.out' })
    .to(detailLines, { y: -18, duration: 0.7, ease: 'power2.out' }, 0));

  // C — founders: portraits rise with a 120ms stagger; name follows 120ms behind each
  const cards = qa('.ab-founder');
  const frames = cards.map((c) => c.querySelector('.ab-founder__frame'));
  const texts = cards.map((c) => c.querySelectorAll('.ab-founder__id, .ab-founder__bio'));
  gsap.set(frames, { opacity: 0, y: 28 });
  gsap.set(texts, { opacity: 0 });
  reveal(q('.ab-founders__grid'), (tl) => cards.forEach((_, i) => tl
    .to(frames[i], { opacity: 1, y: 0, duration: 0.65, ease }, i * 0.12)
    .to(texts[i], { opacity: 1, duration: 0.65, ease }, i * 0.12 + 0.12)));

  // D — shared direction: elevation draws over 1.4s, then a point runs the datum once
  const lines = qa('.ab-direction__art line');
  const pt = q('.ab-direction__pt');
  const each = 0.5, stagger = (1.4 - each) / (lines.length - 1);
  lines.forEach((l) => gsap.set(l, { attr: { x2: l.getAttribute('x1'), y2: l.getAttribute('y1') } }));
  gsap.set(pt, { opacity: 0 });
  reveal(q('.ab-direction'), (tl) => {
    lines.forEach((l, i) => {
      const [x2, y2] = l.dataset.to.split(',');
      tl.to(l, { attr: { x2, y2 }, duration: each, ease: 'power2.inOut' }, i * stagger);
    });
    tl.set(pt, { opacity: 1 }, 1.4).to(pt, { attr: { cx: 480 }, duration: 1.2, ease: 'power2.inOut' }, 1.4);
  }, ABOUT_CONFIG.startLate);

  // E — principles: fade and rise, staggered
  const items = qa('.ab-principle');
  gsap.set(items, { opacity: 0, y: 20 });
  reveal(q('.ab-principles'), (tl) => tl.to(items, { opacity: 1, y: 0, duration: 0.5, ease, stagger: 0.1 }));

  // F — purpose: image wipes in from the left, text follows 180ms later
  const pImg = q('.ab-purpose__media'), pText = q('.ab-purpose__text');
  gsap.set(pImg, { clipPath: 'inset(0 100% 0 0)' });
  gsap.set(pText, { opacity: 0, y: 24 });
  reveal(q('.ab-purpose'), (tl) => tl
    .to(pImg, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut' })
    .to(pText, { opacity: 1, y: 0, duration: 0.65, ease }, 0.18), ABOUT_CONFIG.startLate);
}
