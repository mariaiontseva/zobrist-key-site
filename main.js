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

  /* ---------- Contact form: swap to received state on submit ---------- */
  function initForm() {
    var form = document.getElementById('contactForm');
    var success = document.getElementById('formSuccess');
    if (!form || !success) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.hidden = true;
      success.hidden = false;
      success.setAttribute('role', 'status');
    });
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
