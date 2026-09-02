# kmarkovych.com

Статичний сайт (GitHub Pages, без збірки): особистий бренд + сторінки застосунків
і юридичні документи, потрібні сторам.

## Структура

```
index.html                 головна (профіль + портфель)
autospend/index.html       лендінг AutoSpend
autospend/privacy/         політика приватності (EN + UK) — Privacy URL для ASC/Play
autospend/support/         підтримка + FAQ — Support URL для ASC
autospend/terms/           умови використання / EULA (потрібні для підписок)
assets/site.css            дизайн-система «Datasheet»: токени, сітка, компоненти
404.html · robots.txt · sitemap.xml · CNAME
```

## Локальний перегляд

```bash
python3 -m http.server 8000   # → http://localhost:8000
```

## Публікація

GitHub Pages з гілки `main`, корінь репозиторію. `CNAME` містить `kmarkovych.com`;
до перемикання DNS робочою адресою є `https://<user>.github.io/<repo>/`.

## Дизайн

Один світ на весь сайт — «Datasheet»: холодний технічний папір, хайрлайни замість
карток, моно-мітки (Martian Mono) для метаданих, Archivo для тексту, один
сигнальний акцент. Нова сторінка = ті самі токени й компоненти з `assets/site.css`;
локальних кольорів і розмірів шрифту в розмітці не заводимо.
