// Bots4Botswana — shared interactions
document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
      const expanded = toggle.classList.contains('open');
      toggle.setAttribute('aria-expanded', String(expanded));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    }));
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* Animated counters: <span class="stat-num" data-count-to="60" data-suffix="+"> */
  const counters = document.querySelectorAll('[data-count-to]');
  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-count-to'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();
    const startVal = 0;
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(startVal + (target - startVal) * eased);
      el.textContent = val + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => cio.observe(c));
  } else {
    counters.forEach(animateCounter);
  }

  /* Progress bar fill: <div class="progress-fill" data-percent="46"> */
  const bars = document.querySelectorAll('.progress-fill');
  if ('IntersectionObserver' in window && bars.length) {
    const bio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const pct = entry.target.getAttribute('data-percent') || '0';
          requestAnimationFrame(() => { entry.target.style.width = pct + '%'; });
          bio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => bio.observe(b));
  } else {
    bars.forEach(b => { b.style.width = (b.getAttribute('data-percent') || '0') + '%'; });
  }

  /* Route map dash animation trigger on view */
  const routePaths = document.querySelectorAll('.route-path');
  if ('IntersectionObserver' in window && routePaths.length) {
    const rio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate');
      });
    }, { threshold: 0.3 });
    routePaths.forEach(p => rio.observe(p));
  }

  /* Active nav link based on current file */
  const current = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* Contact / newsletter forms — front-end only demo handling */
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form-note');
      if (note) {
        note.textContent = 'Thanks — this is a demo form. Wire it up to your email or CRM of choice.';
        note.style.color = 'var(--trace)';
      }
      form.reset();
    });
  });

});
