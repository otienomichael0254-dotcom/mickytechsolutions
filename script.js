// MICKY TECH SOLUTIONS — shared interactions
document.addEventListener('DOMContentLoaded', function () {

  // Theme toggle
  var themeToggle = document.querySelector('.theme-toggle');
  var navCta = document.querySelector('.nav-cta');
  var savedTheme = localStorage.getItem('theme');
  var systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  var currentTheme = savedTheme || systemTheme;

  function applyTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    if (themeToggle) {
      themeToggle.innerHTML = '<span class="theme-toggle-icon">' + (theme === 'dark' ? '☀️' : '🌙') + '</span><span class="theme-toggle-label">' + (theme === 'dark' ? 'Light' : 'Dark') + '</span>';
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    localStorage.setItem('theme', theme);
  }

  if (!themeToggle && navCta) {
    themeToggle = document.createElement('button');
    themeToggle.type = 'button';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    navCta.insertBefore(themeToggle, navCta.firstChild);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  applyTheme(currentTheme);

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Reveal-on-scroll for feature showcase
  var revealItems = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealItems.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
    });
  });

  // FAQ category filter
  var filters = document.querySelectorAll('.faq-filter');
  if (filters.length) {
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-cat');
        document.querySelectorAll('.faq-cat, .faq-item').forEach(function (el) {
          if (cat === 'all') { el.style.display = ''; return; }
          el.style.display = (el.getAttribute('data-cat') === cat) ? '' : 'none';
        });
      });
    });
  }

  // Pricing monthly/annual toggle
  var planBtns = document.querySelectorAll('.plan-toggle button');
  if (planBtns.length) {
    planBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        planBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var mode = btn.getAttribute('data-mode');
        document.querySelectorAll('.plan-price').forEach(function (el) {
          el.querySelector('.price-monthly').style.display = mode === 'monthly' ? 'inline' : 'none';
          el.querySelector('.price-annual').style.display = mode === 'annual' ? 'inline' : 'none';
        });
      });
    });
  }

  // Back to top
  var backTop = document.querySelector('.back-top');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.classList.toggle('show', window.scrollY > 500);
    });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Contact / newsletter form demo submit
  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.parentElement.querySelector('.form-success');
      if (msg) msg.style.display = 'block';
      form.reset();
    });
  });
});
