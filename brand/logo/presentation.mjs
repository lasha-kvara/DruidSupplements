// Builds a self-contained client presentation (druid-logo-presentation.html) from the SVGs in this folder.
// Usage: node brand/logo/presentation.mjs [path-to-old-logo-image]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const svg = (f) => "data:image/svg+xml;base64," + fs.readFileSync(path.join(dir, f)).toString("base64");
const oldLogo = process.argv[2] && fs.existsSync(process.argv[2])
  ? `data:image/${path.extname(process.argv[2]).slice(1)};base64,` + fs.readFileSync(process.argv[2]).toString("base64")
  : null;

const A = svg("druid-mark.svg"), B = svg("druid-mark-emblem.svg"), Cm = svg("druid-mark-mono.svg"), D = svg("druid-badge.svg");

const palette = [
  ["ტყის მწვანე", "#1B3022"], ["პერგამენტი", "#F7F5F0"], ["ტერაკოტა", "#C86D51"], ["ოხრა", "#D6A23E"],
  ["ბალახისფერი", "#6F9A6B"], ["ფირუზისფერი", "#3E8A8F"], ["მეწამული", "#8E5872"], ["ხავსისფერი", "#4E7559"],
];

const page = (inner, cls = "") => `<section class="page ${cls}">${inner}<footer><span>დრუიდი · ლოგოს კონცეფცია</span><span>2026</span></footer></section>`;

const variant = (img, title, text, dark = false) => `
<div class="var ${dark ? "dark" : ""}">
  <div class="art"><img src="${img}"></div>
  <h3>${title}</h3><p>${text}</p>
</div>`;

const html = `<!doctype html><html lang="ka"><head><meta charset="utf-8"><title>დრუიდი — ლოგო</title>
<style>
@page{size:297mm 210mm;margin:0}
*{box-sizing:border-box}
body{margin:0;background:#d9d4c7;font-family:"Segoe UI","Sylfaen",system-ui,sans-serif;color:#1B3022;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:297mm;height:210mm;margin:0 auto 12mm;background:#F7F5F0;position:relative;padding:18mm 20mm 22mm;overflow:hidden;page-break-after:always;break-after:page;display:flex;flex-direction:column}
@media print{body{background:none}.page{margin:0}}
footer{position:absolute;left:20mm;right:20mm;bottom:9mm;display:flex;justify-content:space-between;font-size:8.5pt;letter-spacing:.06em;opacity:.55}
.page.ink{background:#1B3022;color:#F7F5F0}
.eyebrow{font-size:9pt;letter-spacing:.06em;text-transform:uppercase;opacity:.6;margin:0 0 4mm}
h1{font-size:40pt;line-height:1.05;margin:0;font-weight:800;letter-spacing:-.01em}
h2{font-size:22pt;margin:0 0 8mm;font-weight:800}
h3{font-size:12pt;margin:4mm 0 1.5mm;font-weight:700}
p{font-size:10pt;line-height:1.55;margin:0;opacity:.8}
.cover{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:10mm;height:100%}
.cover img{height:150mm;justify-self:center}
.cover .lead{font-size:13pt;margin-top:6mm;max-width:105mm;opacity:.75;line-height:1.5}
.ba{display:grid;grid-template-columns:1fr 14mm 1fr;align-items:center;flex:1}
.ba figure{margin:0;display:flex;flex-direction:column;align-items:center;gap:5mm}
.ba img{height:105mm}
.ba figcaption{font-size:10pt;letter-spacing:.12em;text-transform:uppercase;opacity:.6}
.arrow{font-size:28pt;text-align:center;opacity:.35}
.points{display:grid;grid-template-columns:repeat(4,1fr);gap:7mm;margin-top:6mm}
.points b{display:block;font-size:10.5pt;margin-bottom:1mm}
.points p{font-size:9pt}
.vars{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6mm;flex:1}
.var .art{background:#fff;border-radius:4mm;height:100mm;display:flex;align-items:center;justify-content:center;border:.3mm solid #e2dacb}
.var.dark .art{background:#1B3022;border:0}
.var img{height:82mm;max-width:88%;object-fit:contain}
.var p{font-size:9pt}
.dk{display:grid;grid-template-columns:1.2fr 1fr;gap:12mm;flex:1;align-items:center}
.dk .big{display:flex;justify-content:center}.dk .big img{height:125mm}
.sizes{display:flex;align-items:flex-end;gap:9mm;margin:6mm 0 10mm}
.ink .sizes img{display:block}
.lockup{display:flex;align-items:center;gap:6mm;padding:12mm 14mm;border-radius:4mm}
.lockup img{height:34mm}
.wm{font-size:34pt;font-weight:800;line-height:1;letter-spacing:-.01em}
.sub{font-size:11pt;margin-top:2mm;opacity:.7}
.lk{display:grid;grid-template-columns:1fr 1fr;gap:6mm}
.sw{display:grid;grid-template-columns:repeat(8,1fr);gap:4mm;margin-top:10mm}
.sw i{display:block;border-radius:3mm;height:24mm;border:.3mm solid rgba(0,0,0,.08)}
.sw span{display:block;font-size:8.5pt;margin-top:2mm}.sw code{font-size:8pt;opacity:.6}
</style></head><body>

${page(`<div class="cover"><div>
  <p class="eyebrow">ბრენდის იდენტობა · წინადადება</p>
  <h1>დრუიდი<br>ახალი ლოგო</h1>
  <p class="lead">ორი მეგობარი სოკო, რომელთა ფეხები ალქიმიურ კოლბად ერთიანდება — ბუნება და აფთიაქი ერთ ნიშანში.</p>
