/* ============================================================
   The Ashford Inn — Clinton, NC
   Interactions: nav, scroll reveal, form validation
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header ---------- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  function setNav(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(!nav.classList.contains('open'));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setNav(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setNav(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('open')) return;
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setNav(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && nav.classList.contains('open')) setNav(false);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    '.section-head, .card, .tile, .split-media, .split-body, .quote, .info-card, .contact-form-wrap, .section-cta, .cta-inner > *'
  );

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = Math.min(i * 70, 280);
          setTimeout(function () { el.classList.add('in'); }, delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    Array.prototype.forEach.call(revealTargets, function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  function showError(field, message) {
    var el = form.querySelector('.err[data-for="' + field + '"]');
    var input = document.getElementById(field);
    if (el) {
      el.textContent = message;
      el.classList.toggle('show', Boolean(message));
    }
    if (input) {
      input.classList.toggle('invalid', Boolean(message));
      if (message) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    }
  }

  function setStatus(message, kind) {
    if (!status) return;
    status.textContent = message;
    status.className = 'form-status show ' + kind;
  }

  if (form) {
    // Clear errors as the user corrects them
    ['name', 'email', 'message', 'phone'].forEach(function (id) {
      var input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('input', function () {
        if (input.classList.contains('invalid')) showError(id, '');
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var phone = document.getElementById('phone');
      var message = document.getElementById('message');

      var ok = true;
      var firstBad = null;

      // Name
      if (!name.value.trim()) {
        showError('name', 'Please tell us your name.');
        ok = false;
        firstBad = firstBad || name;
      } else {
        showError('name', '');
      }

      // Email
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!email.value.trim()) {
        showError('email', 'Please enter your email address.');
        ok = false;
        firstBad = firstBad || email;
      } else if (!emailRe.test(email.value.trim())) {
        showError('email', 'Please enter a valid email address.');
        ok = false;
        firstBad = firstBad || email;
      } else {
        showError('email', '');
      }

      // Phone (optional, validated only if filled)
      var digits = phone.value.replace(/\D/g, '');
      if (phone.value.trim() && (digits.length < 10 || digits.length > 15)) {
        showError('phone', 'Please enter a valid phone number.');
        ok = false;
        firstBad = firstBad || phone;
      } else {
        showError('phone', '');
      }

      // Message
      if (!message.value.trim()) {
        showError('message', 'Please tell us a little about your event.');
        ok = false;
        firstBad = firstBad || message;
      } else if (message.value.trim().length < 10) {
        showError('message', 'Just a few more details, please.');
        ok = false;
        firstBad = firstBad || message;
      } else {
        showError('message', '');
      }

      if (!ok) {
        setStatus('Please correct the highlighted fields and try again.', 'bad');
        if (firstBad) firstBad.focus();
        return;
      }

      // No backend is configured — hand off to the innkeeper's email client.
      var subject = 'Event Inquiry — The Ashford Inn';
      var type = document.getElementById('eventType').value;
      var date = document.getElementById('eventDate').value;
      var guests = document.getElementById('guests').value;

      var lines = [
        'Name: ' + name.value.trim(),
        'Email: ' + email.value.trim(),
        'Phone: ' + (phone.value.trim() || 'Not provided'),
        'Event type: ' + (type || 'Not specified'),
        'Preferred date: ' + (date || 'Flexible'),
        'Guest count: ' + (guests || 'Not specified'),
        '',
        'Message:',
        message.value.trim()
      ];

      var href =
        'mailto:mcphersonhospitality@gmail.com' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      setStatus(
        'Thank you, ' + name.value.trim().split(' ')[0] +
        '! Your email app is opening with your request ready to send. ' +
        'Prefer to talk? Call (910) 249-9546.',
        'ok'
      );

      window.location.href = href;
      form.reset();
    });
  }

  /* ---------- Smooth anchor scrolling fallback ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 78;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
