// The 'js' class is set by an inline script in <head> so reveal styles apply before first paint.

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  nav.classList.toggle('open', open);
}

const menuOpen = () => toggle.getAttribute('aria-expanded') === 'true';

toggle.addEventListener('click', () => setMenu(!menuOpen()));
nav.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen()) {
    setMenu(false);
    toggle.focus();
  }
});
// Close the menu when a tap lands outside the header.
document.addEventListener('click', (e) => {
  if (menuOpen() && !e.target.closest('.site-header')) setMenu(false);
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

// Contact form: no backend, so build an email in the visitor's mail app.
const EMAIL = 'timeandchance101@gmail.com';
const form = document.getElementById('contact-form');
const status = form.querySelector('.form-status');
const messages = {
  name: 'Please enter your name.',
  message: 'Please tell us a little about what you need.',
};

// Validation is handled here so errors are shown as text, not only a red border.
form.noValidate = true;

function setError(input, text) {
  const field = input.closest('.field');
  const error = field.querySelector('.field-error');
  field.classList.toggle('invalid', Boolean(text));
  if (text) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
  if (error) error.textContent = text;
}

form.querySelectorAll('[required]').forEach((input) => {
  input.addEventListener('input', () => {
    if (input.value.trim()) setError(input, '');
  });
});

// Kept separate so tests can stub it; mail apps are opened by navigating to the mailto URL.
window.openMail = window.openMail || ((url) => (window.location.href = url));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let firstInvalid = null;
  form.querySelectorAll('[required]').forEach((input) => {
    const empty = !input.value.trim();
    setError(input, empty ? messages[input.name] : '');
    if (empty && !firstInvalid) firstInvalid = input;
  });
  if (firstInvalid) {
    status.hidden = true;
    firstInvalid.focus();
    return;
  }

  const data = new FormData(form);
  const name = data.get('name').trim();
  const org = data.get('org').trim();
  const subject = `Enquiry: ${data.get('interest')} (${name})`;
  const lines = [`Name: ${name}`];
  if (org) lines.push(`Business / organisation: ${org}`);
  lines.push(`Interested in: ${data.get('interest')}`, '', data.get('message').trim());

  window.openMail(
    `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`,
  );

  // Some devices have no mail app set up, so always show another way to reach us.
  status.hidden = false;
  status.innerHTML = '';
  status.append(
    'Your email app should open with the message ready to send. If nothing opened, email ',
    Object.assign(document.createElement('a'), { href: `mailto:${EMAIL}`, textContent: EMAIL }),
    ' or ',
    Object.assign(document.createElement('a'), {
      href: 'https://wa.me/26771542011',
      textContent: 'message us on WhatsApp',
      target: '_blank',
      rel: 'noopener',
    }),
    '.',
  );
});

document.getElementById('year').textContent = new Date().getFullYear();
