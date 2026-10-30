/* hizmet-grid-1 — page-list turevi: webmakerdata[desing.page].data */

function hg1Lang(val) {
  if (val == null) {
    return "";
  }
  if (typeof val === "object") {
    if (val[json.lang] != null) {
      return val[json.lang];
    }
    if (val.tr != null) {
      return val.tr;
    }
    var hg1Keys = Object.keys(val);
    return hg1Keys.length ? (val[hg1Keys[0]] || "") : "";
  }
  return String(val);
}

function hg1Short(text, maxLen) {
  var s = text ? String(text) : "";
  if (s.length <= maxLen) {
    return s;
  }
  return s.slice(0, maxLen - 1).replace(/\s+\S*$/, "") + "\u2026";
}

var pageKey = json.desing && json.desing.page ? json.desing.page : "products";
var pageBucket = webmakerdata[pageKey];
var list = pageBucket && pageBucket.data ? pageBucket.data : [];
var catFilter = json.desing && json.desing.category != null ? json.desing.category : "";
var linkLabel = hg1Lang(json.desing && json.desing.linkText ? json.desing.linkText : { tr: "Detay", en: "Details" });

var backhtml = "";
var hi = 0;
for (var iterator of list) {
  try {
    var statusOk = iterator["status"] === "play";
    var catOk = catFilter === "" || iterator["category"] === catFilter;
    /* category bucket: tum play satirlari (ust kategori landing) */
    if (pageKey === "category") {
      catOk = true;
    }
    if (statusOk && catOk) {
      var title = hg1Lang(iterator["name"]);
      if (!title) {
        continue;
      }
      var descRaw = hg1Lang(iterator["description"]);
      if (!descRaw && iterator["spot"]) {
        descRaw = hg1Lang(iterator["spot"]);
      }
      var descLine = descRaw ? hg1Short(descRaw, 120) : "";
      var imgSrc = iterator["id"] && iterator["img"]
        ? "/page/" + iterator["id"] + "/" + iterator["img"]
        : "";
      backhtml +=
        '<a class="modulex-hizgrid-link" href="' + wxLangInternalHref(iterator["path"]) + '">' +
        '<article class="modulex-hizgrid-card" style="animation-delay:' + (hi * 0.06) + 's">' +
        (imgSrc ? '<div class="modulex-hizgrid-img"><img src="' + imgSrc + '" alt="' + title + '"></div>' : "") +
        '<div class="modulex-hizgrid-content">' +
        '<h3 class="modulex-hizgrid-card-title">' + title + "</h3>" +
        (descLine ? '<p class="modulex-hizgrid-card-desc">' + descLine + "</p>" : "") +
        (linkLabel ? '<span class="modulex-hizgrid-more">' + linkLabel + " &rarr;</span>" : "") +
        "</div></article></a>";
      hi++;
    }
  } catch (error) {}
}
html = html.replace(/{{html}}/g, backhtml);
