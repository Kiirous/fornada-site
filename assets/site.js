// Small touches only; the site works fully without JavaScript.
document.documentElement.classList.add('js');

const header = document.querySelector('.site-header');
const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in'));
}

// Safety net: never leave content hidden (old browsers, printing, captures).
setTimeout(() => items.forEach((el) => el.classList.add('in')), 2500);
window.addEventListener('beforeprint', () => items.forEach((el) => el.classList.add('in')));
