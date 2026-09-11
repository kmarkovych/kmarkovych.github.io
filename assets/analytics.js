/* Google Analytics 4 behind consent.
 *
 * The site's position is that nothing is collected unless the visitor says
 * so: no request reaches Google before Accept is pressed, and Decline is
 * remembered just as firmly as Accept. The measurement id lives here and
 * nowhere else; until a real one is set the banner never appears and no
 * script loads, so the site is never broken by a missing id.
 */
(function () {
  'use strict';

  var GA_ID = 'G-XXXXXXXXXX';
  var STORAGE_KEY = 'analytics-consent';
  var GRANTED = 'granted';
  var DENIED = 'denied';

  if (!/^G-[A-Z0-9]{6,}$/.test(GA_ID)) return;

  function stored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      // Private mode or blocked storage: treat as "not asked" and never
      // load analytics, rather than asking on every page view.
      return DENIED;
    }
  }

  function remember(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* nothing to do: the decision holds for this page only */
    }
  }

  function load() {
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(tag);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    // No ad features, and the last octet of the IP is dropped before it is
    // stored: the report answers "how many and from where", not "who".
    gtag('config', GA_ID, { anonymize_ip: true, allow_google_signals: false });
  }

  function banner() {
    var uk = (document.documentElement.lang || 'en').slice(0, 2) === 'uk';
    var box = document.createElement('div');
    box.className = 'consent';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-live', 'polite');
    box.setAttribute('aria-label', uk ? 'Згода на аналітику' : 'Analytics consent');

    var text = document.createElement('p');
    text.textContent = uk
      ? 'Можна рахувати анонімні візити через Google Analytics, щоб я бачив, які сторінки читають? Застосунки не збирають нічого незалежно від цієї відповіді.'
      : 'May I count anonymous visits with Google Analytics to see which pages get read? The apps collect nothing either way.';

    var actions = document.createElement('div');
    actions.className = 'consent-actions';

    var accept = document.createElement('button');
    accept.type = 'button';
    accept.className = 'btn btn--signal';
    accept.textContent = uk ? 'Дозволити' : 'Allow';

    var decline = document.createElement('button');
    decline.type = 'button';
    decline.className = 'btn';
    decline.textContent = uk ? 'Не треба' : 'No thanks';

    accept.addEventListener('click', function () {
      remember(GRANTED);
      box.remove();
      load();
    });
    decline.addEventListener('click', function () {
      remember(DENIED);
      box.remove();
    });

    actions.appendChild(accept);
    actions.appendChild(decline);
    box.appendChild(text);
    box.appendChild(actions);
    document.body.appendChild(box);
  }

  var decision = stored();
  if (decision === GRANTED) {
    load();
  } else if (decision !== DENIED) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', banner);
    } else {
      banner();
    }
  }
})();
