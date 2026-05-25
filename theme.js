(function(){
  const PALETTES = {
    paper: { bg:"#f4f1ec", ink:"#17140f", mute:"#8a847a", line:"#d9d3c6" },
    ink:   { bg:"#0e0d0b", ink:"#ece8df", mute:"#7a736a", line:"#22201c" }
  };

  function applyTheme(theme){
    const p = PALETTES[theme === 'dark' ? 'ink' : 'paper'];
    const r = document.documentElement.style;
    r.setProperty('--bg', p.bg);
    r.setProperty('--ink', p.ink);
    r.setProperty('--mute', p.mute);
    r.setProperty('--line', p.line);
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if(btn) btn.textContent = theme === 'dark' ? '◑' : '◐';
  }

  function currentTheme(){
    const saved = localStorage.getItem('theme');
    if(saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  applyTheme(currentTheme());

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => applyTheme(currentTheme()), 0);

    const btn = document.getElementById('themeToggle');
    if(!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  });

  const observer = new MutationObserver(() => {
    const wantTheme = currentTheme();
    if(document.documentElement.getAttribute('data-theme') !== wantTheme){
      applyTheme(wantTheme);
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
})();