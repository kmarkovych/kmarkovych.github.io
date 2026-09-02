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

GitHub Pages з гілки `main`, корінь репозиторію `kmarkovych.github.io`
(user-site → віддається з кореня, тому всі шляхи абсолютні).

Кастомний домен: `kmarkovych.com` (файл `CNAME`). DNS у Cloudflare, A-записи
`@` вказують прямо на GitHub Pages (185.199.108–111.153) у режимі **DNS only** —
проксі свідомо вимкнено: його WAF раніше віддавав 403 краулерам сторів, а без
проксі GitHub сам випускає сертифікат і працює Enforce HTTPS. Пошта
(support@kmarkovych.com) — Cloudflare Email Routing, MX-записи проксі не
стосуються.

## Дизайн

Один світ на весь сайт — «Datasheet»: холодний технічний папір, хайрлайни замість
карток, моно-мітки (Martian Mono) для метаданих, Archivo для тексту, один
сигнальний акцент. Нова сторінка = ті самі токени й компоненти з `assets/site.css`;
локальних кольорів і розмірів шрифту в розмітці не заводимо.
