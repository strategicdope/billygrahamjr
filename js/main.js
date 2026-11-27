// Footer year
document.querySelectorAll('[data-year]').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// "I'm a:" typing line in the hero. Words come from data-typed-items.
(function () {
  var el = document.querySelector('.typed');
  if (!el) return;
  var words = el.getAttribute('data-typed-items').split(',').map(function (w) { return w.trim(); });
  var line = el.parentNode;
  // Screen readers get the whole list once instead of letter-by-letter changes.
  line.setAttribute('aria-label', "I'm a: " + words.join(', '));
  el.setAttribute('aria-hidden', 'true');
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = words.join(' · ');
    return;
  }
  var w = 0, i = words[0].length, deleting = true;
  function tick() {
    var word = words[w];
    if (deleting) {
      i--;
      if (i <= 0) { deleting = false; w = (w + 1) % words.length; }
    } else {
      i++;
    }
    el.textContent = words[w].slice(0, Math.max(i, 0));
    var delay = deleting ? 45 : 95;
    if (!deleting && i >= words[w].length) { deleting = true; delay = 1600; }
    if (deleting && i === 0) delay = 300;
    setTimeout(tick, delay);
  }
  setTimeout(tick, 1600);
})();

// Watch BG popup: open on the hero button, close on X, backdrop or Escape.
(function () {
  var modal = document.getElementById('watch-bg');
  if (!modal) return;
  var video = modal.querySelector('video');
  var opener = null;
  function open(e) {
    opener = e.currentTarget;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modal.querySelector('.video-modal__close').focus();
    var p = video.play(); if (p && p.catch) p.catch(function () {});
  }
  function close() {
    video.pause();
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (opener) opener.focus();
  }
  document.querySelectorAll('[data-open-video]').forEach(function (b) { b.addEventListener('click', open); });
  modal.querySelectorAll('[data-close-video]').forEach(function (b) { b.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });
})();

// Deed Papers signup popup: opens from any [data-open-signup] button, or when the
// page loads with #get in the address (the Shop and homepage links use that).
(function () {
  var modal = document.getElementById('get');
  if (!modal) return;
  var opener = null;
  function open(e) {
    if (e) { e.preventDefault(); opener = e.currentTarget; }
    modal.hidden = false;
    document.body.classList.add('modal-open');
    var first = modal.querySelector('input');
    if (first) first.focus();
  }
  function close() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (location.hash === '#get') history.replaceState(null, '', location.pathname);
    if (opener) opener.focus();
  }
  document.querySelectorAll('[data-open-signup]').forEach(function (b) { b.addEventListener('click', open); });
  modal.querySelectorAll('[data-close-signup]').forEach(function (b) { b.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });
  if (location.hash === '#get') open();
})();
