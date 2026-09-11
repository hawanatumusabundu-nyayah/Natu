/**
 * Hawanatu Musa Bundu — Portfolio Interactive Script
 * - Smooth 1-Second Page Transition Loader & Animated Loading Cursor
 * - Elegant Letter-by-Letter / Word-by-Word Heading Text Animations
 * - Interactive Image Showcase & Subtle Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initHeadingAnimations();
  initImageEffects();
  initPhotoSlider();
});

/* ============================================================
   1. SMOOTH PAGE TRANSITIONS & ANIMATED LOADING CURSOR (~1s)
   ============================================================ */
function initPageTransitions() {
  // Create and inject the loader overlay into the document if not present
  let loader = document.getElementById('page-loader');
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.className = 'page-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = `
      <div class="loader-progress-bar">
        <div class="loader-progress-fill"></div>
      </div>
      <div class="loader-content">
        <div class="loader-spinner">
          <div class="spinner-ring outer"></div>
          <div class="spinner-ring inner"></div>
          <div class="loader-monogram">HMB</div>
        </div>
        <div class="loader-status">
          <span class="loader-text">Loading Experience</span>
          <span class="loader-dots"><span>.</span><span>.</span><span>.</span></span>
        </div>
      </div>
    `;
    document.body.prepend(loader);
  }

  // Create a floating custom loading cursor dot that follows the mouse when navigating
  let cursorEl = document.getElementById('custom-loading-cursor');
  if (!cursorEl) {
    cursorEl = document.createElement('div');
    cursorEl.id = 'custom-loading-cursor';
    cursorEl.className = 'custom-loading-cursor';
    document.body.appendChild(cursorEl);

    window.addEventListener('mousemove', (e) => {
      cursorEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }, { passive: true });
  }

  // On initial page load: gracefully dismiss the loader if shown
  window.requestAnimationFrame(() => {
    document.body.classList.add('page-loaded');
    if (loader.classList.contains('active')) {
      loader.classList.remove('active');
    }
  });

  // Handle browser back/forward cache (bfcache)
  window.addEventListener('pageshow', (event) => {
    document.body.classList.remove('is-navigating');
    loader.classList.remove('active');
    cursorEl.classList.remove('active');
  });

  // Intercept navigation clicks on internal links
  document.addEventListener('click', (e) => {
    // Look for closest anchor tag
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Ignore external links, anchor fragments, protocols, new tabs, and modified clicks
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      link.getAttribute('target') === '_blank' ||
      e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0
    ) {
      return;
    }

    // Check if the link points to a destination on the same domain/relative HTML page
    const currentUrl = new URL(window.location.href);
    const targetUrl = new URL(link.href, window.location.href);

    if (targetUrl.origin === currentUrl.origin) {
      // If clicking the current exact page path
      if (targetUrl.pathname === currentUrl.pathname && targetUrl.search === currentUrl.search && !targetUrl.hash) {
        e.preventDefault();
        return;
      }

      // Intercept navigation for smooth 1s transition!
      e.preventDefault();

      // Show loader and animated cursor
      document.body.classList.add('is-navigating');
      loader.classList.add('active');
      cursorEl.classList.add('active');

      // Reset progress bar animation
      const fill = loader.querySelector('.loader-progress-fill');
      if (fill) {
        fill.style.animation = 'none';
        // Trigger reflow
        void fill.offsetWidth;
        fill.style.animation = 'loaderProgress 0.95s cubic-bezier(0.4, 0, 0.2, 1) forwards';
      }

      // Navigate after ~950ms for a smooth 1-second experience
      setTimeout(() => {
        window.location.href = href;
      }, 950);
    }
  });
}

/* ============================================================
   2. SMOOTH, MODERN & PROFESSIONAL HEADING TEXT ANIMATIONS
   ============================================================ */
function initHeadingAnimations() {
  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // 1. Hero greeting typing / letter-reveal effect
  const greeting = document.querySelector('.hero-greeting');
  if (greeting) {
    const rawText = greeting.textContent.trim();
    greeting.textContent = '';
    greeting.classList.add('greeting-animated');

    const wrapper = document.createElement('span');
    wrapper.className = 'greeting-text-inner';
    greeting.appendChild(wrapper);

    // Letter-by-letter reveal
    [...rawText].forEach((char, index) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'greeting-char';
      charSpan.textContent = char === ' ' ? '\u00A0' : char;
      charSpan.style.animationDelay = `${0.1 + index * 0.05}s`;
      wrapper.appendChild(charSpan);
    });

    const cursor = document.createElement('span');
    cursor.className = 'greeting-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    greeting.appendChild(cursor);
  }

  // 2. Select major headings to animate with elegant word & letter reveals
  const headings = document.querySelectorAll('.section-title, .vision-title, .project-title, .contact-name');

  headings.forEach((heading) => {
    // Avoid double splitting
    if (heading.dataset.splitDone) return;
    heading.dataset.splitDone = 'true';

    const text = heading.textContent.trim();
    const words = text.split(/\s+/);

    heading.innerHTML = '';
    heading.classList.add('animated-heading');

    let totalCharCount = 0;

    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'heading-word';

      [...word].forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'heading-char';
        charSpan.textContent = char;
        // Staggered delay per character
        charSpan.style.setProperty('--char-i', totalCharCount);
        charSpan.style.animationDelay = `${0.04 + totalCharCount * 0.035}s`;
        wordSpan.appendChild(charSpan);
        totalCharCount++;
      });

      heading.appendChild(wordSpan);

      // Add a space between words
      if (wordIndex < words.length - 1) {
        const space = document.createTextNode(' ');
        heading.appendChild(space);
      }
    });
  });

  // 3. Intersection Observer for triggering animation when heading scrolls into view
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Once animated, keep in view
        headingObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animated-heading').forEach((h) => {
    headingObserver.observe(h);
  });
}

/* ============================================================
   3. REFINED IMAGE MICRO-INTERACTIONS & HOVER EFFECTS
   ============================================================ */
function initImageEffects() {
  const imageCards = document.querySelectorAll('.portrait-frame, .image-card, .showcase-card');

  imageCards.forEach((card) => {
    // Subtle, smooth 3D tilt on mouse movement (light, professional, not dizzying)
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4; // max 4 deg
      const rotateY = ((x - centerX) / centerX) * 4;  // max 4 deg

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease-out';
    });
  });
}

/* ============================================================
   4. AUTOMATIC PHOTO SLIDER (Crossfading Every 1.5 Seconds)
   ============================================================ */
function initPhotoSlider() {
  const slider = document.getElementById('showcase-slider');
  if (!slider) return;

  const images = slider.querySelectorAll('.slider-img');
  const dots = slider.querySelectorAll('.slider-dot');
  if (images.length < 2) return;

  let currentIndex = 0;
  let timer = null;
  const slideDuration = 3600; // Relaxed ~3.6s display per photo so it moves smoothly and comfortably

  function showSlide(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % images.length;
    showSlide(nextIndex);
  }

  function startAutoSlide() {
    stopAutoSlide();
    timer = setInterval(nextSlide, slideDuration);
  }

  function stopAutoSlide() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // Start automatic cycle
  startAutoSlide();

  // Gentle hover pause so the user can pause and view either image closely
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);

  // Clickable indicator dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      showSlide(i);
      startAutoSlide();
    });
  });
}

