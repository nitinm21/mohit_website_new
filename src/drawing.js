/*
  The drafting sheet.
  A small axonometric model of a house on a plot, emitted as SVG paths and
  drawn line-by-line as the visitor scrolls. Four stages map to the four
  disciplines: LAND (site plan) → STRUCTURE (frame) → SPACE (walls, openings,
  stair) → EXPERIENCE (furniture, then the photograph).
*/

const S = 36; // px per metre in viewBox units
const C30 = 0.8660254;
const S30 = 0.5;
const OX = 413;
const OY = 262;
export const VW = 920;
export const VH = 760;

const f = (n) => n.toFixed(1);
const pt = (x, y, z = 0) => [(x - y) * C30 * S + OX, (x + y) * S30 * S - z * S + OY];
const seg = (a, b) => `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`;
const poly = (pts, close = true) => 'M' + pts.map((p) => `${f(p[0])} ${f(p[1])}`).join('L') + (close ? 'Z' : '');
const line3 = (a, b) => seg(pt(...a), pt(...b));
const rect3 = (x1, y1, x2, y2, z) => poly([pt(x1, y1, z), pt(x2, y1, z), pt(x2, y2, z), pt(x1, y2, z)]);
const circ2 = (cx, cy, r) => `M${f(cx - r)} ${f(cy)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
function circ3(cx, cy, r, z = 0, n = 28) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    pts.push(pt(cx + Math.cos(a) * r, cy + Math.sin(a) * r, z));
  }
  return poly(pts);
}
// Visible edges of a box seen from the +x/+y side.
function box3(x1, y1, x2, y2, z1, z2) {
  return [
    rect3(x1, y1, x2, y2, z2),
    line3([x2, y1, z1], [x2, y1, z2]),
    line3([x2, y2, z1], [x2, y2, z2]),
    line3([x1, y2, z1], [x1, y2, z2]),
    line3([x1, y2, z1], [x2, y2, z1]),
    line3([x2, y1, z1], [x2, y2, z1]),
  ];
}

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);

export function buildScene() {
  const stages = { land: [], structure: [], space: [], experience: [] };
  const texts = { land: [], structure: [], space: [], experience: [] };
  const add = (st, d, cls = 'ln', o = {}) => stages[st].push({ d, cls, ...o });
  const txt = (st, x, y, text, o = {}) => texts[st].push({ x, y, text, ...o });

  /* ---------- LAND · A-001 SITE PLAN ---------- */
  // sheet border
  add('land', `M20 20H900V740H20Z`, 'ln ln--thin', { fixed: true });
  // plot boundary
  add('land', rect3(0, 0, 12, 9, 0), 'ln ln--strong');
  // corner survey ticks
  for (const [x, y] of [[0, 0], [12, 0], [12, 9], [0, 9]]) {
    const p = pt(x, y, 0);
    add('land', circ2(p[0], p[1], 2.2), 'ln ln--thin');
  }
  // setback / footprint (dashed, fades)
  add('land', rect3(1.5, 1.5, 10.5, 7.5, 0), 'ln ln--dash', { fade: true, anno: true });
  // road along the +x side (runs off the sheet, clipped by the border)
  add('land', line3([13.6, -1.5, 0], [13.6, 12.5, 0]), 'ln', { anno: true });
  add('land', line3([16.2, -1.5, 0], [16.2, 12.5, 0]), 'ln ln--thin', { anno: true });
  add('land', line3([14.9, -1.5, 0], [14.9, 12.5, 0]), 'ln ln--dash ln--thin', { fade: true, anno: true });
  {
    const p = pt(14.9, 3.2, 0);
    txt('land', p[0], p[1], '12 M ROAD', { rot: -30, cls: 'tx tx--small', anno: true });
  }
  // dimension: front-left edge (y = 9)
  {
    const a = pt(0, 10.4, 0), b = pt(12, 10.4, 0);
    add('land', seg(a, b), 'ln ln--thin', { anno: true });
    add('land', seg(pt(0, 9.3, 0), pt(0, 10.7, 0)), 'ln ln--thin', { anno: true });
    add('land', seg(pt(12, 9.3, 0), pt(12, 10.7, 0)), 'ln ln--thin', { anno: true });
    const m = pt(6, 10.9, 0);
    txt('land', m[0], m[1], '12.00 M', { rot: 30, cls: 'tx', anno: true });
  }
  // dimension: left edge (x = 0)
  {
    const a = pt(-1.4, 0, 0), b = pt(-1.4, 9, 0);
    add('land', seg(a, b), 'ln ln--thin', { anno: true });
    add('land', seg(pt(-0.3, 0, 0), pt(-1.7, 0, 0)), 'ln ln--thin', { anno: true });
    add('land', seg(pt(-0.3, 9, 0), pt(-1.7, 9, 0)), 'ln ln--thin', { anno: true });
    const m = pt(-1.9, 4.5, 0);
    txt('land', m[0], m[1], '9.00 M', { rot: -30, cls: 'tx', anno: true });
  }
  // contours across the back of the plot
  for (const [y0, amp] of [[6.9, 0.35], [8.1, 0.28]]) {
    const pts = [];
    for (let i = 0; i <= 14; i++) {
      const x = (i / 14) * 12;
      pts.push(pt(x, y0 - x * 0.09 + Math.sin(i * 0.9) * amp, 0));
    }
    add('land', poly(pts, false), 'ln ln--dash ln--thin', { fade: true, anno: true });
  }
  // trees (plan symbols)
  for (const [cx, cy, r] of [[2.4, 7.4, 1.25], [10.2, 1.2, 0.95], [-2.6, 6.2, 1.1]]) {
    add('land', circ3(cx, cy, r, 0), 'ln ln--thin');
    const c = pt(cx, cy, 0);
    add('land', circ2(c[0], c[1], 1.6), 'ln ln--thin');
  }
  // north arrow (screen space, top-left of sheet)
  add('land', circ2(86, 92, 20), 'ln ln--thin', { fixed: true });
  add('land', `M86 108L86 74`, 'ln', { fixed: true });
  add('land', `M79 84L86 74L93 84`, 'ln', { fixed: true });
  txt('land', 86, 132, 'N', { cls: 'tx tx--cap', anchor: 'middle', fixed: true });
  // title block frame
  add('land', `M612 664H900M612 664V740M612 690H900M612 715H900M770 664V740`, 'ln ln--thin', { fixed: true });
  txt('land', 624, 681, 'NASI GROUP', { cls: 'tx tx--brand', fixed: true });
  txt('land', 782, 681, 'BUILDING LEGACY.', { cls: 'tx tx--brandsub', fixed: true });
  txt('land', 624, 731, 'SCALE', { cls: 'tx tx--label', fixed: true });
  txt('land', 672, 731, '1 : 200', { cls: 'tx', fixed: true });
  txt('land', 782, 731, 'BENGALURU · 560068', { cls: 'tx', fixed: true });

  /* ---------- STRUCTURE · S-101 ---------- */
  const GX = [1.5, 6, 10.5];
  const GY = [1.5, 4.5, 7.5];
  GX.forEach((x, i) => {
    add('structure', line3([x, -0.9, 0], [x, 10.6, 0]), 'ln ln--dash ln--thin', { fade: true, anno: true });
    const b = pt(x, 11.35, 0);
    add('structure', circ2(b[0], b[1], 10), 'ln ln--thin', { anno: true });
    txt('structure', b[0], b[1] + 3.5, 'ABC'[i], { cls: 'tx tx--bubble', anchor: 'middle', anno: true });
  });
  GY.forEach((y, i) => {
    add('structure', line3([-1.8, y, 0], [12.9, y, 0]), 'ln ln--dash ln--thin', { fade: true, anno: true });
    const b = pt(-2.55, y, 0);
    add('structure', circ2(b[0], b[1], 10), 'ln ln--thin', { anno: true });
    txt('structure', b[0], b[1] + 3.5, String(i + 1), { cls: 'tx tx--bubble', anchor: 'middle', anno: true });
  });
  // footings then columns, back to front
  const cols = [];
  for (const x of GX) for (const y of GY) cols.push([x, y]);
  cols.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
  for (const [x, y] of cols) add('structure', rect3(x - 0.45, y - 0.45, x + 0.45, y + 0.45, 0), 'ln ln--thin');
  for (const [x, y] of cols) add('structure', line3([x, y, 0], [x, y, 3.3]), 'ln ln--strong');
  // first-floor beams
  for (const y of GY) add('structure', line3([1.5, y, 3.3], [10.5, y, 3.3]), 'ln');
  for (const x of GX) add('structure', line3([x, 1.5, 3.3], [x, 7.5, 3.3]), 'ln');
  // slab thickness on the two visible faces
  add('structure', line3([10.5, 1.5, 3.12], [10.5, 7.5, 3.12]), 'ln ln--thin');
  add('structure', line3([1.5, 7.5, 3.12], [10.5, 7.5, 3.12]), 'ln ln--thin');
  // upper storey over the back-left bay
  const up = [];
  for (const x of [1.5, 6]) for (const y of GY) up.push([x, y]);
  up.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
  for (const [x, y] of up) add('structure', line3([x, y, 3.3], [x, y, 6.5]), 'ln ln--strong');
  for (const y of GY) add('structure', line3([1.5, y, 6.5], [6, y, 6.5]), 'ln');
  for (const x of [1.5, 6]) add('structure', line3([x, 1.5, 6.5], [x, 7.5, 6.5]), 'ln');
  add('structure', line3([6, 1.5, 6.32], [6, 7.5, 6.32]), 'ln ln--thin');
  add('structure', line3([1.5, 7.5, 6.32], [6, 7.5, 6.32]), 'ln ln--thin');

  /* ---------- SPACE · A-201 ---------- */
  // wall plan on the ground
  add('space', rect3(1.5, 1.5, 10.5, 7.5, 0), 'ln ln--strong');
  // openings, front-left face (y = 7.5)
  const faceY = (x1, x2, z1, z2) => poly([pt(x1, 7.5, z1), pt(x2, 7.5, z1), pt(x2, 7.5, z2), pt(x1, 7.5, z2)]);
  const faceX = (y1, y2, z1, z2) => poly([pt(10.5, y1, z1), pt(10.5, y2, z1), pt(10.5, y2, z2), pt(10.5, y1, z2)]);
  add('space', faceY(2.1, 5.3, 0.9, 2.4), 'ln');
  add('space', line3([3.7, 7.5, 0.9], [3.7, 7.5, 2.4]), 'ln ln--thin');
  add('space', faceY(7.4, 8.4, 0, 2.2), 'ln');
  add('space', faceY(8.8, 10.2, 0, 2.6), 'ln');
  add('space', line3([9.5, 7.5, 0], [9.5, 7.5, 2.6]), 'ln ln--thin');
  // openings, right face (x = 10.5)
  add('space', faceX(2.3, 4.1, 0.9, 2.4), 'ln');
  add('space', faceX(5, 6.9, 0.15, 2.6), 'ln');
  add('space', line3([10.5, 5.95, 0.15], [10.5, 5.95, 2.6]), 'ln ln--thin');
  // upper storey openings
  add('space', faceY(2, 3.3, 4.2, 5.7), 'ln');
  add('space', faceY(4.2, 5.5, 4.2, 5.7), 'ln');
  add('space', poly([pt(6, 4, 3.3), pt(6, 5, 3.3), pt(6, 5, 5.5), pt(6, 4, 5.5)]), 'ln');
  add('space', poly([pt(6, 5.6, 4.2), pt(6, 6.9, 4.2), pt(6, 6.9, 5.4), pt(6, 5.6, 5.4)]), 'ln');
  // partitions (plan)
  add('space', line3([6, 1.5, 0], [6, 5.3, 0]), 'ln');
  add('space', line3([1.5, 4.5, 0], [6, 4.5, 0]), 'ln');
  // stair
  {
    const stringer = [];
    for (let i = 0; i <= 10; i++) {
      const y = 1.6 + i * 0.27, z = i * 0.3;
      add('space', line3([6.25, y, z], [7.45, y, z]), 'ln ln--thin');
      stringer.push(pt(7.45, y, z));
    }
    add('space', poly(stringer, false), 'ln ln--thin');
  }
  // terrace parapet
  add('space', line3([6, 7.5, 4.3], [10.5, 7.5, 4.3]), 'ln');
  add('space', line3([10.5, 7.5, 4.3], [10.5, 1.5, 4.3]), 'ln');
  add('space', line3([10.5, 1.5, 4.3], [6, 1.5, 4.3]), 'ln');
  for (const [x, y] of [[10.5, 7.5], [10.5, 1.5], [6, 7.5], [6, 1.5]]) add('space', line3([x, y, 3.3], [x, y, 4.3]), 'ln ln--thin');
  // level markers
  [[0, '± 0.00'], [3.3, '+ 3.30'], [6.5, '+ 6.50']].forEach(([z, label]) => {
    const p = pt(10.9, 7.9, z);
    add('space', `M${f(p[0])} ${f(p[1])}h44`, 'ln ln--thin', { anno: true });
    add('space', `M${f(p[0] + 8)} ${f(p[1])}l5 -7l5 7`, 'ln ln--thin', { anno: true });
    txt('space', p[0] + 22, p[1] - 5, label, { cls: 'tx', anno: true });
  });

  /* ---------- EXPERIENCE · I-301 ---------- */
  add('experience', rect3(6.8, 3.2, 10, 6.5, 0.02), 'ln ln--dash ln--thin', { fade: true });
  for (const d of box3(7.2, 5.7, 10, 6.5, 0, 0.45)) add('experience', d, 'ln');
  for (const d of box3(7.2, 6.25, 10, 6.5, 0.45, 0.85)) add('experience', d, 'ln ln--thin');
  add('experience', rect3(7.7, 3.9, 9.4, 4.7, 0.42), 'ln');
  for (const [x, y] of [[7.7, 4.7], [9.4, 4.7], [9.4, 3.9]]) add('experience', line3([x, y, 0], [x, y, 0.42]), 'ln ln--thin');
  // dining
  add('experience', rect3(2.4, 5.2, 4.4, 6.2, 0.75), 'ln');
  for (const [x, y] of [[2.4, 6.2], [4.4, 6.2], [4.4, 5.2]]) add('experience', line3([x, y, 0], [x, y, 0.75]), 'ln ln--thin');
  for (const [x, y] of [[2.75, 4.7], [3.95, 4.7], [2.75, 6.65], [3.95, 6.65]]) add('experience', rect3(x - 0.22, y - 0.22, x + 0.22, y + 0.22, 0.45), 'ln ln--thin');
  // pendant
  add('experience', line3([3.4, 5.7, 3.3], [3.4, 5.7, 2.35]), 'ln ln--thin');
  add('experience', poly([pt(3.1, 5.7, 2.35), pt(3.7, 5.7, 2.35), pt(3.4, 5.7, 1.95)]), 'ln');
  // plants
  add('experience', line3([10, 7, 0], [10, 7, 0.6]), 'ln ln--thin');
  add('experience', circ3(10, 7, 0.38, 0.6), 'ln ln--thin');
  add('experience', line3([6.5, 7.1, 0], [6.5, 7.1, 0.5]), 'ln ln--thin');
  add('experience', circ3(6.5, 7.1, 0.3, 0.5), 'ln ln--thin');
  // bed upstairs
  for (const d of box3(2.2, 2, 4, 4.2, 3.3, 3.8)) add('experience', d, 'ln ln--thin');
  add('experience', line3([2.2, 2, 3.3], [2.2, 2, 4.45]), 'ln ln--thin');
  add('experience', line3([4, 2, 3.3], [4, 2, 4.45]), 'ln ln--thin');
  add('experience', line3([2.2, 2, 4.45], [4, 2, 4.45]), 'ln ln--thin');

  return { stages, texts };
}

// Title-block label per stage. No sheet codes: they read as noise.
const SHEETS = {
  land: 'SITE PLAN',
  structure: 'STRUCTURAL FRAME',
  space: 'PLANS & OPENINGS',
  experience: 'INTERIOR LAYOUT',
};
const ORDER = ['land', 'structure', 'space', 'experience'];
const WIN = { land: [0, 0.2], structure: [0.2, 0.45], space: [0.45, 0.7], experience: [0.7, 0.86] };
const PHOTO = [0.84, 0.97];

export function createDrawing(svg, { photo, photoAlt = '' } = {}) {
  const { stages, texts } = buildScene();
  svg.setAttribute('viewBox', `0 0 ${VW} ${VH}`);
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');

  let html = `
    <defs>
      <clipPath id="sheetClip"><rect x="20" y="20" width="880" height="720"/></clipPath>
      <pattern id="sheetGrid" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="12" cy="12" r="0.8" class="grid-dot"/>
      </pattern>
    </defs>
    <rect x="20" y="20" width="880" height="720" class="sheet-bg"/>
    <rect x="20" y="20" width="880" height="720" fill="url(#sheetGrid)" class="sheet-grid"/>
    <image href="${photo}" x="20" y="20" width="880" height="720" preserveAspectRatio="xMidYMid slice" clip-path="url(#sheetClip)" class="sheet-photo"/>
    <rect x="20" y="20" width="880" height="720" class="sheet-shade"/>
    <g clip-path="url(#sheetClip)"><g class="camera">`;
  const pathHtml = (it, i) => `<path d="${it.d}" class="${it.cls}" data-i="${i}"${it.fade ? ' data-fade' : ''}${it.anno ? ' data-anno' : ''}/>`;
  const textHtml = (t, i) => {
    const tr = t.rot ? ` transform="rotate(${t.rot} ${f(t.x)} ${f(t.y)})"` : '';
    return `<text x="${f(t.x)}" y="${f(t.y)}" class="${t.cls || 'tx'}" data-t="${i}"${tr}${t.anchor ? ` text-anchor="${t.anchor}"` : ''}${t.anno ? ' data-anno' : ''}>${t.text}</text>`;
  };
  // scene geometry lives inside the camera (scaled, clipped to the sheet)
  for (const st of ORDER) {
    html += `<g class="stage stage--cam" data-stage="${st}">`;
    stages[st].forEach((it, i) => { if (!it.fixed) html += pathHtml(it, i); });
    texts[st].forEach((t, i) => { if (!t.fixed) html += textHtml(t, i); });
    html += `</g>`;
  }
  html += `</g></g>`;
  // sheet furniture (border, north, title block) sits still, above everything
  html += `<g class="fixed"><rect x="612" y="664" width="288" height="76" class="tb-bg"/>`;
  for (const st of ORDER) {
    html += `<g class="stage stage--fix" data-stage="${st}">`;
    stages[st].forEach((it, i) => { if (it.fixed) html += pathHtml(it, i); });
    texts[st].forEach((t, i) => { if (t.fixed) html += textHtml(t, i); });
    html += `</g>`;
  }
  // sheet values (title block) toggled per stage
  html += `<g class="sheet-values">`;
  ORDER.forEach((st) => {
    html += `<text x="624" y="706" class="tx sheet-title" data-st="${st}">${SHEETS[st]}</text>`;
  });
  html += `</g></g>`;
  svg.innerHTML = html;

  // prepare draw metadata
  const meta = {};
  for (const st of ORDER) {
    const fix = svg.querySelector(`.stage--fix[data-stage="${st}"]`);
    const cam = svg.querySelector(`.stage--cam[data-stage="${st}"]`);
    const g = cam;
    const paths = [...fix.querySelectorAll('path'), ...cam.querySelectorAll('path')];
    const txts = [...fix.querySelectorAll('text'), ...cam.querySelectorAll('text')];
    const items = paths.map((el) => {
      const fade = el.hasAttribute('data-fade');
      let len = 40;
      if (!fade) {
        len = el.getTotalLength();
        el.style.strokeDasharray = `${len} ${len + 2}`;
        el.style.strokeDashoffset = `${len}`;
      } else {
        el.style.opacity = '0';
      }
      return { el, fade, len };
    });
    const total = items.reduce((s, it) => s + it.len, 0) || 1;
    let acc = 0;
    const W = 0.32; // overlap window
    items.forEach((it) => {
      it.start = (acc / total) * (1 - W);
      it.w = W;
      acc += it.len;
    });
    txts.forEach((t, i) => {
      t.style.opacity = '0';
      t.__start = 0.35 + (i / Math.max(1, txts.length)) * 0.5;
    });
    meta[st] = { g, items, txts, anno: [...cam.querySelectorAll('[data-anno]'), ...fix.querySelectorAll('[data-anno]')] };
  }
  const camera = svg.querySelector('.camera');
  const photoEl = svg.querySelector('.sheet-photo');
  const shade = svg.querySelector('.sheet-shade');
  const bg = svg.querySelector('.sheet-bg');
  const grid = svg.querySelector('.sheet-grid');
  const codes = [...svg.querySelectorAll('.sheet-values text')];

  const state = { load: 0, P: 0, stageIdx: -1 };
  const listeners = [];

  function applyStage(st, p) {
    const m = meta[st];
    for (const it of m.items) {
      const pi = clamp((p - it.start) / it.w);
      if (it.fade) it.el.style.opacity = String(pi);
      else it.el.style.strokeDashoffset = String(it.len * (1 - smooth(pi)));
    }
    for (const t of m.txts) t.style.opacity = String(clamp((p - t.__start) / 0.25));
  }
  function dimAnno(st, amount) {
    const v = String(1 - 0.72 * amount);
    for (const el of meta[st].anno) el.style.setProperty('--dim', v);
  }

  function render() {
    const P = state.P;
    const map = (a, b) => clamp((P - a) / (b - a));
    const prog = {
      land: Math.max(state.load, map(...WIN.land)),
      structure: map(...WIN.structure),
      space: map(...WIN.space),
      experience: map(...WIN.experience),
    };
    for (const st of ORDER) applyStage(st, prog[st]);
    dimAnno('land', smooth(clamp(prog.structure * 2.5)));
    dimAnno('structure', smooth(clamp(prog.space * 2.5)));
    dimAnno('space', smooth(clamp(prog.experience * 2.5)));

    const ph = smooth(map(...PHOTO));
    photoEl.style.opacity = String(ph);
    shade.style.opacity = String(0.34 * ph);
    bg.style.opacity = String(1 - ph);
    grid.style.opacity = String(1 - ph);
    for (const st of ORDER) meta[st].g.style.opacity = String(1 - 0.42 * ph);

    const k = 1 + 0.05 * P;
    const cx = VW / 2, cy = VH / 2 + 10;
    camera.setAttribute('transform', `translate(${cx} ${cy - 16 * P}) scale(${k}) translate(${-cx} ${-cy})`);

    const idx = P < WIN.structure[0] ? 0 : P < WIN.space[0] ? 1 : P < WIN.experience[0] ? 2 : 3;
    if (idx !== state.stageIdx) {
      state.stageIdx = idx;
      const st = ORDER[idx];
      codes.forEach((c) => c.classList.toggle('is-on', c.dataset.st === st));
      listeners.forEach((fn) => fn(idx, st));
    }
  }

  render();
  return {
    setLoad(v) { state.load = clamp(v); render(); },
    setProgress(p) { state.P = clamp(p); render(); },
    onStage(fn) { listeners.push(fn); },
    complete() { state.load = 1; state.P = 1; render(); },
    ORDER,
  };
}
