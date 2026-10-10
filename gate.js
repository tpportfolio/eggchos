/* eggchos gate — barrera visual por contraseña (no es seguridad real: la clave viaja en el código). */
(function () {
  var KEY = 'eggchos_auth_v1';
  var PASS = atob('ZWdnY2hvczExMQ=='); // eggchos111
  function granted() {
    try { return localStorage.getItem(KEY) === 'ok'; }
    catch (e) { return window.__eggOk === true; }
  }
  function remember() {
    try { localStorage.setItem(KEY, 'ok'); }
    catch (e) { window.__eggOk = true; }
  }
  if (granted()) return;
  var css = '#egg-gate{position:fixed;inset:0;z-index:99999;background:#211304;display:flex;align-items:center;justify-content:center;padding:20px;font-family:Outfit,system-ui,sans-serif}'
    + '#egg-card{background:#FFF6E3;border:3px solid #FFB300;border-radius:24px;padding:36px 32px;max-width:380px;width:100%;text-align:center;box-shadow:8px 8px 0 #FFB300}'
    + '#egg-card h1{font-family:Fraunces,Georgia,serif;font-size:2rem;margin:0 0 8px;letter-spacing:-.03em;color:#211304}'
    + '#egg-card h1 span{color:#D93A0B}'
    + '#egg-card p{margin:0 0 20px;color:#6B5C44;font-size:.95rem;line-height:1.55}'
    + '#egg-pass{width:100%;box-sizing:border-box;border:2px solid #211304;border-radius:14px;padding:14px 16px;font-size:1rem;margin-bottom:12px;background:#fff;color:#211304;outline:none}'
    + '#egg-pass:focus{border-color:#D93A0B}'
    + '#egg-go{width:100%;border:2px solid #211304;border-radius:999px;background:#211304;color:#FFF6E3;font-weight:800;font-size:1rem;padding:14px;cursor:pointer}'
    + '#egg-go:active{transform:scale(.98)}'
    + '#egg-err{display:none;color:#A92A06;font-weight:700;font-size:.88rem;margin-top:12px}'
    + '@keyframes eggshake{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}75%{transform:translateX(7px)}}'
    + '.egg-shake{animation:eggshake .3s ease 2}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);
  document.body.style.overflow = 'hidden';
  var ov = document.createElement('div');
  ov.id = 'egg-gate';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  ov.setAttribute('aria-label', 'Contenido protegido por contraseña');
  ov.innerHTML = '<div id="egg-card"><h1>egg<span>chos</span></h1>'
    + '<p>Contenido privado.<br>Ingresá la contraseña para entrar.</p>'
    + '<form id="egg-form"><input id="egg-pass" type="password" placeholder="Contraseña" autocomplete="off" aria-label="Contraseña">'
    + '<button id="egg-go" type="submit">Entrar</button></form>'
    + '<div id="egg-err">Contraseña incorrecta, probá de nuevo.</div></div>';
  document.body.appendChild(ov);
  var input = document.getElementById('egg-pass');
  var card = document.getElementById('egg-card');
  input.focus();
  document.getElementById('egg-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value === PASS) {
      remember();
      ov.style.transition = 'opacity .35s ease';
      ov.style.opacity = '0';
      document.body.style.overflow = '';
      setTimeout(function () { ov.remove(); }, 380);
    } else {
      document.getElementById('egg-err').style.display = 'block';
      card.classList.remove('egg-shake');
      void card.offsetWidth;
      card.classList.add('egg-shake');
      input.select();
    }
  });
})();
