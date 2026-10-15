document.documentElement.classList.add('js');

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  nav.classList.toggle('open', open);
}

toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

// Header border once the page scrolls
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Fade sections in as they enter the viewport
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// Contact form: no backend, so build an email in the visitor's mail app
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('[required]').forEach((input) => {
    const empty = !input.value.trim();
    input.closest('.field').classList.toggle('invalid', empty);
    if (empty && ok) {
      input.focus();
      ok = false;
    }
  });
  if (!ok) return;

  const data = new FormData(form);
  const subject = `Enquiry: ${data.get('interest')} (${data.get('name')})`;
  const body = [
    `Name: ${data.get('name')}`,
    data.get('org') ? `Business / organisation: ${data.get('org')}` : '',
    `Interested in: ${data.get('interest')}`,
    '',
    data.get('message'),
  ]
    .filter((line, i) => line !== '' || i === 3)
    .join('\n');

  window.location.href =
    'mailto:timeandchance101@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});

document.getElementById('year').textContent = new Date().getFullYear();
