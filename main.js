/* =========================================================
   Zobrist Key — Services landing page
   Runtime: reveal-on-scroll, sticky header, form UI state
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    els.forEach(function (el) { io.observe(el); });
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
