Object.assign(I18N.vi, {
  downloadTagline:'Câu chuyện của bạn. Từng khung hình.',
  downloadAction:'Tải phần mềm', downloadSource:'Tải xuống qua Google Drive',
  downloadDirect:'Tải xuống cho Windows', downloadPlay:'Phát video nền', downloadPause:'Tạm dừng video nền'
});
Object.assign(I18N.en, {
  downloadTagline:'Your story. One frame at a time.',
  downloadAction:'Download software', downloadSource:'Download via Google Drive',
  downloadDirect:'Download for Windows', downloadPlay:'Play background video', downloadPause:'Pause background video'
});

document.addEventListener('DOMContentLoaded',()=>{
  const release=RELEASES[0];
  const button=document.querySelector('[data-download-primary]');
  const url=release?.betaUrl||release?.installerUrl||release?.portableUrl;
  if(url)button.href=url;
  if(release)document.querySelector('[data-download-version]').textContent=release.version;
  if(url&&!release.betaUrl){
    const source=document.querySelector('.download-source');
    source.dataset.i18n='downloadDirect';
    source.textContent=translateSite('downloadDirect');
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
