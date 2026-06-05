document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('#nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  document.querySelectorAll('.nav-links .dropdown > a').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = dropdownToggle.parentElement;
        parent.classList.toggle('active');
        const sub = parent.querySelector('.dropdown-content');
        if (sub) {
          sub.style.display = parent.classList.contains('active') ? 'block' : 'none';
        }
      }
    });
  });

  document.querySelectorAll('.dropdown-content .dropdown > a').forEach(subToggle => {
    subToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = subToggle.parentElement;
        parent.classList.toggle('active');
        const sub = parent.querySelector('.sub-dropdown-content');
        if (sub) {
          sub.style.display = parent.classList.contains('active') ? 'block' : 'none';
        }
      }
    });
  });
});
