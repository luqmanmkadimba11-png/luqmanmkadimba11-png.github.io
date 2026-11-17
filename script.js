(function () {
  'use strict';

  var PHONE = '255716943575';

  /* Mwaka wa footer */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Kivuli cha header ukiscroll */
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Menyu ya simu */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  function closeMenu() {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* Tabs za huduma */
  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('.panel');
  function showTab(id) {
    tabs.forEach(function (t) {
      var on = t.dataset.tab === id;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach(function (p) {
      p.classList.toggle('is-active', p.id === 'tab-' + id);
    });
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function () { showTab(t.dataset.tab); });
  });
  document.querySelectorAll('[data-jump]').forEach(function (a) {
    a.addEventListener('click', function () { showTab(a.dataset.jump); });
  });

  /* Kitufe cha "Omba bei" kinajaza huduma kwenye fomu */
  var service = document.getElementById('fService');
  document.querySelectorAll('[data-service]').forEach(function (a) {
    a.addEventListener('click', function () {
      var value = a.dataset.service;
      for (var i = 0; i < service.options.length; i++) {
        if (service.options[i].text === value) { service.selectedIndex = i; break; }
      }
    });
  });

  /* Fomu -> WhatsApp */
  var form = document.getElementById('quoteForm');
  var err = document.getElementById('formError');
  var nameEl = document.getElementById('fName');
  var phoneEl = document.getElementById('fPhone');
  var msgEl = document.getElementById('fMsg');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    [nameEl, phoneEl, service].forEach(function (el) { el.classList.remove('invalid'); });

    var name = nameEl.value.trim();
    var phone = phoneEl.value.trim();
    var svc = service.value;
    var problems = [];

    if (name.length < 2) { problems.push('jina lako'); nameEl.classList.add('invalid'); }
    if (phone.replace(/\D/g, '').length < 9) { problems.push('namba sahihi ya simu'); phoneEl.classList.add('invalid'); }
    if (!svc) { problems.push('huduma unayohitaji'); service.classList.add('invalid'); }

    if (problems.length) {
      err.textContent = 'Tafadhali weka: ' + problems.join(', ') + '.';
      err.hidden = false;
      return;
    }
    err.hidden = true;

    var text = 'Habari LQ Cyber,\n' +
      'Jina: ' + name + '\n' +
      'Simu: ' + phone + '\n' +
      'Huduma: ' + svc + '\n' +
      (msgEl.value.trim() ? 'Maelezo: ' + msgEl.value.trim() + '\n' : '') +
      'Naomba bei, asante.';

    window.open('https://wa.me/' + PHONE + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });

  /* Animation ya kuonekana ukiscroll */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
