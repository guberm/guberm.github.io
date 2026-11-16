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

// Contact form: FormSubmit bounces the visitor back to /?sent=1#contact after a
// successful send, so show the confirmation and drop the query param.
(function () {
  var banner = document.getElementById('cfSent');
  if (banner && /[?&]sent=1(&|$)/.test(location.search)) {
    banner.hidden = false;
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.hash);
  }
  var form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    var token = form.querySelector('[name="cf-turnstile-response"]');
    var robot = document.getElementById('cfRobot');
    if (token && !token.value) {
      // widget rendered but not solved: keep the visitor on the page instead of a bare 403
      e.preventDefault();
      if (robot) robot.hidden = false;
      return;
    }
    if (robot) robot.hidden = true;
    var btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    // the button is not needed to serialise the form, so disabling it only stops double sends
    btn.disabled = true;
    btn.textContent = 'Sending\u2026';
  });
})();
