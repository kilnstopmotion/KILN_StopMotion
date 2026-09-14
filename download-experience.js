(()=>{
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine=window.matchMedia('(hover:hover) and (pointer:fine)');
  const motionCache=new WeakMap();
  const frameTimers=new WeakMap();

  function quickMovers(el,type){
    if(!window.gsap||reduce.matches)return null;
    let cached=motionCache.get(el);
    if(cached)return cached;
    if(type==='card'){
      cached={
        x:gsap.quickTo(el,'x',{duration:.42,ease:'power3.out'}),
        y:gsap.quickTo(el,'y',{duration:.42,ease:'power3.out'}),
        r:gsap.quickTo(el,'rotation',{duration:.46,ease:'power3.out'})
      };
    }else{
      cached={
        x:gsap.quickTo(el,'x',{duration:.24,ease:'power3.out'}),
        y:gsap.quickTo(el,'y',{duration:.24,ease:'power3.out'})
      };
    }
    motionCache.set(el,cached);
    return cached;
  }

  function decorateButton(btn,index){
    if(btn.dataset.downloadTriggerReady==='1')return;
    btn.dataset.downloadTriggerReady='1';
    btn.dataset.downloadTrigger='';
    btn.dataset.disabled=btn.classList.contains('btn-disabled')?'true':'false';
    btn.classList.add('download-trigger');

    const shell=document.createElement('span');
    shell.className='download-trigger-shell';
    [...btn.childNodes].forEach(node=>shell.appendChild(node));
    const arrow=shell.querySelector('.arrow');
    if(arrow)arrow.classList.add('trigger-arrow');

    const fill=document.createElement('span');
    fill.className='download-trigger-fill';
    fill.setAttribute('aria-hidden','true');
    const flash=document.createElement('span');
    flash.className='download-trigger-flash';
    flash.setAttribute('aria-hidden','true');
    const frame=document.createElement('span');
    frame.className='download-trigger-frame';
    frame.dataset.triggerFrame='';
    frame.setAttribute('aria-hidden','true');
    frame.textContent=`FRAME ${String(index+1).padStart(3,'0')}`;

    btn.append(fill,flash,shell,frame);
  }

  function decorateRelease(section,latest){
    if(!latest||!latest.children.length)return;
    let surface=latest.querySelector(':scope > .release-card-surface');
    if(!surface){
      surface=document.createElement('div');
      surface.className='release-card-surface';
      [...latest.childNodes].forEach(node=>surface.appendChild(node));
      latest.appendChild(surface);
    }
    section.querySelectorAll('.download-actions .btn').forEach((btn,index)=>decorateButton(btn,index));
  }

  function clearFrameTimer(btn){
    const timers=frameTimers.get(btn);
    if(timers)timers.forEach(clearTimeout);
    frameTimers.delete(btn);
  }

  function runFrameSequence(btn){
    const frame=btn.querySelector('[data-trigger-frame]');
    if(!frame||btn.dataset.disabled==='true')return;
    clearFrameTimer(btn);
    const timers=[];
    ['001','002','003'].forEach((value,i)=>{
      timers.push(setTimeout(()=>{frame.textContent=`FRAME ${value}`},i*85));
    });
    frameTimers.set(btn,timers);
  }

  function resetButton(btn){
    btn.classList.remove('is-hot');
    clearFrameTimer(btn);
    const frame=btn.querySelector('[data-trigger-frame]');
    if(frame){
      const buttons=[...btn.closest('.download-actions')?.querySelectorAll('[data-download-trigger]')||[]];
      const index=Math.max(0,buttons.indexOf(btn));
      frame.textContent=`FRAME ${String(index+1).padStart(3,'0')}`;
    }
    const mover=quickMovers(btn,'button');
    mover?.x(0);mover?.y(0);
  }

  function init(){
    const section=document.querySelector('#download');
    const latest=section?.querySelector('[data-release-latest]');
    if(!section||!latest)return;

    decorateRelease(section,latest);
    const observer=new MutationObserver(()=>decorateRelease(section,latest));
    observer.observe(section,{childList:true,subtree:true});

    let tx=0,ty=0,cx=0,cy=0,raf=0,active=false;
    const updateHeat=()=>{
      if(!active){raf=0;return}
      cx+=(tx-cx)*.16;
      cy+=(ty-cy)*.16;
      section.style.setProperty('--heat-x',`${cx}px`);
      section.style.setProperty('--heat-y',`${cy}px`);
      raf=requestAnimationFrame(updateHeat);
    };
    const pointHeat=e=>{
      const r=section.getBoundingClientRect();
      tx=e.clientX-r.left;ty=e.clientY-r.top;
      if(reduce.matches){
        section.style.setProperty('--heat-x',`${tx}px`);
        section.style.setProperty('--heat-y',`${ty}px`);
      }else if(!raf){
        cx=tx;cy=ty;raf=requestAnimationFrame(updateHeat);
      }
    };

    if(fine.matches){
      section.addEventListener('pointerenter',e=>{
        active=true;
        section.classList.add('is-heat-active');
        pointHeat(e);
      });
      section.addEventListener('pointermove',e=>{
        pointHeat(e);
        const btn=e.target.closest?.('[data-download-trigger]');
        if(!btn||!section.contains(btn))return;
        const r=btn.getBoundingClientRect();
        const px=e.clientX-r.left,py=e.clientY-r.top;
        btn.style.setProperty('--btn-x',`${px}px`);
        btn.style.setProperty('--btn-y',`${py}px`);
        if(btn.dataset.disabled!=='true'&&!reduce.matches){
          const nx=(px/r.width)-.5,ny=(py/r.height)-.5;
          const mover=quickMovers(btn,'button');
          mover?.x(nx*8);mover?.y(ny*6);
        }
      },{passive:true});
      section.addEventListener('pointerleave',()=>{
        active=false;
        section.classList.remove('is-heat-active');
        section.querySelectorAll('[data-download-trigger]').forEach(resetButton);
        const surface=latest.querySelector('.release-card-surface');
        const mover=surface&&quickMovers(surface,'card');
        mover?.x(0);mover?.y(0);mover?.r(0);
      });
    }

    latest.addEventListener('pointermove',e=>{
      const r=latest.getBoundingClientRect();
      const px=e.clientX-r.left,py=e.clientY-r.top;
      latest.style.setProperty('--card-x',`${px}px`);
      latest.style.setProperty('--card-y',`${py}px`);
      if(!fine.matches||reduce.matches)return;
      const surface=latest.querySelector('.release-card-surface');
      if(!surface)return;
      const nx=(px/r.width)-.5,ny=(py/r.height)-.5;
      const mover=quickMovers(surface,'card');
      mover?.x(nx*5);mover?.y(ny*4);mover?.r(nx*.28);
    },{passive:true});
    latest.addEventListener('pointerleave',()=>{
      const surface=latest.querySelector('.release-card-surface');
      const mover=surface&&quickMovers(surface,'card');
      mover?.x(0);mover?.y(0);mover?.r(0);
    });

    section.addEventListener('pointerover',e=>{
      const btn=e.target.closest?.('[data-download-trigger]');
      if(!btn||!section.contains(btn)||btn.contains(e.relatedTarget))return;
      btn.classList.add('is-hot');
      runFrameSequence(btn);
    });
    section.addEventListener('pointerout',e=>{
      const btn=e.target.closest?.('[data-download-trigger]');
      if(!btn||!section.contains(btn)||btn.contains(e.relatedTarget))return;
      resetButton(btn);
    });

    section.addEventListener('click',e=>{
      const btn=e.target.closest?.('[data-download-trigger]');
      if(!btn||!section.contains(btn))return;
      if(btn.dataset.disabled==='true'){
        e.preventDefault();
        return;
      }
      if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button===1||reduce.matches)return;
      const href=btn.getAttribute('href');
      if(!href||href==='#')return;
      e.preventDefault();
      btn.classList.remove('is-firing');
      void btn.offsetWidth;
      btn.classList.add('is-firing');
      runFrameSequence(btn);
      setTimeout(()=>btn.classList.remove('is-firing'),520);
      setTimeout(()=>window.location.assign(href),340);
    });
  }

  document.addEventListener('DOMContentLoaded',init);
})();
