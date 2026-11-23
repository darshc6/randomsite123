// A restrained pointer response for the shared footer wordmark.
(() => {
  const footer = document.querySelector('.nex-site-footer');
  const zone = footer?.querySelector('.nex-footer-logo-zone');
  const logo = zone?.querySelector('.nex-footer-logo');
  const wordmark = logo?.querySelector('.nex-footer-wordmark');
  if (!footer || !zone || !logo || !wordmark) return;
  const motion = window.matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)');
  let pointer = null;
  let frame = 0;
  const reset = () => {
    logo.style.setProperty('--footer-logo-x','0px');
    logo.style.setProperty('--footer-logo-y','0px');
    logo.style.setProperty('--footer-logo-r','0deg');
    wordmark.style.setProperty('--footer-spot-radius','0px');
  };
  const update = () => {
    frame = 0;
    if (!motion.matches || !pointer) { reset(); return; }
    const box = zone.getBoundingClientRect();
    const dx = pointer.x - (box.left + box.width / 2);
    const dy = pointer.y - (box.top + box.height / 2);
    const distance = Math.hypot(dx,dy);
    const strength = Math.max(0,1-distance/420);
    if (!strength) { reset(); return; }
    const clamp = (v,limit) => Math.max(-limit,Math.min(limit,v));
    logo.style.setProperty('--footer-logo-x',`${clamp(dx*.055*strength,16).toFixed(1)}px`);
    logo.style.setProperty('--footer-logo-y',`${clamp(dy*.055*strength,11).toFixed(1)}px`);
    logo.style.setProperty('--footer-logo-r',`${clamp(dx*.008*strength,2).toFixed(2)}deg`);
    const letters = wordmark.getBoundingClientRect();
    wordmark.style.setProperty('--footer-spot-x',`${clamp(pointer.x-letters.left,letters.width).toFixed(1)}px`);
    wordmark.style.setProperty('--footer-spot-y',`${clamp(pointer.y-letters.top,letters.height).toFixed(1)}px`);
    wordmark.style.setProperty('--footer-spot-radius',`${(10+86*strength).toFixed(1)}px`);
  };
  document.addEventListener('pointermove',event => {
    if (event.pointerType === 'touch') return;
    pointer = {x:event.clientX,y:event.clientY};
    if (!frame) frame = requestAnimationFrame(update);
  },{passive:true});
  window.addEventListener('blur',reset);
  motion.addEventListener('change',reset);
})();
