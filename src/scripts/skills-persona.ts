const section = document.querySelector<HTMLElement>('.skills-persona');
if(section){
 const tiles=Array.from(section.querySelectorAll<HTMLButtonElement>('[data-skill]'));
 const name=section.querySelector<HTMLElement>('[data-skill-name]');
 const detail=section.querySelector<HTMLElement>('[data-skill-detail]');
 const grid=section.querySelector<HTMLElement>('.skills-persona__grid');
 const categoryNames:Record<string,string>={frontend:'Frontend',backend:'Backend',ai:'AI/ML',tools:'Tools',other:'Other'};
 let selected='react';
 const select=(tile:HTMLButtonElement)=>{
  const changed=selected!==tile.dataset.skillId; selected=tile.dataset.skillId||'';
  tiles.forEach(item=>item.setAttribute('aria-pressed',String(item===tile)));
  if(name)name.textContent=tile.dataset.name||'';
  if(detail)detail.textContent=`${categoryNames[tile.dataset.category||'']||''} / ${tile.dataset.description||''}`;
  if(changed&& !matchMedia('(prefers-reduced-motion: reduce)').matches) name?.animate([{opacity:0,transform:'translateX(-8px)'},{opacity:1,transform:'translateX(0)'}],{duration:160});
 };
 tiles.forEach(tile=>{tile.addEventListener('click',()=>select(tile));tile.addEventListener('focus',()=>select(tile));});
 section.addEventListener('skills:filtered',()=>{
  const visible=tiles.filter(tile=>!tile.hidden);
  const current=visible.find(tile=>tile.dataset.skillId===selected)||visible[0];
  if(current)select(current);else {selected='';if(name)name.textContent='No skills';if(detail)detail.textContent='Choose another category.';tiles.forEach(tile=>tile.setAttribute('aria-pressed','false'));}
 });
 grid?.addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
  const visible=tiles.filter(tile=>!tile.hidden);const current=visible.indexOf(document.activeElement as HTMLButtonElement);if(current<0)return;
  event.preventDefault();const columns=getComputedStyle(grid).gridTemplateColumns.split(' ').length;
  const delta=event.key==='ArrowUp'?-columns:event.key==='ArrowDown'?columns:event.key==='ArrowLeft'?-1:1;
  const next=event.key==='Home'?0:event.key==='End'?visible.length-1:Math.max(0,Math.min(visible.length-1,current+delta));visible[next]?.focus();
 });
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){section.classList.add('skills-persona--entered');observer.disconnect();}},{threshold:.15});observer.observe(section);}
}
