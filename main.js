document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;

      // Update active button
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active pane
      tabPanes.forEach(pane => {
        if (pane.id === target) {
          pane.style.display = 'block';
        } else {
          pane.style.display = 'none';
        }
      });
    });
  });

  // Sticky Nav background transition
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(8, 8, 8, 0.9)';
      nav.style.padding = '10px 5%';
    } else {
      nav.style.background = 'rgba(255, 255, 255, 0.03)';
      nav.style.padding = '0 5%';
    }
  });
});
