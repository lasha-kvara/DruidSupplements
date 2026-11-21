// Generates Druid logo variants into <outDir>
import fs from "node:fs";
import path from "node:path";

const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });

const C = {
  ink: "#1B3022", // forest
  paper: "#F7F5F0", // parchment
  terra: "#C86D51",
  sage: "#6F9A6B",
  ochre: "#D6A23E",
  teal: "#3E8A8F",
  plum: "#8E5872",
  moss: "#4E7559",
};

const SW = 6; // master stroke weight

// Silhouette of the two stems forming a flask neck + round body
const flask = `M104 84 L109.5 130 Q110.5 135 115.5 135 L124.5 135 Q129.5 135 130.5 130 L136 84 L150 84 L155 130 Q156 138 162 143 A74 74 0 1 1 78 143 Q84 138 85 130 L90 84 Z`;
const cap = (cx) =>
  `M${cx - 43} 86 C${cx - 44} 46 ${cx - 20} 12 ${cx} 12 C${cx + 20} 12 ${cx + 44} 46 ${cx + 43} 86 Q${cx} 77 ${cx - 42} 86 Z`;
// gill line under the cap
const gill = (cx) => `M${cx - 34} 86.5 Q${cx} 81 ${cx + 34} 86.5`;

const ring = (x, y, r, color, ink = false) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.paper}" stroke="${color}" stroke-width="${(r * 0.36).toFixed(1)}"/>` +
  `<circle cx="${x}" cy="${y}" r="${(r * 0.34).toFixed(1)}" fill="${color}"/>`;

// rosette of spots in the body
function spots(mono) {
  const cx = 120, cy = 207, d = 38;
  const cols = mono
    ? Array(7).fill(C.ink)
    : [C.terra, C.ochre, C.sage, C.teal, C.plum, C.moss, C.terra];
  let s = ring(cx, cy, 14, cols[0]);
  const angles = [-90, -30, 30, 90, 150, 210];
  angles.forEach((a, i) => {
    const r = (a * Math.PI) / 180;
    s += ring(+(cx + d * Math.cos(r)).toFixed(2), +(cy + d * Math.sin(r)).toFixed(2), 10, cols[i + 1]);
  });
  return s;
}

function face(cx, iris, mono) {
  const eye = (x) =>
    `<circle cx="${x}" cy="60" r="6.5" fill="${C.ink}"/>` +
    `<circle cx="${x}" cy="60" r="3" fill="${mono ? C.paper : iris}"/>`;
  return (
    eye(cx - 9) +
    eye(cx + 9) +
    `<path d="M${cx - 5} 72 Q${cx} 76 ${cx + 5} 72" fill="none" stroke="${C.ink}" stroke-width="2.6" stroke-linecap="round"/>`
  );
}

// variant: "friends" (faces), "emblem" (no faces), "mono"
function mark({ faces = true, mono = false, badge = false } = {}) {
  const st = `stroke="${C.ink}" stroke-width="${SW}" stroke-linejoin="round" stroke-linecap="round"`;
  let g = "";
  g += `<path d="${flask}" fill="${C.paper}" ${st}/>`;
  g += spots(mono);
  for (const [cx, iris] of [[92, C.sage], [148, C.teal]]) {
    g += `<path d="${cap(cx)}" fill="${C.paper}" ${st}/>`;
    g += `<path d="${gill(cx)}" fill="none" stroke="${C.ink}" stroke-width="2" stroke-linecap="round" opacity=".35"/>`;
    if (faces) g += face(cx === 92 ? 87 : cx, iris, mono);
  }
  if (badge) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -24 320 320"><circle cx="120" cy="136" r="160" fill="${C.ink}"/><circle cx="120" cy="136" r="150" fill="none" stroke="${C.paper}" stroke-width="2" opacity=".35"/><g transform="translate(120 136) scale(.86) translate(-120 -145)">${g}</g></svg>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="38 4 164 282">${g}</svg>`;
}

const files = {
  "druid-mark.svg": mark({ faces: true }),
  "druid-mark-emblem.svg": mark({ faces: false }),
  "druid-mark-mono.svg": mark({ faces: true, mono: true }),
  "druid-badge.svg": mark({ faces: true, badge: true }),
};
for (const [n, s] of Object.entries(files)) fs.writeFileSync(path.join(out, n), s);

const U=(f)=>"data:image/svg+xml;base64,"+Buffer.from(files[f]).toString("base64");
const card = (title, file, bg, fg) => `
<figure style="background:${bg};color:${fg}">
  <img src="${U(file)}" style="height:220px">
  <div class="sizes"><img src="${U(file)}" style="height:64px"><img src="${U(file)}" style="height:40px"><img src="${U(file)}" style="height:24px"></div>
  <figcaption>${title}</figcaption>
</figure>`;

const lockup = (bg, fg, sub) => `
<div class="lockup" style="background:${bg}">
  <img src="${U("druid-mark.svg")}" style="height:96px">
  <div><div class="wm" style="color:${fg}">დრუიდი</div><div class="sub" style="color:${sub}">აფთიაქი ბუნებიდან</div></div>
  <span style="width:48px"></span>
  <img src="${U("druid-mark.svg")}" style="height:96px">
  <div><div class="wm" style="color:${fg}">Druid</div><div class="sub" style="color:${sub}">The forest apothecary</div></div>
</div>`;

fs.writeFileSync(
  path.join(out, "preview.html"),
  `<!doctype html><meta charset="utf-8"><title>Druid logo</title>
<style>
body{margin:0;padding:32px;font-family:system-ui,sans-serif;background:#ece8dd;color:#1B3022}
h2{margin:32px 0 12px;font-size:15px;letter-spacing:.08em;text-transform:uppercase;opacity:.7}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}
figure{margin:0;border-radius:16px;padding:24px;display:flex;flex-direction:column;align-items:center;gap:16px}
figcaption{font-size:13px;opacity:.8}
.sizes{display:flex;align-items:end;gap:16px}
.lockup{display:flex;align-items:center;gap:16px;padding:28px 32px;border-radius:16px;margin-bottom:16px;flex-wrap:wrap}
.wm{font-size:40px;font-weight:800;letter-spacing:-.02em;line-height:1}
.sub{font-size:14px;margin-top:6px;letter-spacing:.04em}
</style>
<h2>Marks</h2><div style="display:flex;gap:16px"><figure style="background:#F7F5F0"><img src="${U("druid-mark.svg")}" style="height:520px"></figure><figure style="background:#1B3022"><img src="${U("druid-badge.svg")}" style="height:420px"></figure></div>
<div class="grid">
${card("A · Friends (main)", "druid-mark.svg", "#F7F5F0", "#1B3022")}
${card("B · Emblem (no faces)", "druid-mark-emblem.svg", "#F7F5F0", "#1B3022")}
${card("C · Mono", "druid-mark-mono.svg", "#F7F5F0", "#1B3022")}
${card("D · Badge / avatar", "druid-badge.svg", "#F7F5F0", "#1B3022")}
</div>
<h2>On dark</h2>
<div class="grid">
${card("A on forest", "druid-mark.svg", "#1B3022", "#F7F5F0")}
${card("D on dark", "druid-badge.svg", "#0E1511", "#F7F5F0")}
</div>
<h2>Lockups</h2>
${lockup("#F7F5F0", "#1B3022", "#646B67")}
${lockup("#1B3022", "#F7F5F0", "rgba(247,245,240,.7)")}
`
);
console.log("ok");
