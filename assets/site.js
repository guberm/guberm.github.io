// Theme toggle, shared by every page.
(function () {
  var html = document.documentElement;
  var btn = document.getElementById('themeToggle');
  var stored = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', stored);
  if (!btn) return;
  btn.textContent = stored === 'dark' ? '\u2600 Light' : '\u263e Dark';
  btn.addEventListener('click', function () {
    var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    btn.textContent = next === 'dark' ? '\u2600 Light' : '\u263e Dark';
  });
})();
