// Portal de Hyrule - script.js
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

document.addEventListener('DOMContentLoaded', ()=>{
  // music button
  const music = $('#bg-music');
  const btn = document.createElement('button');
  btn.id = 'music-btn'; btn.title = 'Play / Pause';
  btn.textContent = '🔇'; document.body.appendChild(btn);
  let playing = false;
  if(music){ music.volume = 0.55; music.muted = true; }
  btn.addEventListener('click', ()=>{
    if(!music) return;
    if(music.paused){ music.muted = false; music.play().catch(()=>{}); btn.textContent='🎵'; playing=true; }
    else { music.pause(); btn.textContent='🔇'; playing=false; }
  });

  // reveal sections
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold:0.15});
  $$('.fade-in, .fade-up, section').forEach(el=> io.observe(el));

  // particles on click
  let last=0;
  document.addEventListener('click', e=>{
    const now=Date.now(); if(now-last<50) return; last=now;
    const s = document.createElement('span'); s.className='spark';
    s.style.left = e.pageX+'px'; s.style.top = e.pageY+'px'; document.body.appendChild(s);
    setTimeout(()=> s.remove(),900);
  });

  // filters
  const filterBtns = $$('.filter-btn'); const cards = $$('.race-card');
  filterBtns.forEach(b=> b.addEventListener('click', ()=>{
    filterBtns.forEach(x=> x.classList.remove('active')); b.classList.add('active');
    const f = b.dataset.filter;
    cards.forEach(c=> { c.style.display = (f==='all' || c.dataset.type===f) ? 'block' : 'none'; });
  }));

  // facts click -> modal
  const facts = $$('.facts li');
  function createModal(){ const m=document.createElement('div'); m.id='zh-modal'; Object.assign(m.style,{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.6)',zIndex:1200}); m.innerHTML=`<div style="width:92%;max-width:700px;background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));padding:18px;border-radius:12px;"><button id="modal-close" style="float:right;background:transparent;border:none;color:var(--gold);font-size:22px;cursor:pointer">✕</button><div id="modal-body"></div></div>`; document.body.appendChild(m); m.addEventListener('click',(e)=>{ if(e.target===m) m.remove(); }); document.getElementById('modal-close').addEventListener('click',()=>m.remove()); return m; }
  facts.forEach(li=> li.addEventListener('click', ()=>{
    const modal = createModal();
    const more = li.dataset.more || '';
    modal.querySelector('#modal-body').innerHTML = `<h3 style="color:var(--gold);margin:0 0 8px">${li.textContent}</h3><p style="color:#e7eef2">${more}</p>`;
  }));
});