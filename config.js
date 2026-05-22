// This loads 24 images at a time and will infinite scroll. This gets you a smoother load. Trust me, homie.
(function(){
  const grid = document.getElementById('sheetGrid');
  const counter = document.getElementById('photoCount');
  if(!grid) return;

  const batchSize = 24;
  let files = [];
  let shown = 0;
  let loading = false;

  function showNextImages(){
    if(loading || shown >= files.length) return;
    loading = true;
    const until = Math.min(shown + batchSize, files.length);
    const batch = document.createDocumentFragment();
    for(let i = shown; i < until; i++){
      const src = `images/${files[i]}`;
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.shot = '';
      cell.dataset.src = src;
      cell.innerHTML = `<img src="${src}" alt="" loading="lazy">`;
      batch.appendChild(cell);
    }
    grid.appendChild(batch);
    shown = until;
    if(counter) counter.textContent = files.length + ' frames';
    loading = false;
  }

  const bottomEdge = document.createElement('div');
  bottomEdge.style.height = '1px';
  grid.parentElement.appendChild(bottomEdge);

  const nearTheBottom = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) showNextImages();
  }, { rootMargin: '400px' });
  nearTheBottom.observe(bottomEdge);

  // Load the manifest, then start rendering
  fetch('images.json')
    .then(r => r.json())
    .then(list => {
      files = list;
      nearTheBottom.observe(bottomEdge);
      showNextImages();
    })
    .catch(err => console.error('Could not load images.json:', err));
})();