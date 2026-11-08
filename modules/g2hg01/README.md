# tema-guzellik · g2hg01 — Hizmet Grid 1

## Nedir

tema-guzellik sitesinin matrix modülü. `Hizmet Grid 1` şablonu (section kökü,
sınıf `modulex-hizgrid`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (2 KB) |
| `index.html` | Modül şablonu (render hedefi) (3 KB) |
| `index.json` | Veri + tema token'ları (0 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `max` | `1200px` |
| `bgcolor` | `#F5F8FC` |
| `accent` | `#2E6BFF` |
| `titlecolor` | `#1B3A6B` |
| `textcolor` | `#475569` |
| `badge` | `{'tr': 'Hizmetler', 'en': 'Services'}` |
| `title` | `{'tr': 'Hizmetlerimiz', 'en': 'Our Services'}` |
| `description` | `{'tr': 'Trafo, iletim, dağıtım ve yenilenebilir enerji altyapısında müteahhitlik hizmetleri.', 'en': 'Contracting for transformers, transmission, distribution and renewables.'}` |

- `name`: `Hizmet Grid 1`
- Diğer anahtarlar: `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **max**, **bgcolor**, **accent**, **titlecolor**, **textcolor**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-hizgrid`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-guzellik sitesinde `web/matrix/modules/g2hg01/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Hizmet Grid 1",
  "desing": {
    "max": "1200px",
    "bgcolor": "#F5F8FC",
    "accent": "#2E6BFF",
    "titlecolor": "#1B3A6B",
    "textcolor": "#475569",
    "badge": {
      "tr": "Hizmetler",
      "en": "Services"
    },
    "title": {
      "tr": "Hizmetlerimiz",
      "en": "Our Services"
    },
    "description": {
      "tr": "Trafo, iletim, dağıtım ve yenilenebilir enerji altyapısında müteahhitlik hizmetleri.",
      "en": "Contracting for transformers, transmission, distribution and renewables."
    },
    "page": "products",
    "size": 4,
    "category": "",
    "aspect-ratio": "16 / 10",
    "linkText": {
      "tr": "İncele",
      "en": "View"
    }
  },
  "da
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
