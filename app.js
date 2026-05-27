// ─── NAV ───
(function() {
  const nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    // close mobile menu on any link click
    links.addEventListener('click', function(e) {
      if (e.target.closest('a') && !e.target.closest('.dropdown-menu a') && !e.target.closest('a[href*="?"]')) {
        // do nothing for dropdown parents
      } else if (e.target.closest('a')) {
        setTimeout(function() { links.classList.remove('open'); }, 100);
      }
    });
  }

  // highlight current page
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links > li > a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ─── YEAR ───
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
});
