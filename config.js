const POOL_SIZE = 226;  // update this when you add photos

//This loads 24 images at a time and will inifite scroll. This gets you a smoother load. Trust me, homie.
(function(){
  const grid = document.getElementById('sheetGrid');
  const counter = document.getElementById('photoCount');
  if(!grid) return;

  const batchSize = 24;
  let shown = 0;
  let loading = false;

  function pad(n){ return String(n).padStart(3, '0'); };

  function showNextImages(){
    if(loading || shown >= POOL_SIZE) return;
    loading = true;
    const until = Math.min(shown + batchSize, POOL_SIZE);
    const batch = document.createDocumentFragment();
    for(let i = shown + 1; i <= until; i++){
      const src = `images/site${pad(i)}.jpg`;
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.shot = '';
      cell.dataset.src = src;
      cell.innerHTML = `<img src="${src}" alt="" loading="lazy">`;
      batch.appendChild(cell);
    }
    grid.appendChild(batch);
    shown = until;
    if(counter) counter.textContent = + POOL_SIZE + ' frames';
    loading = false;
  }

  const bottomEdge = document.createElement('div');
  bottomEdge.style.height = '1px';
  grid.parentElement.appendChild(bottomEdge);

  const nearTheBottom = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) showNextImages();
  }, { rootMargin: '400px' });
  nearTheBottom.observe(bottomEdge);

  showNextImages();
})();