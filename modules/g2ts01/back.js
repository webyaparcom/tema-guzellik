/* yorum-alinti — Editoryal alıntı yorumlar (15 Kas 2026, G4 · mcp:webmaker/20261115-202337-k60m · D17–D18).
   Yer tutucular: yalsinif yalust yalbaslik yalalintilar yalsecici yaletiket.
   data: [{ alinti, ad, unvan?, img?, puan? (1–5) }] — alinti/unvan dil sözlüğü. Tek büyük alıntı; altta yazar avatarları seçici (sekme) +
   önceki/sonraki. Otomatik geçiş YOK (WCAG 2.2.2). JS'siz tüm alıntılar alt alta. Veri yoksa blok basılmaz. */
const pick = (v) => {
  if (v == null) return "";
  if (typeof v !== "object") return String(v);
  if (typeof wmPickLang === "function") { try { return wmPickLang(v, json.lang) || ""; } catch (e) { /* alt satır */ } }
  return String(v[json.lang] ?? Object.values(v)[0] ?? "");
};
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const medyaUrl = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|file):/i.test(s)) return "";
  if (/^data:/i.test(s)) return /^data:(image|video|audio)\//i.test(s) ? s : "";
  if (s.startsWith("/") || /^https?:\/\//i.test(s)) return s;
  return `/img/${s}`;
};
const href = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|data):/i.test(s)) return "";
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s)) return s;
  return wxLangInternalHref(s);
};
const dogru = (v, d) => (v === undefined || v === null || v === "") ? d : !(v === false || v === "false" || v === 0 || v === "0");
const ikonAd = (v) => String(v ?? "").trim().replace(/[^a-z0-9_]/gi, "");
const satirlar = (s) => esc(s).replace(/\r?\n/g, "<br />");
const { desing: des = {} } = json;
const setting = webmakerdata?.setting ?? {};
const veri = Array.isArray(json.data) ? json.data : [];

const yorumlar = veri
  .map((o) => {
    const p = parseFloat(o && o.puan);
    return { alinti: pick(o && o.alinti).trim(), ad: pick(o && o.ad).trim(), unvan: pick(o && o.unvan).trim(), img: medyaUrl(o && o.img), puan: Number.isFinite(p) ? Math.max(0, Math.min(5, Math.round(p))) : 0 };
  })
  .filter((o) => o.alinti && o.ad);

const basHarf = (ad) => ad.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => [...p][0] || "").join("").toLocaleUpperCase(json.lang);
const yildiz = (n) => (n ? `<p class="modulex-yal-puan" aria-label="${n}/5">${"<span class=\"material-symbols-outlined\" aria-hidden=\"true\">star</span>".repeat(n)}</p>` : "");
const avatar = (y, sinif) => (y.img
  ? `<img class="${sinif}" src="${esc(y.img)}" alt="" width="96" height="96" loading="lazy" decoding="async" />`
  : `<span class="${sinif} modulex-yal-harf" aria-hidden="true">${esc(basHarf(y.ad))}</span>`);

const yalAlintilar = yorumlar.map((y, i) =>
  `<figure class="modulex-yal-alinti" role="tabpanel" id="yal-{{id}}-p${i}" aria-labelledby="yal-{{id}}-s${i}"${i === 0 ? "" : " data-gizli"}>`
  + yildiz(y.puan)
  + `<blockquote class="modulex-yal-metin"><p>${satirlar(y.alinti)}</p></blockquote>`
  + '<figcaption class="modulex-yal-yazar">' + avatar(y, "modulex-yal-avatar")
  + `<span><span class="modulex-yal-ad">${esc(y.ad)}</span>${y.unvan ? `<span class="modulex-yal-unvan">${esc(y.unvan)}</span>` : ""}</span>`
  + "</figcaption></figure>").join("");

const cok = yorumlar.length > 1;
const yalSecici = cok
  ? '<div class="modulex-yal-secici">'
    + '<button class="modulex-yal-ok" type="button" data-yon="-1" aria-label="@previous@"><span class="material-symbols-outlined mx-flip" aria-hidden="true">arrow_back</span></button>'
    + '<div class="modulex-yal-sekmeler" role="tablist">'
    + yorumlar.map((y, i) => `<button class="modulex-yal-sekme" type="button" role="tab" id="yal-{{id}}-s${i}" aria-controls="yal-{{id}}-p${i}" aria-selected="${i === 0 ? "true" : "false"}" tabindex="${i === 0 ? "0" : "-1"}" aria-label="${esc(y.ad)}">${avatar(y, "modulex-yal-kucuk")}</button>`).join("")
    + "</div>"
    + '<button class="modulex-yal-ok" type="button" data-yon="1" aria-label="@next@"><span class="material-symbols-outlined mx-flip" aria-hidden="true">arrow_forward</span></button>'
    + "</div>"
  : "";

const ust = pick(des.ust).trim();
const baslik = pick(des.baslik).trim();

html = html
  .replaceAll("{{yalsinif}}", () => (ust || baslik ? "" : " modulex-yal--bassiz") + (cok ? "" : " modulex-yal--tek"))
  .replaceAll("{{yalust}}", () => (ust ? `<p class="modulex-yal-ust">${esc(ust)}</p>` : ""))
  .replaceAll("{{yalbaslik}}", () => (baslik ? `<h2 class="modulex-yal-baslik" id="yal-{{id}}-baslik">${esc(baslik)}</h2>` : ""))
  .replaceAll("{{yaletiket}}", () => (baslik ? 'aria-labelledby="yal-{{id}}-baslik"' : ""))
  .replaceAll("{{yalalintilar}}", () => yalAlintilar)
  .replaceAll("{{yalsecici}}", () => yalSecici);
if (!yorumlar.length) html = "";
