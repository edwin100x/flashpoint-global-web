// Moments carousel
function initCarousel() {
  const track = document.getElementById('moments-track');
  const prevBtn = document.getElementById('moments-prev');
  const nextBtn = document.getElementById('moments-next');
  const dotsContainer = document.getElementById('moments-dots');
  if (!track) return;

  const cards = track.querySelectorAll('.moment');
  const cardWidth = () => cards[0].offsetWidth + 16;
  let current = 0;

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'moments__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to moment ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = Math.max(0, Math.min(index, cards.length - 1));
    track.scrollTo({ left: current * cardWidth(), behavior: 'smooth' });
    updateUI();
  }

  function updateUI() {
    dotsContainer.querySelectorAll('.moments__dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === cards.length - 1;
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  track.addEventListener('scroll', () => {
    const idx = Math.round(track.scrollLeft / cardWidth());
    if (idx !== current) { current = idx; updateUI(); }
  }, { passive: true });

  updateUI();
}

// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.stat-card, .step, .who__card, .problem__list li').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

initCarousel();

// Testimonials slider
function initTestimonials() {
  const slider = document.getElementById('testimonials-slider');
  const prevBtn = document.getElementById('testimonials-prev');
  const nextBtn = document.getElementById('testimonials-next');
  const dotsContainer = document.getElementById('testimonials-dots');
  if (!slider) return;

  const cards = slider.querySelectorAll('.testimonial');
  let current = 0;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'moments__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    cards[current].classList.remove('active');
    current = (index + cards.length) % cards.length;
    cards[current].classList.add('active');
    dotsContainer.querySelectorAll('.moments__dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === cards.length - 1;
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Click card to advance
  slider.addEventListener('click', () => {
    if (current < cards.length - 1) goTo(current + 1);
  });

  // Swipe support
  let touchStartX = 0;
  let touchStartY = 0;
  slider.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  slider.addEventListener('touchmove', e => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX);
    const dy = Math.abs(e.touches[0].clientY - touchStartY);
    if (dx > dy && dx > 8) e.preventDefault();
  }, { passive: false });
  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  // Init first card
  cards[0].classList.add('active');
  prevBtn.disabled = true;
}

initTestimonials();

// WhatsApp float — reveal after 50% scroll
(function () {
  const btn = document.querySelector('.whatsapp-float');
  if (!btn) return;
  function checkScroll() {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    btn.classList.toggle('visible', pct >= 0.5);
  }
  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
}());
