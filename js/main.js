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
