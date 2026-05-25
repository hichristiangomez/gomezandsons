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

  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    if(!btn) return;
    applyTheme(document.documentElement.getAttribute('data-theme'));
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  });
})();