</div><img src="${A}"></div>`)}

${page(`<p class="eyebrow">რა შეიცვალა</p><h2>იგივე იდეა — უფრო ზუსტი შესრულება</h2>
<div class="ba">
  <figure>${oldLogo ? `<img src="${oldLogo}">` : ""}<figcaption>არსებული</figcaption></figure>
  <div class="arrow">→</div>
  <figure><img src="${A}"><figcaption>ახალი</figcaption></figure>
</div>
<div class="points">
  <div><b>ერთიანი ხაზი</b><p>ყველა კონტური ერთი სისქისაა, ბრენდის ტყის მწვანე ფერით.</p></div>
  <div><b>სიმეტრია</b><p>ქუდები ერთი ზომის და სიმაღლისაა, კოლბა — ზუსტი წრე.</p></div>
  <div><b>დალაგებული ორნამენტი</b><p>20 შემთხვევითი წრის ნაცვლად 7, ყვავილის ფორმით.</p></div>
  <div><b>ჰარმონიული ფერები</b><p>ბუნებრივი, ერთმანეთთან შეხამებული პალიტრა.</p></div>
</div>`)}

${page(`<p class="eyebrow">ვარიანტები</p><h2>ერთი ნიშანი — სხვადასხვა გამოყენება</h2>
<div class="vars">
${variant(A, "A · ძირითადი", "სახეებით — მეგობრული, დასამახსოვრებელი. საიტი, სარეკლამო მასალა.")}
${variant(B, "B · ემბლემა", "სახეების გარეშე, უფრო მკაცრი. შეფუთვა, ეტიკეტი.")}
${variant(Cm, "C · ერთფეროვანი", "ერთ ფერში. ბეჭედი, გრავირება, შავ-თეთრი ბეჭდვა.")}
${variant(D, "D · ბეჯი", "მრგვალი ფორმა. სოციალური ქსელების ავატარი, სტიკერი.")}
</div>`)}

${page(`<div class="dk"><div class="big"><img src="${A}"></div><div>
<p class="eyebrow">მუქ ფონზე და პატარა ზომებში</p><h2>იკითხება ყველგან</h2>
<p>მუქ ფონზე ნიშანი ღია სილუეტად იქცევა და ფერადი ორნამენტი უფრო ცოცხლდება.</p>
<div class="sizes"><img src="${A}" style="height:30mm"><img src="${A}" style="height:18mm"><img src="${A}" style="height:11mm"><img src="${D}" style="height:22mm"><img src="${D}" style="height:12mm"></div>
</div></div>`, "ink")}

${page(`<p class="eyebrow">ლოგო სახელთან ერთად</p><h2>ლოკაპი და ფერები</h2>
<div class="lk">
  <div class="lockup" style="background:#fff;border:.3mm solid #e2dacb"><img src="${A}"><div><div class="wm">დრუიდი</div><div class="sub">აფთიაქი ბუნებიდან</div></div></div>
  <div class="lockup" style="background:#1B3022;color:#F7F5F0"><img src="${A}"><div><div class="wm">Druid</div><div class="sub">The forest apothecary</div></div></div>
</div>
<div class="sw">${palette.map(([n, c]) => `<div><i style="background:${c}"></i><span>${n}</span><code>${c}</code></div>`).join("")}</div>`)}

</body></html>`;

fs.writeFileSync(path.join(dir, "druid-logo-presentation.html"), html);
console.log("ok");
