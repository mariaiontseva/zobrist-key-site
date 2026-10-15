/* =========================================================
   Zobrist Key — Services landing page
   Runtime: reveal-on-scroll, sticky header, form UI state
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Reveal on scroll (IntersectionObserver) ----------
     Fails safe: any problem reveals everything rather than hiding it. */
  function revealAll(els) {
    els.forEach(function (el) { el.classList.add('is-in'); });
  }

  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    // No IntersectionObserver support → just show everything.
    if (!('IntersectionObserver' in window)) { revealAll(els); return; }

    try {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

      var vh = window.innerHeight || document.documentElement.clientHeight;
      els.forEach(function (el) {
        // Anything already in (or above) the viewport: reveal immediately,
        // so above-the-fold content is never blank waiting on the async IO.
        if (el.getBoundingClientRect().top < vh) {
          el.classList.add('is-in');
        } else {
          io.observe(el);
        }
      });
    } catch (err) {
      revealAll(els); // observer construction/observe threw → never hide content
    }
  }

  /* ---------- Sticky header: toggle compact state past 20px ---------- */
  function initHeader() {
    var header = document.getElementById('siteHeader');
    if (!header) return;

    var scrolled = null; // track state so we only mutate on change
    function onScroll() {
      var isScrolled = window.scrollY > 20;
      if (isScrolled === scrolled) return;
      scrolled = isScrolled;
      header.classList.toggle('is-scrolled', isScrolled);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Contact form: send the enquiry, then show received state ----------
     Posts to the Zobrist Key contact endpoint (a small serverless function that
     emails info@zobristkey.com via Resend). Falls back to a direct mailto if the
     request fails. */
  var CONTACT_ENDPOINT = 'https://zobrist-key-api.vercel.app/api/contact';

  function initForm() {
    var form = document.getElementById('contactForm');
    var success = document.getElementById('formSuccess');
    if (!form || !success) return;

    var btn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearError(form);

      var val = function (n) {
        var el = form.elements[n];
        return el && el.value ? String(el.value).trim() : '';
      };
      var data = {
        name: val('name'),
        contact: val('contact'),
        enquiry: val('enquiry'),
        botcheck: form.elements['botcheck'] ? form.elements['botcheck'].value : ''
      };

      if (btn) { btn.disabled = true; btn._label = btn.textContent; btn.textContent = 'Sending…'; }

      fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json().catch(function () { return { ok: r.ok }; }); })
        .then(function (res) {
          if (!res || !res.ok) throw new Error((res && res.error) || 'send failed');
          form.hidden = true;
          success.hidden = false;
          success.setAttribute('role', 'status');
        })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = btn._label || 'Send request'; }
          showError(form);
        });
    });
  }

  function clearError(form) {
    var e = form.querySelector('.form__error');
    if (e) e.parentNode.removeChild(e);
  }

  function showError(form) {
    clearError(form);
    var p = document.createElement('p');
    p.className = 'form__error';
    p.setAttribute('role', 'alert');
    p.innerHTML = 'Something went wrong. Please email us directly at ' +
      '<a href="mailto:info@zobristkey.com">info@zobristkey.com</a>.';
    form.appendChild(p);
  }

  function init() {
    initReveal();
    initHeader();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
