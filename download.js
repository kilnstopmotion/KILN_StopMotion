Object.assign(I18N.vi, {
  downloadAction:'Tải phần mềm', downloadHistoryEmpty:'Chưa có phiên bản trước.',
  downloadPlay:'Phát video nền', downloadPause:'Tạm dừng video nền'
});
Object.assign(I18N.en, {
  downloadAction:'Download software', downloadHistoryEmpty:'No previous versions yet.',
  downloadPlay:'Play background video', downloadPause:'Pause background video'
});

document.addEventListener('DOMContentLoaded',()=>{
  const release=RELEASES[0];
  const button=document.querySelector('[data-download-primary]');
  const url=release?.betaUrl||release?.installerUrl||release?.portableUrl;
  if(url)button.href=url;
  if(release)document.querySelector('[data-download-version]').textContent=release.version;
  function renderHistory(){
    const list=document.querySelector('[data-download-history]');
    list.replaceChildren();
    const older=RELEASES.slice(1);
    if(!older.length){
      const empty=document.createElement('p');
      empty.textContent=translateSite('downloadHistoryEmpty');
      list.append(empty);
      return;
    }
    older.forEach(release=>{
      const row=document.createElement('article');
      row.className='download-history-row';
      const title=document.createElement('strong');
      title.textContent=release.version;
      row.append(title);
      const links=document.createElement('div');
      [[release.betaUrl,'betaDownload'],[release.installerUrl,'installer'],[release.portableUrl,'portable']].forEach(([url,key])=>{
        if(!url)return;
        const link=document.createElement('a');
        link.href=url;link.textContent=translateSite(key)+' ↗';
        links.append(link);
      });
      if(!links.children.length)links.textContent=translateSite('pendingBuild');
      row.append(links);list.append(row);
    });
  }
  const video=document.querySelector('.download-film');
  const backdrop=document.querySelector('.download-backdrop');
  const toggle=document.querySelector('.download-playback');
  const source=video.dataset.videoSrc.trim();
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused=false,manualPlay=false,failed=false,loaded=false;
  function translate(){
    document.title=(lang==='en'?'Download':'Tải')+' DAAD StopMotion';
    toggle.textContent=translateSite(video.paused?'downloadPlay':'downloadPause');
    renderHistory();
  }
  new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  translate();
  if(!source)return;
  toggle.hidden=false;
  function play(){
    if(!loaded){loaded=true;video.src=source;video.load();}
    video.muted=true;
    video.play().catch(translate);
  }
  function sync(){
    if(document.hidden||userPaused||failed||(reduce.matches&&!manualPlay))video.pause();
    else play();
  }
  video.addEventListener('playing',()=>{backdrop.classList.add('has-video');translate();});
  video.addEventListener('pause',translate);
  video.addEventListener('error',()=>{failed=true;backdrop.classList.remove('has-video');toggle.hidden=true;});
  toggle.addEventListener('click',()=>{
    if(video.paused){userPaused=false;manualPlay=true;play();}
    else{userPaused=true;video.pause();}
  });
  document.addEventListener('visibilitychange',sync);
  reduce.addEventListener('change',()=>{manualPlay=false;sync();});
  sync();
});
