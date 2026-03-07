/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Portfolio â€“ Interactions
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
;(function () {
  'use strict';

  /*  DOM cache â”€ */
  const nav       = document.querySelector('.nav');
  const toggle    = document.querySelector('.nav__toggle');
  const menu      = document.querySelector('.nav__menu');
  const navLinks  = document.querySelectorAll('.nav__link, .nav__resume');
  const yearEl    = document.getElementById('year');

  /*  Copyright year  */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /*  Dark mode  */
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon   = document.getElementById('themeIcon');
  var htmlEl      = document.documentElement;

  function getSystemDark () {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme (dark) {
    if (dark) {
      htmlEl.setAttribute('data-theme', 'dark');
      themeIcon.className = 'fa-solid fa-sun';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      htmlEl.setAttribute('data-theme', 'light');
      themeIcon.className = 'fa-solid fa-moon';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  // Load saved preference, default to dark
  var saved = localStorage.getItem('theme');
  applyTheme(saved !== 'light');

  themeToggle.addEventListener('click', function () {
    var isDark = htmlEl.getAttribute('data-theme') === 'dark';
    applyTheme(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    // Spin the icon for delight
    themeIcon.style.transform = 'rotate(360deg)';
    setTimeout(function () { themeIcon.style.transform = ''; }, 500);
  });

  /*  Mobile menu  */
  function closeMenu () {
    toggle.classList.remove('active');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /*  Nav shadow on scroll  */
  function handleScroll () {
    if (window.scrollY > 10) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /*  Lenis smooth scroll  */
  var lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.4,
      easing: function (t) { return 1 - Math.pow(1 - t, 4); },
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });
    function lenisRaf (time) {
      lenis.raf(time);
      requestAnimationFrame(lenisRaf);
    }
    requestAnimationFrame(lenisRaf);
  }

  /*  Scroll progress bar  */
  var progressBar = document.getElementById('scroll-progress');
  function updateProgress () {
    var scrolled = window.scrollY;
    var total    = document.documentElement.scrollHeight - window.innerHeight;
    var ratio    = total > 0 ? scrolled / total : 0;
    if (progressBar) progressBar.style.transform = 'scaleX(' + ratio + ')';
  }
  if (lenis) {
    lenis.on('scroll', updateProgress);
  } else {
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  /*  Active nav link on scroll  */
  var sections    = document.querySelectorAll('section[id], header[id]');
  var sectionLinks = document.querySelectorAll('.nav__link[href^="#"]');
  function updateActiveNav () {
    var scrollMid = window.scrollY + window.innerHeight * 0.35;
    var current   = '';
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollMid) current = sec.id;
    });
    sectionLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /*  Anchor click scroll  */
  var navHeight = nav.offsetHeight || 56;
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(href === '#' ? 0 : href, { offset: -navHeight, duration: 1.4 });
      } else {
        var target = document.querySelector(href === '#' ? 'body' : href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /*  Hero entrance animation  */
  var hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        hero.classList.add('animate');
      });
    });
  }

  /*  Rotating typewriter on hero tagline  */
  var rotateEl = document.querySelector('.hero__rotate[data-words]');
  if (rotateEl) {
    var words = JSON.parse(rotateEl.getAttribute('data-words'));
    var cursor = document.createElement('span');
    cursor.className = 'rotate-cursor';
    rotateEl.textContent = '';
    rotateEl.appendChild(cursor);

    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 80;
    var deleteSpeed = 40;
    var pauseAfterType = 2000;
    var pauseAfterDelete = 400;
    var startDelay = 900;

    function tick () {
      var current = words[wordIndex];
      var displayed = current.substring(0, charIndex);

      // Set text before cursor
      while (rotateEl.firstChild !== cursor) {
        rotateEl.removeChild(rotateEl.firstChild);
      }
      if (displayed) {
        rotateEl.insertBefore(document.createTextNode(displayed), cursor);
      }

      if (!isDeleting && charIndex < current.length) {
        charIndex++;
        setTimeout(tick, typeSpeed);
      } else if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, pauseAfterType);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(tick, deleteSpeed);
      } else {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, pauseAfterDelete);
      }
    }

    setTimeout(tick, startDelay);
  }

  /*  Ripple on buttons  */
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var r = btn.getBoundingClientRect();
      var size = Math.max(r.width, r.height) * 1.6;
      var el = document.createElement('span');
      el.className = 'ripple';
      el.style.cssText = [
        'width:'  + size + 'px',
        'height:' + size + 'px',
        'left:'   + (e.clientX - r.left - size / 2) + 'px',
        'top:'    + (e.clientY - r.top  - size / 2) + 'px'
      ].join(';');
      btn.appendChild(el);
      setTimeout(function () { el.remove(); }, 600);
    });
  });

  /*  3-D tilt on glass cards  */
  document.querySelectorAll('.skill-group, .project-card, .timeline__card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width  - 0.5;
      var y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = [
        'perspective(600px)',
        'rotateX(' + (-y * 8) + 'deg)',
        'rotateY(' + ( x * 8) + 'deg)',
        'translateZ(4px)'
      ].join(' ');
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  /*  Staggered social icons pop on reveal â”€ */
  var socialIcons = document.querySelectorAll('.contact__social a');
  if ('IntersectionObserver' in window && socialIcons.length) {
    var socialObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          socialIcons.forEach(function (icon, i) {
            setTimeout(function () {
              icon.style.transition = 'opacity .4s ease, transform .4s cubic-bezier(.175,.885,.32,1.275)';
              icon.style.opacity  = '1';
              icon.style.transform = 'translateY(0) scale(1)';
            }, i * 80);
          });
          socialObs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    // Start hidden
    socialIcons.forEach(function (icon) {
      icon.style.opacity = '0';
      icon.style.transform = 'translateY(20px) scale(0.8)';
    });
    socialObs.observe(socialIcons[0].parentElement);
  }
  var allAnimated = document.querySelectorAll('.reveal, .stagger, .reveal-left, .reveal-scale');

  // Also observe about__facts for staggered pop-in
  var factsGrid = document.querySelector('.about__facts');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    allAnimated.forEach(function (el) { observer.observe(el); });

    // Facts grid separate observer
    if (factsGrid) {
      var factsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('facts-animated');
            factsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      factsObserver.observe(factsGrid);
    }
  } else {
    allAnimated.forEach(function (el) { el.classList.add('revealed'); });
    if (factsGrid) factsGrid.classList.add('facts-animated');
  }

})();
