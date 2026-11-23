// Keeps the shared navigation compact while the page is scrolled.
(() => {
  const header = document.querySelector('.nex-site-header');
  if (!header) return;
  let scheduled = false;
  const update = () => {
    scheduled = false;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }, {passive:true});
  update();
})();
